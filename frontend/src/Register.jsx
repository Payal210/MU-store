import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const [user, setUser] = useState();
  const url = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const handleRegister = async () => {
    const res = await axios.post(`${url}/users/register`, user);
    Navigate("/login");
  };
  return (
    <div>
      <h3>Registration Form</h3>
      <p>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
      </p>
      <p>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
      </p>
      <button onClick={handleRegister}>Register</button>
      <p>
        <Link to="/login">Already a member? Login here</Link>
      </p>
    </div>
  );
}
