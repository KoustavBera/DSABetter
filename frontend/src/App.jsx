import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboad from "./pages/Dashboad.jsx";
import CreateQuestion from "./pages/CreateQuestion.jsx";
import toast, { Toaster } from "react-hot-toast";
import ViewAllQuestions from "./pages/ViewAllQuestions.jsx";
import UpdateQuestion from "./pages/UpdateQuestion.jsx";
import SettingComp from "./pages/SettingComp.jsx";
import { EditModalProvider } from "../context/EditModalProvider.jsx";
import About from "./pages/About.jsx";
import { AuthDataContext } from "../context/AuthContext.jsx";
import Footer from "./components/Footer.jsx";
import MyLoader from "./components/MyLoader.jsx";

// 👇 mobile detection function
const isMobileDevice = () =>
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const App = () => {
  const { userData, loading } = useContext(AuthDataContext);

  // 👇 render mobile block screen
  if (isMobileDevice()) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", padding: "1rem" }}>
        <h1>Mobile Access Not Supported</h1>
        <p>
          Please open this website on a desktop or laptop for the best
          experience.
        </p>
      </div>
    );
  }

  if (loading) {
    return <MyLoader />;
  }
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <EditModalProvider>
        <Routes>
          {!userData ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="/" element={<Dashboad />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreateQuestion />} />
          <Route path="/view" element={<ViewAllQuestions />} />
          <Route path="/edit" element={<UpdateQuestion />} />
          <Route path="/settings" element={<SettingComp />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </EditModalProvider>
    </div>
  );
};

export default App;
