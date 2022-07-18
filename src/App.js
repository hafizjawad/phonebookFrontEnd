import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Register from "./Components/Register/register";
import Add from "./Components/Add/Add";
import Edit from "./Components/Edit/Edit";
import HomePageTest from "./Components/HomePage Test/HomePageTest";
import UserHome from "./Components/UserHome/UserHome";
import UserProfile from "./Components/UserProfile/UserProfile";

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
            element={user1 ? <UserHome /> : <HomePageTest />}
          />
          {/* <Route
            path="/userhome"
            element={user1 ? <UserHome /> : <HomePageTest />}
          /> */}

          <Route path="/userhome" element={<UserHome />} />

          <Route path="/register" element={<Register />} />
          <Route path="/addinfo" element={user1 ? <Add /> : <HomePageTest />} />
          <Route
            path="/editinfo/:id"
            element={user1 ? <Edit /> : <HomePageTest />}
          />
          <Route
            path="/userprofile"
            element={user1 ? <UserProfile /> : <HomePageTest />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
