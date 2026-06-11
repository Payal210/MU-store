import Order from "../models/orderModel.js"

const createOrder = async (orderData) => {
    return await Order.create(orderData)
}

const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).sort({ createdAt: -1 })
}

const getAllOrders = async () => {
    return await Order.find().populate("user", "name email").sort({ createdAt: -1 })
}

export { createOrder, getUserOrders, getAllOrders }
