import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
export default function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
