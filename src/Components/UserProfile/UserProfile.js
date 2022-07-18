import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

import "./UserProfile.css";

const UserProfile = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(`http://localhost:8000/api/getuser`, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:px-8">
          <h1 className="flex items-center justify-center text-3xl font-bold text-gray-900">
            My Profile
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-40 py-0 sm:px-0">
            {/* Start Table */}

            <img
              src={`http://localhost:8000${data.image}`}
              className="justify-center mx-auto px-15 py-15 text-sm text-gray-500 rounded-full w-22 shadow-lg"
              alt="Avatar"
            />
            <div className="flex items-center justify-center mx-auto px-40 py-10 sm:px-0">
              <table className="table-fixed">
                <tbody>
                  <tr>
                    <td className="text-3xl font-bold text-gray-900">Name</td>
                    <td className="px-10 text-3xl font-bold text-gray-900">
                      {`${data.name}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-3xl font-bold text-gray-900">Email</td>
                    <td className="px-10 text-3xl font-bold text-gray-900">
                      {`${data.email}`}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-3xl font-bold text-gray-900">
                      PhoneNo
                    </td>
                    <td className="px-10 text-3xl font-bold text-gray-900">
                      {`${data.id}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="container flex justify-center mx-auto">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="border-b border-gray-200 shadow"></div>
                </div>
              </div>
            </div>

            {/* End Border */}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </>
  );
};

export default UserProfile;
