import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useQuestions } from "../../context/QuestionsProvider";
const Banner = () => {
  const { bannerclicked, setbannerclicked } = useQuestions();
  return (
    <div
      className={`${
        !bannerclicked ? `h-[50px]` : `h-[0px]`
      } w-[100vw] bg-blue-600 text white flex items-center justify-center relative duration-200 transition-all  `}
    >
      {!bannerclicked && (
        <div className="flex items-center w-full justify-center relative">
          <Link
            to="https://docs.google.com/forms/d/e/1FAIpQLSfO0Tb9RYotsWI2nmXH7asTYLTyZ9Z8nPccEneCpAaqUy0BiQ/viewform"
            className="text-white underline"
          >
            <p>New to app? Please take your time to give us a feedback! 🔥</p>
          </Link>
          <button
            className="text-white z-10 absolute top-1 right-10 active:bg-gray-400 active:rounded-full"
            onClick={() => setbannerclicked(true)}
            aria-label="Close banner"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Banner;
