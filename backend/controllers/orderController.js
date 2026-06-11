import * as orderService from "../services/orderService.js"

const createOrder = async (req, res) => {
    try {
        const { items, orderValue } = req.body
        const order = await orderService.createOrder({ user: req.user.id, items, orderValue })
        res.status(201).json({ success: true, order })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getUserOrders = async (req, res) => {
    try {
        const orders = await orderService.getUserOrders(req.user.id)
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders()
        res.status(200).json({ success: true, orders })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { createOrder, getUserOrders, getAllOrders }
