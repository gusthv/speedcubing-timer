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
        className={`w-full flex md:flex flex-col justify-center items-center mx-auto mt-[36px] pb-[52px] gap-[18px]`}
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
              }`}
            >
              <p className="hidden md:flex">TIME</p>
              <p className="hidden md:flex md:ml-[20px]">SCRAMBLE</p>
            </span>
            <p
              onClick={() => clearAll()}
              className={`${
                !darkMode ? "hover:text-accent_light" : "hover:text-accent_dark"
              } cursor-pointer`}
            >
              CLEAR
            </p>
          </span>
          {solves
            .slice()
            .reverse()
            .map((solve, index) => (
              <div key={index} className="flex flex-row mb-[4px]">
                <span
                  className={`w-full flex flex-col md:flex-row divide-y md:divide-none ${
                    !darkMode ? "divide-accent_light" : "divide-accent_dark"
                  }`}
                >
                  <p
                    className={`md:w-[10%] ${
                      !darkMode ? "text-accent_light" : "text-accent_dark"
                    }`}
                  >
                    {<Time value={solve} />}
                  </p>
                  <p className="md:w-[80%] text-[14px] md:text-[16px]">
                    {scrambles[solves.length - 1 - index]}
                  </p>
                  {/* <hr
                    className={`w-full flex md:hidden ${
                      !darkMode ? "text-accent_light" : "text-accent_dark"
                    }`}
                  /> */}
                </span>
                <span>
                  <p
                    onClick={() => deleteSolve(index)}
                    className={`md:w-[10%] ${
                      !darkMode
                        ? "hover:text-accent_light"
                        : "hover:text-accent_dark"
                    } cursor-pointer`}
                  >
                    X
                  </p>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Solves;
