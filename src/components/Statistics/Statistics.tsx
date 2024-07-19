import { useState, useEffect } from "react";
import { Graph, Time } from "../../components";

const Statistics = () => {
  const solves = JSON.parse(localStorage.getItem("solves") as string) || [];

  const [averages, setAverages] = useState({
    AO5: JSON.parse(localStorage.getItem("AO5") as string) || null,
    AO12: JSON.parse(localStorage.getItem("AO12") as string) || null,
    AO50: JSON.parse(localStorage.getItem("AO50") as string) || null,
    AO100: JSON.parse(localStorage.getItem("AO100") as string) || null,
  });

  useEffect(() => {
    setAverages({
      AO5: null,
      AO12: null,
      AO50: null,
      AO100: null,
    });

    const calculateAverage = (values: [], count: number) => {
      let sum = 0;
      values.slice(Math.max(values.length - count, 0)).forEach((value) => {
        sum += value;
      });
      return Math.round((sum / count) * 1000) / 1000;
    };

    if (solves.length > 4) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        AO5: calculateAverage(solves, 5),
      }));
      localStorage.setItem("AO5", JSON.stringify(calculateAverage(solves, 5)));
    }
    if (solves.length > 11) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        AO12: calculateAverage(solves, 12),
      }));
      localStorage.setItem(
        "AO12",
        JSON.stringify(calculateAverage(solves, 12))
      );
    }
    if (solves.length > 49) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        AO50: calculateAverage(solves, 50),
      }));
      localStorage.setItem(
        "AO50",
        JSON.stringify(calculateAverage(solves, 50))
      );
    }
    if (solves.length > 99) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        AO100: calculateAverage(solves, 100),
      }));
      localStorage.setItem(
        "AO100",
        JSON.stringify(calculateAverage(solves, 100))
      );
    }
  }, []);

  const generateSolves = (solves: [], count: number) => {
    const previousSolves = solves.slice(Math.max(solves.length - count, 0));
    const solveSpan = [];

    let lowestTime = null;

    for (let i = 0; i < count; i++) {
      const time = previousSolves[i] || null;
      solveSpan.push({
        name: String(count - i),
        time: time,
      });

      if (time && (!lowestTime || time < lowestTime)) {
        lowestTime = time;
      }
    }
    return {
      solves: solveSpan,
      lowest: count <= solves.length ? lowestTime : null,
    };
  };

  const solveCollections = [
    {
      label: "RECENT 5",
      average: averages.AO5,
      solves: generateSolves(solves, 5),
    },
    {
      label: "RECENT 12",
      average: averages.AO12,
      solves: generateSolves(solves, 12),
    },
    {
      label: "RECENT 50",
      average: averages.AO50,
      solves: generateSolves(solves, 50),
    },
    {
      label: "RECENT 100",
      average: averages.AO100,
      solves: generateSolves(solves, 100),
    },
  ];
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
        } w-full h-full flex justify-center overflow-y-scroll`}
      >
        <div className="w-full max-w-xl flex flex-col items-center gap-[18px]">
          {solveCollections.map((collection, index) => (
            <div key={index} className="w-[340px] flex flex-col">
              <p className="px-2 font-bold">{collection.label}</p>
              <span className="flex flex-row justify-between px-2 font-semibold">
                <span className="flex flex-row gap-1">
                  AVERAGE =
                  <p
                    className={`${!collection.average ? "text-[#808080]" : ""}`}
                  >
                    {collection.average ? (
                      <Time value={collection.average} />
                    ) : (
                      "X"
                    )}
                  </p>
                </span>
                <span className="flex flex-row gap-1">
                  BEST =
                  <p
                    className={`${!collection.average ? "text-[#808080]" : ""}`}
                  >
                    {collection.solves.lowest ? (
                      <Time value={collection.solves.lowest} />
                    ) : (
                      "X"
                    )}
                  </p>
                </span>
              </span>
              <Graph
                solves={collection.solves.solves}
                width={340}
                height={220}
                type={!index ? "linear" : "monotone"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
