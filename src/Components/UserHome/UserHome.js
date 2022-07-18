import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

import "./UserHome.css";

const UserHome = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get(`http://localhost:8000/api/get`, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are Your Sure you want to Delete Record")) {
      axios.delete(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
        },
      });
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Numbers</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-40 py-10 sm:px-0">
            {/* Start Table */}

            <div className="container flex justify-center mx-auto">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="border-b border-gray-200 shadow">
                    <table className="divide-y divide-gray-300 ">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            ID
                          </th>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            Name
                          </th>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            PhoneNo
                          </th>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            Picture
                          </th>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            Edit
                          </th>
                          <th className="px-6 py-2 text-xs text-gray-500">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-300">
                        {data.map((item, index) => {
                          return (
                            <tr className="whitespace-nowrap">
                              <td className="px-6 py-4 text-base text-gray-500">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-base text-gray-900">
                                  {item.name}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-base text-gray-500">
                                  {item.phoneno}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                <img
                                  src={`http://localhost:8000${item.image}`}
                                  className="rounded-full w-20 shadow-lg"
                                  alt="Avatar"
                                />
                              </td>
                              <td className="px-6 py-4">
                                <a href={`editinfo/${item.id}`}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                </a>
                              </td>
                              <td className="px-6 py-4">
                                <button onClick={() => deleteContact(item.id)}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
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

export default UserHome;
