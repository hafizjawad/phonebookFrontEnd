import "./App.css";
import HomePage from "./Components/HomePage/home";
import Login from "./Components/Login/login";
import Register from "./Components/Register/register";
import Add from "./Components/Add/Add";
import Edit from "./Components/Edit/Edit";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user.id ? (
                <HomePage User={user} setLoginUser={setLoginUser} />
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
          <Route path="/addinfo/:id" element={<Add />} />
          <Route path="/editinfo/:id" element={<Edit />} />
          {/* <Route path="/update/:id" element={<AddEdit User={user} />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
