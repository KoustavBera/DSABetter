import React from "react";
import Nav from "../components/Nav";

const Home = () => {
  return (
    <div>
      <Nav />
      <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col">
        <h1 className="text-7xl">REVISE DSA EFFECTIVELY</h1>
      </div>
    </div>
  );
};

export default Home;
