import Product from "../models/productModel.js"

const createProduct = async (productData) => {
    return await Product.create(productData)
}
const getProducts = async () => {
    return await Product.find()
}
const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId)
}
const getProduct = async (productId) => {
    return await Product.findOne({ _id: productId })
}
const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData)
}

const rateProduct = async (productId, userId, rating) => {
    const product = await Product.findById(productId)
    const existing = product.ratings.find(r => r.user.toString() === userId)
    if (existing) {
        existing.rating = rating
    } else {
        product.ratings.push({ user: userId, rating })
    }
    return await product.save()
}

export {createProduct,getProduct,getProducts,updateProduct,deleteProduct,rateProduct}