import React, { useState, useContext } from "react";
import { Time } from "../components";
import { Context } from "../App";

interface SolveItemProps {
  solve: number;
  index: number;
  originalIndex: number;
  deleteSolve: (index: number) => void;
  scramble: string;
  darkMode: boolean;
}

const Solves: React.FC = () => {
  const { darkMode, isMobile } = useContext(Context);

  const [solves, setSolves] = useState<number[]>(
    JSON.parse(localStorage.getItem("solves") as string) || []
  );
  const [scrambles, setScrambles] = useState<string[]>(
    JSON.parse(localStorage.getItem("scrambles") as string) || []
  );

  const clearLocal = () => {
    localStorage.removeItem("solves");
    localStorage.removeItem("scrambles");
    localStorage.removeItem("AO5");
    localStorage.removeItem("AO12");
    localStorage.removeItem("AO50");
    localStorage.removeItem("AO100");
  };

  const clearAll = () => {
    clearLocal();
    setScrambles([]);
    setSolves([]);
  };

  const deleteSolve = (index: number) => {
    const updatedSolves = solves.slice().reverse();
    const updatedScrambles = scrambles.slice();

    updatedSolves.splice(index, 1);
    updatedScrambles.splice(solves.length - 1 - index, 1);

    setSolves(updatedSolves.reverse());
    setScrambles(updatedScrambles);
    localStorage.setItem("solves", JSON.stringify(updatedSolves));
    localStorage.setItem("scrambles", JSON.stringify(updatedScrambles));
  };

  const SolveItem: React.FC<SolveItemProps> = ({
    solve,
    index,
    originalIndex,
    deleteSolve,
    scramble,
    darkMode,
  }) => (
    <span
      key={index}
      className="flex flex-row items-center p-4 gap-2 border-[2px] border-[#80808032] hover:bg-[#80808032] rounded-md"
    >
      <p className="text-[18px] font-semibold">{originalIndex + 1}</p>
      <span className="flex flex-row items-center gap-2">
        <svg
          onClick={() => deleteSolve(index)}
          className={`h-6 ${
            !darkMode ? "hover:fill-[#000000]" : "hover:fill-[#FFFFFF]"
          } fill-[#808080] cursor-pointer`}
          viewBox="0 0 24 24"
        >
          <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" />
          <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" />
        </svg>
        <p className="text-[18px] font-bold">
          <Time value={solve} />
        </p>
      </span>
      <p
        className={`flex items-center text-[#808080] ${
          isMobile ? "scaling-text" : ""
        } font-semibold`}
      >
        {scramble}
      </p>
    </span>
  );

  return (
    <div className="w-full h-full py-[18px]">
      <div
        className={`${
          !solves.length ? "flex" : "hidden"
        } w-full h-full justify-center items-center text-[#80808080] text-[4em] overflow-hidden`}
      >
        NO SOLVES
      </div>
      <div
        className={`${
          solves.length ? "flex" : "hidden"
        } w-full h-full flex justify-center overflow-x-hidden overflow-y-scroll`}
      >
        <div className="max-w-[80%] flex flex-col gap-[18px]">
          {solves
            .slice()
            .reverse()
            .map((solve: number, index: number) => {
              const originalIndex = solves.length - 1 - index;
              return (
                <div key={index}>
                  {index === 0 && (
                    <p
                      onClick={() => clearAll()}
                      className={`mb-[18px] p-2 font-bold text-center cursor-pointer border-[2px] border-dashed hover:border-solid border-[#80808016] hover:border-[#80808032] select-none rounded-md`}
                    >
                      CLEAR
                    </p>
                  )}
                  <SolveItem
                    solve={solve}
                    index={index}
                    originalIndex={originalIndex}
                    deleteSolve={deleteSolve}
                    scramble={scrambles[originalIndex]}
                    darkMode={darkMode}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Solves;
