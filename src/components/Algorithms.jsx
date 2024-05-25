import { useState } from "react";
import { algorithms } from "../data";

const AlgorithmItem = ({ algorithms }) => {
  return (
    <>
      {algorithms.map((algorithm, index) => (
        <span key={index} className="w-[200px] flex flex-col items-center">
          <img
            src={algorithm.image}
            alt="algorithm-image"
            className="w-[80%] select-none"
          />
          <p className="text-[80%] whitespace-nowrap">{algorithm.rotations}</p>
        </span>
      ))}
    </>
  );
};

const Algorithms = () => {
  const [selected, setSelected] = useState(true);

  return (
    <div className="max-w-3xl flex flex-col justify-center items-center mx-auto mt-[36px] pb-[36px]">
      <span
        onClick={() => setSelected(!selected)}
        className="flex flex-row justify-center mb-[18px] gap-2 font-bold cursor-pointer select-none"
      >
        <p
          className={`border-b-[4px] ${
            selected == true ? "border-accent_dark" : "border-transparent"
          }`}
        >
          2-LOOK PLL
        </p>
        {"/"}
        <p
          className={`border-b-[4px] ${
            selected == false ? "border-accent_dark" : "border-transparent"
          }`}
        >
          2-LOOK OLL
        </p>
      </span>
      <div className="max-w-3xl flex flex-wrap justify-center items-center mx-auto gap-2">
        {selected ? (
          <AlgorithmItem algorithms={algorithms[0].pll} />
        ) : (
          <AlgorithmItem algorithms={algorithms[0].oll} />
        )}
      </div>
    </div>
  );
};

export default Algorithms;
