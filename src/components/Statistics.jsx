import { useState, useContext } from "react";
import { Graph, Time } from "../components";
import { Context } from "../App";

const Statistics = () => {
  const [darkMode] = useContext(Context);

  const [solves] = useState(JSON.parse(localStorage.getItem("solves")) || []);

  const [averages] = useState({
    Ao5: JSON.parse(localStorage.getItem("Ao5")) || null,
    Ao12: JSON.parse(localStorage.getItem("Ao12")) || null,
    Ao50: JSON.parse(localStorage.getItem("Ao50")) || null,
    Ao100: JSON.parse(localStorage.getItem("Ao100")) || null,
  });

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
    <div className="max-w-xl flex flex-col items-center mx-auto mt-[18px] pb-[18px] gap-[18px]">
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
              AVERAGE:{" "}
              {section.average ? <Time value={section.average} /> : "-"}
            </p>
            <p
              className={`${
                !darkMode ? "text-accent_light" : "text-accent_dark"
              }`}
            >
              BEST:{" "}
              {section.solves.lowest ? (
                <Time value={section.solves.lowest} />
              ) : (
                "-"
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
