import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
    const {
        products,
        currency,
        cartItems,
        removeFromCart,
        getCartCount,
        updateCartItem,
        navigate,
        getCartAmount,
        axios,
        user,
        setCartItems
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");
    const [loading, setLoading] = useState(false);

    const getCart = useCallback(() => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product) {
                product.quantity = cartItems[key];
                tempArray.push(product);
            }
        }
        setCartArray(tempArray);
    }, [cartItems, products]);

    const getUserAddress = useCallback(async () => {
        try {
            const { data } = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses)
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0])
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [axios]);

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an address")
            }

            setLoading(true);
            const orderItems = cartArray.map(item => ({ product: item._id, quantity: item.quantity }));

            // Place Order with COD
            if (paymentOption === "COD") {
                const { data } = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: orderItems,
                    address: selectedAddress._id
                })

                if (data.success) {
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/my-orders')
                } else {
                    toast.error(data.message)
                }
            }
            // Place Order with Stripe
            else if (paymentOption === "Stripe") {
                const { data } = await axios.post('/api/order/stripe', {
                    items: orderItems,
                    address: selectedAddress._id
                })

                if (data.success) {
                    // Load Stripe.js and redirect to Checkout
                    const stripeScript = document.createElement('script');
                    stripeScript.src = 'https://js.stripe.com/v3/';
                    stripeScript.onload = () => {
                        const stripe = window.Stripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                        stripe.redirectToCheckout({ sessionId: data.sessionId }).then((result) => {
                            if (result.error) {
                                toast.error(result.error.message);
                                setLoading(false);
                            }
                        });
                    };
                    document.body.appendChild(stripeScript);
                } else {
                    toast.error(data.message);
                    setLoading(false);
                }
            }
            // Place Order with Razorpay
            else if (paymentOption === "Razorpay") {
                const { data } = await axios.post('/api/order/razorpay', {
                    items: orderItems,
                    address: selectedAddress._id
                })

                if (data.success) {
                    // Load Razorpay
                    const razorpayScript = document.createElement('script');
                    razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    razorpayScript.onload = () => {
                        const options = {
                            key: data.key,
                            amount: data.amount * 100,
                            currency: 'INR',
                            name: 'GreenCart',
                            description: 'Order Payment',
                            order_id: data.orderId,
                            handler: async function (response) {
                                try {
                                    const verifyData = await axios.post('/api/order/razorpay/verify', {
                                        razorpayOrderId: response.razorpay_order_id,
                                        razorpayPaymentId: response.razorpay_payment_id,
                                        razorpaySignature: response.razorpay_signature,
                                        items: orderItems,
                                        address: selectedAddress._id,
                                        amount: data.amount
                                    });

                                    if (verifyData.data.success) {
                                        toast.success(verifyData.data.message);
                                        setCartItems({});
                                        navigate('/my-orders');
                                    } else {
                                        toast.error(verifyData.data.message);
                                    }
                                } catch (error) {
                                    toast.error(error.message);
                                }
                                setLoading(false);
                            },
                            prefill: {
                                name: user?.name || '',
                                email: user?.email || '',
                            },
                            theme: {
                                color: '#3399cc'
                            }
                        };

                        const rzp = new window.Razorpay(options);
                        rzp.open();
                    };
                    document.body.appendChild(razorpayScript);
                } else {
                    toast.error(data.message);
                    setLoading(false);
                }
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems, getCart]);

    useEffect(() => {
        if (user) {
            getUserAddress()
        }
    }, [user, getUserAddress])

    return products.length > 0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className="flex-1 max-w-4xl">
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                            >
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className="flex items-center gap-2">
                                        <p>Qty:</p>
                                        <select
                                            className="outline-none"
                                            onChange={(e) => updateCartItem(product._id, Number(e.target.value))}
                                            value={cartItems[product._id]}
                                        >
                                            {Array.from({ length: Math.max(9, cartItems[product._id]) }).map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>
                ))}

                <button
                    onClick={() => {
                        navigate("/products");
                        scrollTo(0, 0);
                    }}
                    className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
                >
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className="group-hover:translate-x-1 transition" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress
                                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                                : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                {addresses.map((address, index) => (
                                    <p
                                        key={index}
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setShowAddress(false);
                                        }}
                                        className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p
                                    onClick={() => navigate("/add-address")}
                                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
                                >
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select
                        onChange={e => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Stripe">Stripe Payment</option>
                        <option value="Razorpay">Razorpay Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{(getCartAmount() * 1.02).toFixed(2)}</span>
                    </p>
                </div>

                <button
                    onClick={placeOrder}
                    disabled={loading}
                    className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Processing..." : (paymentOption === "COD" ? "Place Order" : "Proceed to Checkout")}
                </button>
            </div>
        </div>
    ) : null;
};

export default Cart;
