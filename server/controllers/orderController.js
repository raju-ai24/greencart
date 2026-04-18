import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"
import stripe from "stripe"
import Razorpay from "razorpay"

// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })
        }

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        })

        return res.json({ success: true, message: "Order Placed Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product address")
        .sort({ createdAt: -1 });

        // Filter out items with null product
        const cleanedOrders = orders.map(order => ({
            ...order._doc,
            items: order.items.filter(item => item.product != null)
        }));

        res.json({ success: true, orders: cleanedOrders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Place Order Stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;
        
        // Calculate amount
        let amountInCents = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                amountInCents += product.offerPrice * item.quantity * 100;
            }
        }
        amountInCents += Math.floor(amountInCents * 0.02); // Add 2% tax

        // Stripe minimum amount is ₹50 (5000 paise in INR)
        if (amountInCents < 5000) {
            return res.json({ success: false, message: "Minimum order amount for Stripe payment is ₹50" });
        }

        const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
        
        // Create a Checkout Session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Order Items',
                    },
                    unit_amount: amountInCents,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/my-orders`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
            metadata: {
                userId: req.user.id,
                items: JSON.stringify(items),
                address: address,
                amount: amountInCents.toString()
            }
        });

        res.json({ success: true, sessionId: session.id, amount: amountInCents / 100 });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Verify Stripe Payment: /api/order/stripe/verify
export const verifyStripePayment = async (req, res) => {
    try {
        const { sessionId } = req.body;
        
        const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            const items = JSON.parse(session.metadata.items);
            const address = session.metadata.address;
            const amount = parseFloat(session.metadata.amount) / 100;

            const newOrder = await Order.create({
                userId: req.user.id,
                items,
                address,
                amount,
                paymentType: 'Stripe',
                isPaid: true,
                paymentId: session.payment_intent
            });

            await User.findByIdAndUpdate(req.user.id, { cartItems: {} });

            res.json({ success: true, message: "Order Placed Successfully" });
        } else {
            res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Place Order Razorpay: /api/order/razorpay
export const placeOrderRazorpay = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" })
        }

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        // Convert to paise for Razorpay (multiply by 100)
        const amountInPaise = amount * 100;

        // Create Razorpay Order
        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
                userId: userId.toString(),
                items: JSON.stringify(items),
                address: JSON.stringify(address)
            }
        }

        const razorpayOrder = await razorpayInstance.orders.create(options)

        res.json({ success: true, orderId: razorpayOrder.id, amount, key: process.env.RAZORPAY_KEY_ID })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Verify Razorpay Payment: /api/order/razorpay/verify
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature, items, address, amount } = req.body;
        const userId = req.user.id;

        const crypto = require('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpayOrderId + '|' + razorpayPaymentId);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpaySignature) {
            // Create Order
            await Order.create({
                userId,
                items,
                amount,
                address,
                paymentType: "Razorpay",
                isPaid: true,
                paymentId: razorpayPaymentId
            })

            return res.json({ success: true, message: "Payment Successful, Order Placed" })
        } else {
            return res.json({ success: false, message: "Payment Verification Failed" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
