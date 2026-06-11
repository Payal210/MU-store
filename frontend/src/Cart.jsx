import React from "react";
import { AppContext } from "./App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const Navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const orderValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };
  const placeOrder = async () => {
    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    await axios.post(
      `${url}/orders/create`,
      { items, orderValue },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setCart([]);
    Navigate("/order");
  };
  return (
    <div>
      My Cart
      {cart &&
        cart.map((item) => (
          <div key={item._id}>
            {item.name}-{item.price}-
            <button onClick={() => decrement(item._id)}>-</button>
            {item.quantity}
            <button onClick={() => increment(item._id)}>+</button>-
            {item.price * item.quantity}-
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      Order Value:{orderValue}
      <p>
        {user?.email ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}
