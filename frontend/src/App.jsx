import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Nav from "./components/Nav.jsx";
import Dashboad from "./pages/Dashboad.jsx";
import CreateQuestion from "./pages/CreateQuestion.jsx";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const notify = () => toast("Here is your toast.");
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboad />}></Route>
        <Route path="/create" element={<CreateQuestion />}></Route>
      </Routes>
    </div>
  );
};

export default App;
