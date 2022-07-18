import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

import "./Add.css";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  phoneno: "",
  image: "",
};

function ValidatePhoneNumber(inputNumber) {
  let phoneno = /^\d{11}$/;
  if (inputNumber.match(phoneno)) {
    return true;
  } else {
    toast.error("You have entered an invalid Phone Number");
    return false;
  }
}

function Add() {
  const [postImage, setPostImage] = useState({
    image: "",
  });
  const [state, setState] = useState(initialState);
  const { name, phoneno } = state;
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name || !phoneno || !postImage) {
      toast.error("Please Enter Value in All Fields");
    } else if (ValidatePhoneNumber(phoneno)) {
      axios
        .post(
          `http://localhost:8000/api/post`,
          {
            name,
            phoneno,
            postImage,
          },
          {
            headers: {
              authorization:
                "Bearer " + JSON.parse(localStorage.getItem("jwt")),
            },
          }
        )
        .then(() => {
          setState({ name: "", phoneno: "", postImage: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });

      toast.success("Record Added Successfully");
      setTimeout(() => navigate("/userhome"), 2000);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
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
    <>
      <Navbar />
      <div className="form_body">
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

        <form
          className="form_in_body"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={name || ""}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="phoneno">phoneno</label>
          <input
            type="number"
            name="phoneno"
            id="phoneno"
            placeholder="Enter Phone No"
            value={phoneno || ""}
            maxLength={11}
            minLength={11}
            onChange={handleInputChange}
          ></input>
          <label htmlFor="Picture">Picture</label>
          <input
            type="file"
            name="pic"
            id="pic"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => handleFileUpload(e)}
          ></input>
          <input type="submit" value={"Save"}></input>
          <Link to="/userhome">
            <input type="button" value="Go Back"></input>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Add;
