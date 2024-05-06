import { useState, useContext } from "react";
import { Time } from "../components";
import { Context } from "../App";

const Solves = () => {
  const [darkMode] = useContext(Context);

  const [solves, setSolves] = useState(
    JSON.parse(localStorage.getItem("solves")) || []
  );
  const [scrambles, setScrambles] = useState(
    JSON.parse(localStorage.getItem("scrambles")) || []
  );

  const clearLocal = () => {
    localStorage.removeItem("solves");
    localStorage.removeItem("scrambles");
    localStorage.removeItem("Ao5");
    localStorage.removeItem("Ao12");
    localStorage.removeItem("Ao50");
    localStorage.removeItem("Ao100");
  };

  const clearAll = () => {
    clearLocal();
    setScrambles([]);
    setSolves([]);
  };

  const deleteSolve = (index) => {
    const updatedSolves = solves.slice().reverse();
    const updatedScrambles = scrambles.slice();

    updatedSolves.splice(index, 1);
    updatedScrambles.splice(solves.length - 1 - index, 1);

    setSolves(updatedSolves.reverse());
    setScrambles(updatedScrambles);
    localStorage.setItem("solves", JSON.stringify(updatedSolves));
    localStorage.setItem("scrambles", JSON.stringify(updatedScrambles));
  };

  return (
    <div>
      <div
        className={`w-full flex md:flex flex-col justify-center items-center mx-auto mt-[36px] pb-[36px] gap-[18px]`}
      >
        <div className="w-[90%] md:w-[600px]">
          <span
            className={`w-full ${
              solves[0] ? "flex" : "hidden"
            } flex-row justify-between items-center font-bold`}
          >
            <span
              className={`flex flex-col md:flex-row ${
                !darkMode ? "text-accent_light" : "text-accent_dark"
              } select-none`}
            >
              <p className="hidden md:flex">TIME</p>
              <p className="hidden md:flex ml-[32%]">SCRAMBLE</p>
            </span>
            <p
              onClick={() => clearAll()}
              className={`${
                !darkMode ? "hover:text-accent_light" : "hover:text-accent_dark"
              } cursor-pointer select-none`}
            >
              CLEAR
            </p>
          </span>
          {solves
            .slice()
            .reverse()
            .map((solve, index) => (
              <div
                key={index}
                className="flex flex-row-reverse md:flex-row gap-2 mb-[4px]"
              >
                <span
                  className={`w-full flex flex-col md:flex-row divide-y md:divide-none ${
                    !darkMode ? "divide-accent_light" : "divide-accent_dark"
                  }`}
                >
                  <p
                    className={`md:w-[14%] text-[22px] md:text-[16px] ${
                      !darkMode ? "text-accent_light" : "text-accent_dark"
                    }`}
                  >
                    {<Time value={solve} />}
                  </p>
                  <p className="md:w-[78%] text-[14px] md:text-[16px]">
                    {scrambles[solves.length - 1 - index]}
                  </p>
                </span>
                <span>
                  <svg
                    onClick={() => deleteSolve(index)}
                    className={`w-5 h-8 md:h-6 flex ${
                      !darkMode
                        ? "hover:fill-accent_light"
                        : "hover:fill-accent_dark fill-white"
                    } cursor-pointer`}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" />
                    <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" />
                  </svg>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Solves;
