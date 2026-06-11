import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Order() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const fetchOrders = async () => {
    const res = await axios.get(`${url}/orders/myorders`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOrders(res.data.orders);
  };
  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);
  if (!user?.token) {
    return (
      <div>
        <p>Please login to view your orders.</p>
        <button onClick={() => Navigate("/login")}>Login</button>
      </div>
    );
  }
  return (
    <div>
      <h3>My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ol>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>Order Value: ₹{order.orderValue}</strong> — Status: {order.status} — {new Date(order.createdAt).toLocaleDateString()}
              <ul>
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
