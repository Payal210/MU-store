import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                name: String,
                price: Number,
                quantity: Number,
            },
        ],
        orderValue: { type: Number, required: true },
        status: { type: String, default: "pending" },
    },
    { timestamps: true }
)

export default mongoose.model("Order", orderSchema)
