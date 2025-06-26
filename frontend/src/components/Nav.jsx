import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../../context/AuthContext";
import DSABetter from "../assets/DSABetter.png";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const { userData, setUserData, serverUrl } = useContext(AuthDataContext);
  // Function to generate random color
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
      "#5F27CD",
      "#00D2D3",
      "#FF9F43",
      "#C44569",
      "#F8B500",
      "#6C5CE7",
      "#A29BFE",
      "#FD79A8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Check if user is logged in
  const isLoggedIn = userData && userData.name;

  const handleLogout = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout error ", error.message);
    }
  };
  return (
    <>
      <nav className="flex items-center justify-between w-[100vw] h-[80px] border-[1px] border-b-slate-300  px-24 ">
        <div>
          <h1 className="font-bold text-[black] text-2xl flex justify-center items-center gap-2 ">
            <span>
              <img src={DSABetter} alt="" className="w-[5rem]" />
            </span>
          </h1>
        </div>
        <div>
          <ul className="text-xl flex gap-5 px-3">
            <li>
              <button onClick={() => navigate("/")}>Home</button>
            </li>
            <li>
              <button>About us</button>
            </li>
            {!userData ? (
              <>
                <li>
                  <button onClick={() => navigate("/signup")}>Sign up</button>
                </li>
                <li>
                  <button onClick={() => navigate("/login")}>Log in</button>
                </li>
              </>
            ) : (
              <li>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="relative">
          <button
            className="border-[1px] border-gray-300 p-4 rounded-full hover:bg-gray-300 shadow-inner"
            onClick={() => setClicked(!clicked)}
          >
            {isLoggedIn ? (
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: getRandomColor() }}
              >
                {userData.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <CgProfile className="text-[30px]" />
            )}
          </button>
          {userData && clicked && (
            <div className="h-[3em] w-[7em] bg-[white] rounded-lg border-[1px] border-gray-300 absolute top-16 flex items-center justify-center right-2 ">
              <button
                onClick={handleLogout}
                className="hover:bg-slate-200 w-full h-full"
              >
                logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
