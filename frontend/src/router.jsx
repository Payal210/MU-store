import { createBrowserRouter } from "react-router-dom";
import Cart from "./Cart";
import Home from "./Home";
import Orders from "./Orders";
import Login from "./Login";
import Products from "./Products";
import Register from "./Register";
import EditUser from "./EditUser";
import RootLayout from "./RootLayout";
import Order from "./Order";
import AdminLayout from "./AdminLayout";
import Users from "./Users";
import EditProduct from "./EditProduct";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Users /> },
          { path: "editUser/:userId", element: <EditUser /> },
          { path: "products", element: <Products /> },
          { path: "editProduct/:productId", element: <EditProduct /> },
          { path: "orders", element: <Orders /> },
        ],
      },
    ],
  },
]);