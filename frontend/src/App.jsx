import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboad from "./pages/Dashboad.jsx";
import CreateQuestion from "./pages/CreateQuestion.jsx";
import toast, { Toaster } from "react-hot-toast";
import ViewAllQuestions from "./pages/ViewAllQuestions.jsx";
import UpdateQuestion from "./pages/UpdateQuestion.jsx";
import { Settings } from "lucide-react";
import SettingComp from "./pages/SettingComp.jsx";
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
        <Route path="/view" element={<ViewAllQuestions />}></Route>
        <Route path="/edit" element={<UpdateQuestion />}></Route>
        <Route path="/settings" element={<SettingComp />}></Route>
      </Routes>
    </div>
  );
};

export default App;
