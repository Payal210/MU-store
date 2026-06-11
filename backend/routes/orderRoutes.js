import express from "express"
import * as orderController from "../controllers/orderController.js"
import { authenticate, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/create", authenticate, orderController.createOrder)
router.get("/myorders", authenticate, orderController.getUserOrders)
router.get("/get", authenticate, authorize("admin"), orderController.getAllOrders)

export default router
