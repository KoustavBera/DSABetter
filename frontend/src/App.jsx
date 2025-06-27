import React, { useContext } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import { EditModalProvider } from "../context/EditModalProvider.jsx";
import About from "./pages/About.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { userData } = useContext(AuthDataContext);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <EditModalProvider>
        <Routes>
          {!userData ? (
            <Route path="/" element={<Home />}></Route>
          ) : (
            <Route path="/" element={<Dashboad />}></Route>
          )}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/create" element={<CreateQuestion />}></Route>
          <Route path="/view" element={<ViewAllQuestions />}></Route>
          <Route path="/edit" element={<UpdateQuestion />}></Route>
          <Route path="/settings" element={<SettingComp />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </EditModalProvider>
    </div>
  );
};

export default App;
