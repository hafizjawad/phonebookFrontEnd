import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Add.css";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  phoneno: "",
};

function Add() {
  const { id } = useParams();
  console.log("id from add", id);
  const [state, setState] = useState(initialState);
  const { name, phoneno } = state;
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name || !phoneno) {
      toast.error("Please Enter Value in All Fields");
    } else {
      axios
        .post(`http://localhost:8000/api/post`, {
          id,
          name,
          phoneno,
        })
        .then(() => {
          setState({ name: "", phoneno: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });

      toast.success("Record Added Successfully");
    }
    setTimeout(() => navigate("/"), 2000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };
  return (
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

      <form className="form_in_body" onSubmit={submitHandler}>
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
          onChange={handleInputChange}
        ></input>
        <input type="submit" value={"Save"}></input>
        <Link to="/">
          <input type="button" value="Go Back"></input>
        </Link>
      </form>
    </div>
  );
}

export default Add;
