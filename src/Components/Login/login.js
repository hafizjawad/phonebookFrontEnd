import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.css";

const LoginPage = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = () => {
    axios.post("http://localhost:8000/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.find);
      console.log("Token from front end", res.data.tokendata);
      localStorage.setItem("jwt", JSON.stringify(res.data.token));
      localStorage.setItem("userId", JSON.stringify(res.data.find.id));
      console.log("res.data.find", res.data.find);
      navigate("/");
      console.log(res.data.find);
    });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter Your Email"
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter Your Password"
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>Or</div>
      <div
        className="button"
        onClick={() => {
          navigate("/register");
        }}
      >
        Register
      </div>
    </div>
  );
};

export default LoginPage;
