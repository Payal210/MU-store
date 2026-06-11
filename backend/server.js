// server.js
import app from "./app.js";

import dbConnect from "./config/db.js";
import seedAdmin from "./config/seedAdmin.js";

dbConnect();
seedAdmin();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
// const app = express()
// app.use(cors())
// app.use(express.json())
// const startServer = async () => {
//   await mongoose.connect("mongodb://localhost:27017/mustore")
//   app.listen(5000, () => console.log("Server Started"))
// }
// startServer()
// const userSchema = mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// })
// const userModel = mongoose.model("users", userSchema)
// app.post("/users/register", async (req, res) => {
//   const user = await userModel.create(req.body)
//   res.json(user)
// })
// app.post("/users/login", async (req, res) => {
//   const { email, password } = req.body
//   const user = await userModel.findOne({ email, password })
//   res.json(user)
// })

// // //server.js
// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
// const app = express()
// app.use(cors())
// app.use(express.json())

// const startServer = async () => {
//  await mongoose.connect("mongodb://localhost:27017/mu26a")
//  app.listen(5001,()=>console.log("Server Started"))
// }

// startServer()

// const orderSchema = mongoose.Schema({
//   items: [
//     {
//       name: String,
//       price: Number,
//       quantity: Number
//     }],
//   orderValue: Number
// })

// const orderModel = mongoose.model("orders", orderSchema)

// app.post("/orders", async (req, res) => {
//   const order = await orderModel.create(req.body)
//   res.json(order)
// })






// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// const app = express();
// app.use(cors());
// app.use(express.json());
// async function startServer() {
//   mongoose.connect("mongodb://localhost:27017/mu26a").then(() => {
//     app.listen(5000, () => console.log("Server Started"));
//   });
// }
// startServer();

// const userSchema  = mongoose.Schema({
//     name:{type:String},
//     email:{type:String},
//     password:{type:String}
// })

// const userModel = mongoose.model("Users",userSchema)

// app.post("/users",async (req,res)=>{
//     const user = await userModel.create(req.body)
//     res.json(user)
// })



// const noteSchema = new mongoose.Schema({
//   text: { type: String },
// });
// const noteModel = mongoose.model("Notes", noteSchema);

// app.get("/notes", async (req, res) => {
//   const notes = await noteModel.find();
//   res.json(notes);
// });
// app.post("/notes", async (req, res) => {
//   await noteModel.create(req.body);
//   res.json({ message: "Note added" });
// });
// app.delete("/notes/:id", async (req, res) => {
//   const { id } = req.params;
//   await noteModel.findByIdAndDelete(id);
//   res.json({ message: "Note deleted" });
// });

// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"
// const app = express()
// app.use(cors())
// app.use(express.json())

// const productSchema = mongoose.Schema({
//     name: { type: String },
//     price: { type: Number }
// })

// const productModel = mongoose.model("products", productSchema)

// const startServer = async () => {
//     await mongoose.connect("mongodb://localhost:27017/mu26a")
//     app.listen(5000, () => console.log("Server Started"))
// }

// startServer()

// app.get("/products", async (req, res) => {
//     const products = await productModel.find()
//     res.json(products)
// })

// app.post("/products", async (req, res) => {
//     const product = await productModel.create(req.body)
//     res.json(product)
// })

// app.delete("/products/:id", async (req, res) => {
//     const { id } = await req.params
//     const product = await productModel.findByIdAndDelete(id)
//     res.json(product)
// })

