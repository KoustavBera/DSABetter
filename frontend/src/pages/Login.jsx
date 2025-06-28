import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ph from "../assets/placeholder.png";
import { AuthDataContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import img1 from "/img1.svg";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl, setUserData, getUserData } = useContext(AuthDataContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await toast.promise(
        axios.post(
          serverUrl + "/api/auth/login",
          { email, password },
          { withCredentials: true }
        ),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) =>
            err?.response?.data?.message || "Something went wrong.",
        }
      );

      await getUserData(); // update context
      navigate("/");
    } catch (error) {
      console.log(
        `error in axios response (Login.jsx) message: ${error.message}`
      );
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div className="w-[43px] h-[40px] ml-3 mt-3 overflow-auto bg-[black] text-white rounded-[50%] flex items-center justify-center text-[25px]">
        <button onClick={() => navigate("/")}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="basis-2/3 bg-white flex flex-col items-start justify-center px-28 gap-4">
        <h1 className="text-5xl text-black">Welcome back to DSABetter</h1>
        <form
          onSubmit={handleLogin}
          className="w-full mt-6 flex flex-col gap-3"
        >
          <div className="flex flex-col gap-3 w-full">
            <label className="text-black">Email:</label>
            <input
              type="email"
              id="email"
              className=" p-1 rounded border-[1px] w-2/3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="password" className="text-black">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className=" p-1 rounded border-[1px] w-2/3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center ">
            <button className="bg-black p-2 mt-2 hover:bg-[#17ff0f] transition-colors duration-300 hover:text-black w-1/4 rounded text-white">
              Log in
            </button>
            <div>
              <p>
                Don't have an account?{" "}
                <button
                  className="text-blue-700 font-medium hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>

      <div
        className="basis-1/3 "
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

export default Login;
