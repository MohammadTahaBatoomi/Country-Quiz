"use client";
import Image from "next/image";
import React, { useState } from "react";

const questions = [
  {
    flag: "🇫🇮",
    options: ["Sweden", "Vietnam", "Finland", "Austria"],
    answer: 2,
  },
];

const CountryQuiz: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[0];

  const handleSelect = (idx: number) => {
    if (selected === null) {
      setSelected(idx);
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-4 py-10">
      {/* Header بالا و وسط‌چین */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-[#b8b8d1] text-2xl font-bold">Country Quiz</h1>
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg font-bold py-2 px-8 rounded-full">
          {current}/10 Point
        </span>
      </div>

      {/* Quiz Box */}
      <div className="bg-[#343963] rounded-2xl shadow-2xl md:px-12 px-6 py-10 w-full max-w-2xl flex flex-col gap-8">
        {/* Steps */}
        <div className="flex justify-center md:gap-2.5 gap-1.5 mb-2">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              className={`md:w-12 md:h-12 w-9 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                i === current - 1
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg"
                  : i < current - 1
                  ? "bg-pink-200 text-pink-700"
                  : "bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="text-center">
          <h2 className="text-xl font-bold">
            Which country does this flag{" "}
            <span className="inline-block align-middle text-3xl mx-1">
              {q.flag}
            </span>{" "}
            belong to?
          </h2>
        </div>

        {/* Answers */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-5">
          {q.options.map((opt, idx) => {
            let btnClass =
              "py-4 rounded-xl text-lg font-semibold flex items-center justify-center transition-all duration-500 relative ";
            let icon = null;

            if (selected !== null) {
              if (idx === selected && selected !== q.answer) {
                btnClass +=
                  "bg-gradient-to-r from-pink-400 to-purple-400 text-white";
                icon = (
                  <Image
                    src="images/resources/Close_round_fill.svg"
                    width={25}
                    height={25}
                    alt=""
                    className="pl-2"
                  />
                );
              } else if (idx === q.answer) {
                btnClass += "bg-[#393f6f] text-blue-400";
                icon = (
                  <Image
                    src="images/resources/Check_round_fill.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="pl-2"
                  />
                );
              } else {
                btnClass +=
                  "bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1] opacity-60";
              }
            } else {
              btnClass +=
                "bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1] hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition-all duration-1000";
            }

            return (
              <button
                key={opt}
                className={btnClass}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
              >
                {opt} {icon}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CountryQuiz;