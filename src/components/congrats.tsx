import React from "react";

function congrats() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#343963] rounded-2xl shadow-2xl py-12 px-2 flex justify-center items-center flex-col gap-4.5">
        <img src="/images/resources/congrats.png" alt="" className="w-[380px]" /> 
        <h1 className="text-[#e1e1eb] text-3xl mx-10 text-center">Congrates! You completed <br /> the quiz.</h1>
        <p className="text-center text-lg">You answer 4/10 correctly</p>
        <button className="bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg font-medium py-4 px-18 rounded-lg cursor-pointer">Play again</button>
      </div>
    </div>
  );
}

export default congrats;
