import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const SECRET = process.env.SECRET
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) throw new Error("No token provided");
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Invalid Token" });
  }
};
const authorize = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  };
};
export { authenticate, authorize }