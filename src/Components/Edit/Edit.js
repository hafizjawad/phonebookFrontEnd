import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./Edit.css";
import "react-toastify/dist/ReactToastify.css";

function Edit() {
  const [state, setState] = useState({});
  const { name, phoneno } = state;
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/getphone/${id}`)
      .then((resp) => setState({ ...resp.data }));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!name || !phoneno) {
      toast.error("Please Enter Value in All Fields");
    } else {
      axios
        .put(`http://localhost:8000/api/update`, {
          id,
          name,
          phoneno,
        })
        .then(() => {
          setState({ name: "", phoneno: "" });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Record Updated Successfully");
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
        <label htmlFor="phoneno">Phone No</label>
        <input
          type="number"
          name="phoneno"
          id="phoneno"
          placeholder="Enter Phone No"
          value={phoneno || ""}
          onChange={handleInputChange}
        ></input>
        <input type="submit" value={"Update"}></input>
        <Link to="/">
          <input type="button" value="Go Back"></input>
        </Link>
      </form>
    </div>
  );
}

export default Edit;
