import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./Components/HomePage/home";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Add from "./Components/Add/Add";
import Edit from "./Components/Edit/Edit";

import "./App.css";

function App() {
  const [user, setLoginUser] = useState({});
  const user1 = JSON.parse(localStorage.getItem("userId"));
  const id = parseInt(user1);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user1 ? (
                <HomePage id={id} User={user} setLoginUser={setLoginUser} />
              ) : (
                <Login setLoginUser={setLoginUser} />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addinfo/:id"
            element={user1 ? <Add /> : <Login setLoginUser={setLoginUser} />}
          />
          <Route
            path="/editinfo/:id"
            element={user1 ? <Edit /> : <Login setLoginUser={setLoginUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
