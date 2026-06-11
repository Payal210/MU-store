import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()
const SECRET = process.env.SECRET
const getUser = async (userId) => {
    return await User.findOne({ _id: userId })
}

const updateUser = async (userId,userData) => {
    return await User.findByIdAndUpdate(userId,userData)
}

const getUsers = async () => {
    return await User.find();
};

const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId)
}

const authUser = async (userData) => {
    const found = await User.findOne({ email: userData.email })
    if (found) {
        const chkPassword = await bcrypt.compare(userData.password, found.password)
        if (chkPassword) {
            const user = {
                id: found._id,
                name: found.name,
                email: found.email,
                role: found.role
            }
            const token = await jwt.sign(user, SECRET, { expiresIn: "1h" })
            return { ...user, token }
        }

    }
};
const createUser = async (userData) => {
    console.log(userData)
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashedPassword
    return await User.create(userData);
};
export { getUsers, createUser, authUser, deleteUser,getUser,updateUser };