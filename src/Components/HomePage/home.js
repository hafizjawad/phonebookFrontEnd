import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./home.css";

const HomePage = ({ User, setLoginUser }) => {
  const [data, setData] = useState([]);
  console.log("User from home", User);

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/get/${User.id}`
    );
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // const deleteContact = (id) => {
  //   if (window.confirm("Are Your Sure you want to Delete Record")) {
  //     axios.delete(`http://localhost:8000/api/delete/${id}`);
  //     toast.success("Contact Deleted Successfully");
  //     setTimeout(() => loadData(), 500);
  //   }

  return (
    <div className="table_body">
      {/* <Link to="/addinfo">
          <button className="btn btn-contact">Add Record</button>
        </Link> */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Name</th>
            <th>Contact No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.phoneno}</td>
                <td>
                  <Link to={`update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
