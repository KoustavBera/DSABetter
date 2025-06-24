import React from "react";

const CreateButton = ({ className = "" }) => {
  return (
    <div className={className}>
      <button
        id="button1"
        className="bg-blue-600 text-white px-4 py-2 w-auto hover:bg-blue-800 rounded-full"
      >
        Create new question
      </button>
    </div>
  );
};

export default CreateButton;
