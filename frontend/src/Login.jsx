import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AppContext } from "./App";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const url = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleLogin = async () => {
    const res = await axios.post(`${url}/users/login`, { email, password });
    if (res.data.user) {
      setUser(res.data.user);
      Navigate("/home");
    } else {
      setMessage("Invalid User");
    }
  };
  return (
    <div>
      <h3>Login Form</h3>
      {message}
      <p>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </p>
      <button onClick={handleLogin}>Login</button>
      <p>
        <Link to="/register">New User Register Here</Link>
      </p>
    </div>
  );
}
