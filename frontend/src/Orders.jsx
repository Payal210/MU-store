import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./App";
import axios from "axios";
export default function Orders() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  const fetchOrders = async () => {
    const res = await axios.get(`${url}/orders/get`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setOrders(res.data.orders);
  };
  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user]);
  return (
    <div>
      <h3>All Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ol>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>{order.user?.name} ({order.user?.email})</strong> — ₹{order.orderValue} — Status: {order.status} — {new Date(order.createdAt).toLocaleDateString()}
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
