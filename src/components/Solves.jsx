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

  // const clearLocal = () => {
  //   localStorage.removeItem("solves");
  //   localStorage.removeItem("scrambles");
  //   localStorage.removeItem("Ao5");
  //   localStorage.removeItem("Ao12");
  //   localStorage.removeItem("Ao50");
  //   localStorage.removeItem("Ao100");
  // };

  // const clearAll = () => {
  //   clearLocal();
  //   setScrambles([]);
  //   setSolves([]);
  // };

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
        className={`w-full flex flex-col justify-center items-center mx-auto mt-[18px] pb-[18px] gap-[18px]`}
      >
        <div className="md:w-[600px]">
          <span
            className={`${solves == [] ? "hidden" : "flex"} flex-row ${
              !darkMode ? "text-accent_light" : "text-accent_dark"
            } font-bold`}
          >
            <p className="w-[10%]">TIME</p>
            <p>SCRAMBLE</p>
          </span>
          {solves
            .slice()
            .reverse()
            .map((solve, index) => (
              <div key={index} className="hidden md:flex flex-row">
                <p
                  className={`md:w-[10%] ${
                    !darkMode ? "text-accent_light" : "text-accent_dark"
                  }`}
                >
                  {<Time value={solve} />}
                </p>
                <p className="md:w-[80%]">
                  {scrambles[solves.length - 1 - index]}
                </p>
                <span className="">
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
