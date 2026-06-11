import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "./App";
export default function Users() {
  const { user: currentUser } = useContext(AppContext);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const url = import.meta.env.VITE_API_URL + "/users";
  const handleRegister = async () => {
    const res = await axios.post(`${url}/register`, user);
    fetchUsers();
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${url}/get`, {
        headers: { Authorization: `Bearer ${currentUser.token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userId) => {
    const res = await axios.delete(`${url}/delete/${userId}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h3>Users</h3>

      <p>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />

        <input
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <input
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <input
          type="text"
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          placeholder="Role"
        />

        <button onClick={handleRegister}>Add</button>
      </p>

      <ol>
        {users &&
          users.map((user) => (
            <li key={user._id}>
              <Link to={`editUser/${user._id}`}> {user.name}</Link>-{user.email}
              -{user.role}-
              <button onClick={() => deleteUser(user._id)}>Delete</button>
            </li>
          ))}
      </ol>
    </div>
  );
}
