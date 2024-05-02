import { useState, useEffect, useContext } from "react";
import { Time } from "../components";
import { Context } from "../App";

const Timer = () => {
  const [darkMode] = useContext(Context);

  const [step, setStep] = useState(0);

  const [time, setTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);
  const [threshold, setThreshold] = useState(false);

  const [thresholdInterval, setThresholdInterval] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);

  const [scramble, setScramble] = useState("");

  const [solves, setSolves] = useState(
    JSON.parse(localStorage.getItem("solves")) || []
  );
  const [scrambles, setScrambles] = useState(
    JSON.parse(localStorage.getItem("scrambles")) || []
  );
  const [averages, setAverages] = useState({
    Ao5: JSON.parse(localStorage.getItem("Ao5")) || null,
    Ao12: JSON.parse(localStorage.getItem("Ao12")) || null,
    Ao50: JSON.parse(localStorage.getItem("Ao50")) || null,
    Ao100: JSON.parse(localStorage.getItem("Ao100")) || null,
  });

  useEffect(() => {
    generateNewScramble();
  }, []);

  const handleKeyDown = (event) => {
    switch (step) {
      case 0:
        if (event.key === " ") {
          setStep(1);
        }
        break;
      case 2:
        setStep(3);
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (step) {
      case 1:
        if (event.key === " ") {
          if (threshold) {
            setStep(2);
          } else {
            clearInterval(thresholdInterval);
            setStep(0);
          }
        }
        break;
      case 3:
        setStep(4);
        break;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  useEffect(() => {
    switch (step) {
      case 1:
        startThreshold();
        break;
      case 2:
        setThreshold(false);
        startTimer();
        break;
      case 3:
        stopTimer();
        setPreviousTime(time);
        setSolves((solves) => [...solves, time]);
        setScrambles((scrambles) => [...scrambles, scramble]);
        generateNewScramble();
        break;
      case 4:
        setStep(5);
        break;
      case 5:
        setStep(0);
        break;
    }
  }, [step]);

  const generateNewScramble = () => {
    const rotations = [
      "F",
      "F'",
      "F2",
      "B",
      "B'",
      "B2",
      "L",
      "L'",
      "L2",
      "R",
      "R'",
      "R2",
      "U",
      "U'",
      "U2",
      "D",
      "D'",
      "D2",
    ];

    let generatedScramble = "";
    let scrambleIteration = "";
    let previousChar = "";

    const getRandomRotation = () => {
      return rotations[Math.floor(Math.random() * rotations.length)];
    };

    for (let i = 0; i < 21; i++) {
      do {
        scrambleIteration = getRandomRotation();
      } while (scrambleIteration.charAt(0) === previousChar);
      previousChar = scrambleIteration.charAt(0);
      generatedScramble += scrambleIteration + " ";
    }
    setScramble(generatedScramble);
  };

  const startThreshold = () => {
    let startTime = Date.now();
    let interval = setInterval(() => {
      let currentTime = Date.now();
      let incrementTime = currentTime - startTime;
      if (incrementTime >= 250) {
        clearInterval(interval);
        setThreshold(true);
      }
    }, 1);
    setThresholdInterval(interval);
  };

  const startTimer = () => {
    let startTime = Date.now();
    let interval = setInterval(() => {
      let currentTime = Date.now();
      let incrementTime = currentTime - startTime;
      setTime((prevTime) => prevTime + incrementTime);
      startTime = currentTime;
    }, 1);
    setTimerInterval(interval);
  };

  const stopTimer = () => {
    if (timerInterval) {
      setPreviousTime(time);
      setTime(0);
      clearInterval(timerInterval);
    }
  };

  useEffect(() => {
    localStorage.setItem("solves", JSON.stringify(solves));
    localStorage.setItem("scrambles", JSON.stringify(scrambles));

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
  }, [solves]);

  return (
    <div
      className="w-screen fixed flex justify-center items-center top-0"
      style={{ height: "calc(100vh + 60px)" }}
    >
      <section className="w-screen fixed flex left-0 justify-center items-center text-[122px]">
        <div className={`${threshold || step === 2 ? "visible" : "hidden"}`}>
          <p
            className={`${
              threshold ? "visible" : "hidden"
            } text-[#00ff00] TimerFont`}
          >
            0.00
          </p>
          <p className={`${!threshold ? "visible" : "hidden"}`}>
            <Time value={time} />
          </p>
        </div>
        <div className={`${threshold || step === 2 ? "hidden" : "visible"}`}>
          <p
            className={`max-w-xl px-16 text-[22px] text-center ${
              !darkMode ? "text-accent_light" : "text-accent_dark"
            }`}
          >
            {scramble}
          </p>
          <div className="flex justify-center">
            <div
              className={`${
                previousTime ? "visible" : "hidden"
              } absolute mt-[2px] ml-[260px] text-[20px]`}
            >
              {(() => {
                if (solves.length < 2) return null;
                const prevTime = previousTime || solves[solves.length - 1];
                const diff = prevTime - solves[solves.length - 2];

                if (diff > 0) {
                  return (
                    <div className="text-[red]">
                      +<Time value={diff} />
                    </div>
                  );
                } else if (diff < 0) {
                  return (
                    <div className="text-[#00ff00]">
                      -<Time value={-diff} />
                    </div>
                  );
                } else {
                  return <div className="TimerFont">0.00</div>;
                }
              })()}
            </div>
            <div
              className={`${
                threshold || step === 2 ? "hidden" : "visible"
              } text-[104px] drop-shadow-2xl`}
            >
              <p
                className={`${
                  step === 1 ? "visible" : "hidden"
                } text-[red] TimerFont`}
              >
                0.00
              </p>
              <div className={`${step === 1 ? "hidden" : "visible"}`}>
                <p
                  className={`${previousTime ? "visible" : "hidden"} TimerFont`}
                >
                  <Time
                    value={
                      previousTime === solves[solves.length]
                        ? previousTime
                        : solves[solves.length - 1]
                        ? solves[solves.length - 1]
                        : "0.00"
                    }
                  />
                </p>
                <p
                  className={`${previousTime ? "hidden" : "visible"} TimerFont`}
                >
                  0.00
                </p>
              </div>
            </div>
            <div className={`${threshold ? "visible" : "hidden"} text-[104px]`}>
              <p className={`${step === 2 ? "visible" : "hidden"}`}>
                <Time value={time} />
              </p>
              <p
                className={`${
                  step === 2 ? "hidden" : "visible"
                } text-[#00ff00] TimerFont`}
              >
                0.00
              </p>
            </div>
          </div>
          <div className="flex justify-center text-[18px]">
            <div className="w-[320px] flex flex-row justify-between gap-4 text-center">
              <span className="w-1/3 rounded-xl">
                <p>{averages.Ao5 ? <Time value={averages.Ao5} /> : "-"}</p>
                <p
                  className={`rounded-b-2xl shadow-xl shadow-[#6bcef226] ${
                    !darkMode ? "text-accent_light" : "text-accent_dark"
                  } select-none`}
                >
                  Ao5
                </p>
              </span>
              <span className={`w-1/3 rounded-xl`}>
                {(() => {
                  if (previousTime === null) {
                    if (solves[solves.length - 1] == null) {
                      return <p>-</p>;
                    } else {
                      return (
                        <p>{<Time value={solves[solves.length - 1]} />}</p>
                      );
                    }
                  } else if (solves[solves.length - 2] != null) {
                    return <p>{<Time value={solves[solves.length - 2]} />}</p>;
                  } else {
                    return <p>-</p>;
                  }
                })()}
                <p
                  className={`rounded-b-2xl shadow-xl shadow-[#6bcef226] ${
                    !darkMode ? "text-accent_light" : "text-accent_dark"
                  } select-none`}
                >
                  PREVIOUS
                </p>
              </span>
              <span className={`w-1/3 rounded-xl`}>
                <p>{averages.Ao12 ? <Time value={averages.Ao12} /> : "-"}</p>
                <p
                  className={`rounded-b-2xl shadow-xl shadow-[#6bcef226] ${
                    !darkMode ? "text-accent_light" : "text-accent_dark"
                  } select-none`}
                >
                  Ao12
                </p>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timer;
