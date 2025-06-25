"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Congrats from "./congrats";

interface Country {
  name: { common: string };
  flags: { png: string; svg: string; alt?: string };
}

interface QuizQuestion {
  flag: Country["flags"];
  options: string[];
  answer: number;
}

function getRandomOptions(countries: Country[], correctIdx: number, count = 4) {
  const options = [countries[correctIdx].name.common];
  const used = new Set([correctIdx]);
  while (options.length < count) {
    const idx = Math.floor(Math.random() * countries.length);
    if (!used.has(idx)) {
      options.push(countries[idx].name.common);
      used.add(idx);
    }
  }
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

const AUTO_NEXT_DELAY = 1200; // ms

const CountryQuiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selectedCountries = shuffled.slice(0, 10);
        setCountries(selectedCountries);
        const qs: QuizQuestion[] = selectedCountries.map((country: Country, idx: number, arr: Country[]) => {
          const options = getRandomOptions(selectedCountries, idx);
          const answer = options.indexOf(country.name.common);
          return {
            flag: country.flags,
            options,
            answer,
          };
        });
        setQuestions(qs);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (showResult && selected !== null) {
      const timeout = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setSelected(null);
          setShowResult(false);
          setCurrent((prev) => prev + 1);
          setFade(true);
        }, 300); // fade out duration
      }, AUTO_NEXT_DELAY);
      return () => clearTimeout(timeout);
    }
  }, [showResult, selected]);

  const handleSelect = (idx: number) => {
    if (selected === null) {
      setSelected(idx);
      setShowResult(true);
      if (idx === questions[current].answer) {
        setScore((prev) => prev + 1);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">No questions available.</div>;
  }

  if (current >= questions.length) {
    return <Congrats score={score} total={questions.length} />;
  }

  const q = questions[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mx-4 py-10">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-[#fff] text-2xl font-bold">Country Quiz</h1>
        <span className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg font-bold py-2 px-6 rounded-full text-white">
          <span role="img" aria-label="trophy">🏆</span> {score}/{questions.length} Points
        </span>
      </div>

      {/* Quiz Box */}
      <div className={`bg-[#343964] rounded-2xl shadow-2xl md:px-12 px-6 py-10 w-full max-w-2xl flex flex-col gap-8 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
        {/* Steps */}
        <div className="flex justify-center md:gap-2.5 gap-1.5 mb-2">
          {[...Array(questions.length)].map((_, i) => (
            <button
              key={i}
              className={`md:w-12 md:h-12 w-10 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                i === current
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg text-white"
                  : i < current
                  ? "bg-pink-200 text-pink-700"
                  : "bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1] cursor-pointer"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="text-center flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-white md:flex items-center justify-center gap-2.5">
            Which country does this flag
            <span>
              <Image
                src={q.flag.png}
                alt={q.flag.alt || "country flag"}
                width={40}
                height={28}
                className="inline-block align-middle rounded shadow border md:pl-0 pl-2"
              />
            </span>
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
                  " bg-gradient-to-r from-pink-400 to-purple-400 text-white border-2 border-pink-400";
                icon = (
                  <Image
                    src="/images/resources/Close_round_fill.svg"
                    width={25}
                    height={25}
                    alt=""
                    className="pl-2"
                  />
                );
              } else if (idx === q.answer) {
                btnClass += " bg-[#393f6f] text-blue-400 border-2 border-blue-400";
                icon = (
                  <Image
                    src="/images/resources/Check_round_fill.svg"
                    alt=""
                    width={25}
                    height={25}
                    className="pl-2"
                  />
                );
              } else {
                btnClass +=
                  " bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1] opacity-60";
              }
            } else {
              btnClass +=
                " bg-[#393f6f] border border-[#3b3f5c] text-[#b8b8d1] hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 hover:text-white transition-all duration-1000";
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
        {/* No Next button, auto next with motion */} 
      </div>
    </div>
  );
};

export default CountryQuiz;
