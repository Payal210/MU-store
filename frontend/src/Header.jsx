import { Link } from "react-router-dom";
import { AppContext } from "./App";
import { useContext } from "react";

function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center px-5 py-3">
      <div className="font-bold text-lg">MU26A Store</div>
      <div className="flex gap-4">
        <Link to="/home" className="text-white text-sm hover:underline">Home</Link>
        <Link to="cart" className="text-white text-sm hover:underline">Cart</Link>
        <Link to="order" className="text-white text-sm hover:underline">Order</Link>
        {user.role === "admin" && (
          <Link to="admin" className="text-white text-sm hover:underline">Admin</Link>
        )}
        <Link to="login" className="text-white text-sm hover:underline">Login</Link>
      </div>
    </div>
  );
}

export default Header;
