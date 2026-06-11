import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();
app.use(express.json());
app.use(cors())
app.use("/product_images", express.static(path.join(__dirname, "product_images")))
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
export default app