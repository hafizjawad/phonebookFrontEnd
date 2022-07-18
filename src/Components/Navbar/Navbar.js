import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "/userhome", current: true },
  { name: "Add Contact", href: "/addinfo", current: true },
  { name: "My Profile", href: "/userprofile", current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const loadImage = async () => {
    const response = await axios.get(`http://localhost:8000/api/getuser`, {
      headers: {
        authorization: "Bearer " + JSON.parse(localStorage.getItem("jwt")),
      },
    });
    setUserData(response.data);
  };

  useEffect(() => {
    loadImage();
  }, []);

  const move = () => {
    navigate("/");
  };
  const userNavigation = [
    { name: "Your Profile", href: "/userprofile" },
    {
      name: "Sign out",
      href: "",
      function: () => {
        console.log("From drop down");
        localStorage.removeItem("userId");
        localStorage.removeItem("jwt");
        move();
      },
    },
  ];

  return (
    <>
      <div className="min-h-full min-w-full ">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="py-1 text-white text-center ">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-16 w-16 rounded-full"
                              src={`http://localhost:8000${userData.image}`}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                    onClick={
                                      item.name == "Sign out"
                                        ? item.function
                                        : null
                                    }
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

export default Navbar;
