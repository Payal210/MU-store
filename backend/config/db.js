import mongoose from "mongoose";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    try {
      await mongoose.connection.collection("products").dropIndex("product_price_1");
    } catch (_) {}
  } catch (err) {
    console.log("Failed to Connect");
  }
};
export default dbConnect;