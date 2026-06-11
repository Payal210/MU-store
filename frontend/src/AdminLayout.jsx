import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export default function AdminLayout() {
  return (
    <div>
      <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
        <Link to="/admin">Users</Link>
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>
      <hr />
      <div style={{ marginTop: "12px" }}>
        <Outlet />
      </div>
    </div>
  )
}
