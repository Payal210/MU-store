import express from "express"
import * as productController from "../controllers/productController.js"
import upload from "../middleware/upload.js"
import { authenticate } from "../middleware/authMiddleware.js"
const router = express.Router()
router.get("/get",productController.getProducts)
router.get("/getProduct/:productId",productController.getProduct)
router.post("/create", upload.single("image"), productController.createProduct)
router.delete("/delete/:productId",productController.deleteProduct)
router.patch("/update/:productId", upload.single("image"), productController.updateProduct)

router.post("/rate/:productId", authenticate, productController.rateProduct)

export default router