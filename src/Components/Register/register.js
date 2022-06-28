import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./register.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password == reEnterPassword) {
      axios.post("http://localhost:8000/register", user).then((res) => {
        alert(res.data.message);
        navigate("/login");
      });
    } else {
      alert("invalid input");
    }
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter Your Name"
        onChange={handleChange}
      ></input>
      <input
        type="text"
        name="email"
        value={user.email}
        placeholder="Enter Your Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter Your Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="reEnterPassword"
        value={user.reEnterPassword}
        placeholder="Re-Enter Your Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>Or</div>
      <div
        className="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </div>
    </div>
  );
};

export default RegisterPage;
