import { useState, useEffect, useContext } from "react";
import { Graph, Time } from "../components";
import { Context } from "../App";

const Statistics = () => {
  const [darkMode] = useContext(Context);

  const [solves] = useState(JSON.parse(localStorage.getItem("solves")) || []);

  const [averages, setAverages] = useState({
    Ao5: JSON.parse(localStorage.getItem("Ao5")) || null,
    Ao12: JSON.parse(localStorage.getItem("Ao12")) || null,
    Ao50: JSON.parse(localStorage.getItem("Ao50")) || null,
    Ao100: JSON.parse(localStorage.getItem("Ao100")) || null,
  });

  useEffect(() => {
    setAverages({
      Ao5: null,
      Ao12: null,
      Ao50: null,
      Ao100: null,
    });

    const calculateAverage = (values, count) => {
      let sum = 0;
      values.slice(Math.max(values.length - count, 0)).forEach((value) => {
        sum += value;
      });
      return Math.round((sum / count) * 1000) / 1000;
    };

    if (solves.length > 4) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        Ao5: calculateAverage(solves, 5),
      }));
      localStorage.setItem("Ao5", JSON.stringify(calculateAverage(solves, 5)));
    }
    if (solves.length > 11) {
      setAverages((prevAverages) => ({
        ...prevAverages,
        Ao12: calculateAverage(solves, 12),
      }));
      localStorage.setItem(
        "Ao12",
        JSON.stringify(calculateAverage(solves, 12))
      );
    }
    if (solves.length > 49) {
      localStorage.setItem(
        "Ao50",
        JSON.stringify(calculateAverage(solves, 50))
      );
    }
    if (solves.length > 99) {
      localStorage.setItem(
        "Ao100",
        JSON.stringify(calculateAverage(solves, 100))
      );
    }
  }, []);

  const generateSolves = (solves, count) => {
    const previousSolves = solves.slice(Math.max(solves.length - count, 0));
    const solveSpan = [];
    let lowestTime = null;

    for (let i = 0; i < count; i++) {
      let time = previousSolves[i] || null;
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

  const sections = [
    {
      label: "RECENT 5",
      average: averages.Ao5,
      solves: generateSolves(solves, 5),
    },
    {
      label: "RECENT 12",
      average: averages.Ao12,
      solves: generateSolves(solves, 12),
    },
    {
      label: "RECENT 50",
      average: averages.Ao50,
      solves: generateSolves(solves, 50),
    },
    {
      label: "RECENT 100",
      average: averages.Ao100,
      solves: generateSolves(solves, 100),
    },
  ];

  return (
    <div className="max-w-xl flex flex-col items-center mx-auto mt-[52px] pb-[52px] gap-[18px]">
      {sections.map((section, index) => (
        <section
          key={index}
          className="w-min-content h-min-content flex flex-col"
        >
          <p>{section.label}</p>
          <span className="flex flex-row justify-between">
            <p
              className={`${
                !darkMode ? "text-accent_light" : "text-accent_dark"
              }`}
            >
              AVERAGE ={" "}
              {section.average ? <Time value={section.average} /> : "X"}
            </p>
            <p
              className={`${
                !darkMode ? "text-accent_light" : "text-accent_dark"
              }`}
            >
              BEST ={" "}
              {section.solves.lowest ? (
                <Time value={section.solves.lowest} />
              ) : (
                "X"
              )}
            </p>
          </span>
          <Graph solves={section.solves.solves} width={360} height={220} />
        </section>
      ))}
    </div>
  );
};

export default Statistics;
