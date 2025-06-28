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

  return (
    <>
      <nav className="flex items-center justify-between w-[100vw] h-[80px]   px-14 ">
        <div>
          <h1 className="font-bold text-[black] text-2xl flex justify-center items-center gap-2 ">
            <span>
              <img src={DSABetter} alt="" className="w-[5rem]" />
            </span>
          </h1>
        </div>
        <div>
          <ul className="text-lg flex gap-5 px-3">
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
      </nav>
    </>
  );
};

export default Nav;
