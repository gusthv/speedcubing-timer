import { useState, useEffect, useContext } from "react";
import { algorithmList } from "../../data";
import { AlgorithmCollection } from "../../components";
import { Context } from "../../App";

const Algorithms: React.FC = () => {
  const { darkMode } = useContext(Context);

  const [toggleAlgorithm, setToggleAlgorithm] = useState<boolean>(
    JSON.parse(localStorage.getItem("toggleAlgorithm") as string) || false
  );

  useEffect(() => {
    localStorage.setItem("toggleAlgorithm", JSON.stringify(toggleAlgorithm));
  }, [toggleAlgorithm]);

  return (
    <div className="h-full overflow-y-scroll">
      <div className="max-w-xl h-min-content flex flex-col items-center mx-auto py-[18px]">
        <span
          onClick={() => setToggleAlgorithm(!toggleAlgorithm)}
          className="w-[340px] flex flex-row justify-center mb-[18px] p-2 gap-2 border-[2px] border-dotted hover:border-solid border-[#80808016] hover:bg-[#80808032] text-[#808080] font-semibold cursor-pointer rounded-md"
        >
          <p
            className={`${
              toggleAlgorithm && darkMode
                ? "text-[#FFFFFF] font-bold"
                : toggleAlgorithm && !darkMode
                ? "text-[#000000] font-bold"
                : ""
            }`}
          >
            2-LOOK OLL
          </p>
          {"/"}
          <p
            className={`${
              !toggleAlgorithm && darkMode
                ? "text-[#FFFFFF] font-bold"
                : !toggleAlgorithm && !darkMode
                ? "text-[#000000] font-bold"
                : ""
            }`}
          >
            2-LOOK PLL
          </p>
        </span>
        <div className="flex flex-wrap justify-center items-center mx-auto gap-[18px]">
          <AlgorithmCollection
            algorithmList={
              toggleAlgorithm ? algorithmList[0].pll : algorithmList[0].oll
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
