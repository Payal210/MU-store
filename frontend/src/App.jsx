import React, { useState } from "react";
import { createContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
export const AppContext = createContext();
export default function App() {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser, cart, setCart }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}
