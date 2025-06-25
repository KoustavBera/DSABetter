import React from "react";
import { useNavigate } from "react-router-dom";

const ViewButton = (className = "") => {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <button
        id="button2"
        className="bg-gray-200 text-black font-medium px-4 py-2 w-auto mx-2 hover:bg-gray-300 rounded-full"
        onClick={() => navigate("/view")}
      >
        View all questions
      </button>
    </div>
  );
};

export default ViewButton;
