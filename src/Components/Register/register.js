import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./register.css";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [postImage, setPostImage] = useState({
    image: "",
  });
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

  const ValidateEmail = (inputText) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      toast.error("You have entered an invalid email address!");
      return false;
    }
  };

  const register = () => {
    const { name, email, password, reEnterPassword } = user;
    if (name && email && password && password == reEnterPassword) {
      if (ValidateEmail(email)) {
        axios
          .post("http://localhost:8000/register", { user, postImage })
          .then((res) => {
            alert(res.data.message);
            navigate("/");
          });
      }
    } else {
      alert("Please Fill All Input Fields");
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, image: base64.toString() });
  };

  return (
    <div className="register">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      <label htmlFor="Picture">Picture</label>
      <input
        type="file"
        name="pic"
        id="pic"
        accept=".jpeg, .png, .jpg"
        onChange={(e) => handleFileUpload(e)}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>Or</div>
      <div
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Login
      </div>
    </div>
  );
};

export default RegisterPage;
