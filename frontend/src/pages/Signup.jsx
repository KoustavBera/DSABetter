import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ph from "../assets/placeholder.png";
import { AuthDataContext } from "../../context/AuthContext";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl, userData, setUserData } = useContext(AuthDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setUserData(response.data.user);
      navigate("/");
    } catch (error) {
      console.log(
        `error in axios response (Signup.jsx) message: ${error.message}`
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
        <h1 className="text-5xl text-black">Welcome to DSABetter</h1>
        <form
          className="w-full mt-6 flex flex-col gap-3"
          onSubmit={handleSignup}
        >
          <div className="flex flex-col gap-3 w-full">
            <label className="text-black">Name:</label>
            <input
              type="text"
              id="name"
              className=" p-1 rounded border-[1px] w-2/3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <button
              type="submit"
              className="bg-black p-2 mt-2 hover:bg-[#17ff0f] transition-colors duration-300 hover:text-black w-1/4 rounded text-white"
            >
              Sign up
            </button>
            <div>
              <p>
                Already have an account?{" "}
                <button
                  className="text-blue-700 font-medium hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>

      <div
        className="basis-1/3 "
        style={{ backgroundImage: `url(${ph})`, backgroundSize: "cover" }}
      ></div>
    </div>
  );
};

export default Signup;
