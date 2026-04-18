import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, verifyStripePayment, placeOrderRazorpay, verifyRazorpayPayment } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';


const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/stripe/verify', authUser, verifyStripePayment)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
orderRouter.post('/razorpay/verify', authUser, verifyRazorpayPayment)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)

export default orderRouter;