import { useState, useEffect, useContext } from "react";
import { Scramble, Time } from "../../components";
import { Context } from "../../App";

const Timer = () => {
  const { navbar, setNavbar, darkMode, isMobile, isFast, setIsFast } =
    useContext(Context);

  const [toggleScramble, setToggleScramble] = useState<boolean>(() => {
    const storedToggleScramble = localStorage.getItem("toggleScramble");
    return storedToggleScramble !== null
      ? JSON.parse(storedToggleScramble)
      : true;
  });
  const [toggleColor, setToggleColor] = useState<boolean>(() => {
    const storedToggleColor = localStorage.getItem("toggleColor");
    return storedToggleColor !== null ? JSON.parse(storedToggleColor) : false;
  });
  const [nowFast, setNowFast] = useState<boolean>(() => {
    const storedNowFast = localStorage.getItem("nowFast");
    return storedNowFast !== null ? JSON.parse(storedNowFast) : false;
  });

  const [step, setStep] = useState<number>(0);

  const [time, setTime] = useState<number | null>(null);
  const [previousTime, setPreviousTime] = useState<number | null>(null);

  const [threshold, setThreshold] = useState<boolean>(false);
  const [thresholdInterval, setThresholdInterval] = useState<number | null>(
    null
  );
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const [scramble, setScramble] = useState<string>("");

  const [solves, setSolves] = useState<number[]>(
    JSON.parse(localStorage.getItem("solves") as string) || []
  );
  const [scrambles, setScrambles] = useState<string[]>(
    JSON.parse(localStorage.getItem("scrambles") as string) || []
  );

  const [averages, setAverages] = useState<{
    AO5: number | null;
    AO12: number | null;
    AO50: number | null;
    AO100: number | null;
  }>({
    AO5: JSON.parse(localStorage.getItem("AO5") as string) ?? null,
    AO12: JSON.parse(localStorage.getItem("AO12") as string) ?? null,
    AO50: JSON.parse(localStorage.getItem("AO50") as string) ?? null,
    AO100: JSON.parse(localStorage.getItem("AO100") as string) ?? null,
  });

  useEffect(() => {
    generateNewScramble();
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
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

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (step) {
      case 1:
        if (event.key === " ") {
          if (threshold) {
            setStep(2);
          } else {
            if (thresholdInterval) clearInterval(thresholdInterval);
            setStep(0);
          }
        }
        break;
      case 3:
        setStep(4);
        break;
    }
  };

  function process_touchstart(event: string) {
    if (event == "touchstart") {
      switch (step) {
        case 0:
          setStep(1);
          break;
        case 2:
          setStep(3);
          break;
      }
    }
  }

  function process_touchend(event: string) {
    if (event == "touchend") {
      switch (step) {
        case 1:
          if (threshold) {
            setStep(2);
          } else {
            if (thresholdInterval) clearInterval(thresholdInterval);
            setStep(0);
          }
          break;
        case 3:
          setStep(4);
          break;
      }
    }
  }

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
        setSolves((solves: number[]) => [...solves, time!]);
        setScrambles((scrambles: string[]) => [...scrambles, scramble]);
        generateNewScramble();
        break;
      case 4:
        setStep(5);
        break;
      case 5:
        setStep(0);
        break;
    }
    if (step == 2 && nowFast) {
      setIsFast(true);
    } else {
      setIsFast(false);
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
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const incrementTime = currentTime - startTime;
      if (incrementTime >= 250) {
        clearInterval(interval);
        setThreshold(true);
      }
    }, 1);
    setThresholdInterval(interval);
  };

  const startTimer = () => {
    let startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const incrementTime = currentTime - startTime;
      setTime((prevTime) => (prevTime || 0) + incrementTime);
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
      AO5: null,
      AO12: null,
      AO50: null,
      AO100: null,
    });

    const calculateAverage = (values: number[], count: number): number => {
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
      localStorage.setItem(
        "AO50",
        JSON.stringify(calculateAverage(solves, 50))
      );
    }
    if (solves.length > 99) {
      localStorage.setItem(
        "AO100",
        JSON.stringify(calculateAverage(solves, 100))
      );
    }
  }, [solves]);

  const selectedVideo = "/speed.mp4";

  useEffect(() => {
    localStorage.setItem("nowFast", JSON.stringify(nowFast));
  }, [nowFast]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <video
        autoPlay
        loop
        muted
        className={`${
          nowFast && isFast ? "absolute" : "hidden"
        } top-0 left-0 w-full h-full object-cover`}
        src={selectedVideo}
      />
      <section className="fixed">
        <div
          className={`${
            threshold || step === 2 ? "visible" : "hidden"
          } flex justify-center items-center`}
        >
          <p
            className={`${
              threshold ? "visible" : "hidden"
            } text-[#00FF00] text-[104px]`}
          >
            0.00
          </p>
          <p
            className={`${!threshold ? "visible" : "hidden"} text-[144px] ${
              isMobile && nowFast ? "text-[#FFFFFF]" : ""
            }`}
          >
            <Time value={time} />
          </p>
        </div>
        <div className={`${threshold || step === 2 ? "hidden" : "visible"}`}>
          <div
            className={`max-w-md flex flex-wrap justify-center items-center mx-auto px-16 gap-x-1 text-[22px] font-semibold ${
              !darkMode && !toggleColor ? "text-stroke" : ""
            } text-center`}
          >
            {scramble.split(" ").map((rotation, index) => {
              return (
                <span
                  key={index}
                  className={`${
                    toggleColor
                      ? ""
                      : rotation.charAt(0) === "L"
                      ? "text-[#FFA500]"
                      : rotation.charAt(0) === "R"
                      ? "text-[#F22E2E]"
                      : rotation.charAt(0) === "F"
                      ? "text-[#00FF00]"
                      : rotation.charAt(0) === "B"
                      ? "text-[#1583FF]"
                      : rotation.charAt(0) === "U"
                      ? "text-[#FFFFFF]"
                      : rotation.charAt(0) === "D"
                      ? "text-[#FFFF00]"
                      : ""
                  }`}
                >
                  {rotation}
                </span>
              );
            })}
          </div>

          <div className="flex justify-center">
            <div
              className={`${
                previousTime ? "visible" : "hidden"
              } absolute ml-[260px] text-[20px] font-semibold`}
            >
              {(() => {
                if (solves.length < 2) return null;
                const prevTime = previousTime || solves[solves.length - 1];
                const diff = prevTime - solves[solves.length - 2];
                if (diff > 0) {
                  return (
                    <div className="text-[#F22E2E]">
                      +<Time value={diff} />
                    </div>
                  );
                } else if (diff < 0) {
                  return (
                    <div className="text-[#00FF00]">
                      -<Time value={-diff} />
                    </div>
                  );
                } else {
                  return <div>0.00</div>;
                }
              })()}
            </div>
            <div
              className={`${
                threshold || step === 2 ? "hidden" : "visible"
              } text-[104px]`}
            >
              <p
                className={`${
                  step === 1 ? "visible" : "hidden"
                } text-[#F22E2E]`}
              >
                0.00
              </p>
              <div className={`${step === 1 ? "hidden" : "visible"}`}>
                <p className={`${previousTime ? "visible" : "hidden"}`}>
                  <Time
                    value={
                      previousTime === solves[solves.length]
                        ? previousTime
                        : solves[solves.length - 1]
                    }
                  />
                </p>
                <p className={`${previousTime ? "hidden" : "visible"}`}>0.00</p>
              </div>
            </div>
            <div className={`${threshold ? "visible" : "hidden"} text-[104px]`}>
              <p className={`${step === 2 ? "visible" : "hidden"}`}>
                <Time value={time} />
              </p>
              <p
                className={`${
                  step === 2 ? "hidden" : "visible"
                } text-[#00FF00]`}
              >
                0.00
              </p>
            </div>
          </div>
          <div
            className={`${
              toggleScramble ? "h-[150px]" : "h-[80px]"
            } flex flex-col justify-center items-center text-[18px]`}
          >
            <div>
              <div
                className={`${
                  toggleScramble ? "flex" : "hidden"
                } w-[360px] h-[150px] flex-row mb-[20px] p-2 border-[2px] border-dashed hover:border-solid border-[#80808016] hover:border-[#80808032] rounded-md`}
              >
                <div className="w-1/2 flex justify-center items-center">
                  <Scramble
                    scramble={scramble}
                    width="w-[40px]"
                    height="h-[40px]"
                  />
                </div>
                <div className="w-1/2 h-full grid grid-cols-2">
                  <span className="grid grid-rows-2">
                    <span className="grid items-center text-center">
                      <p className="text-[#808080] text-[16px] font-semibold select-none">
                        AO5
                      </p>
                      <p
                        className={`${
                          !averages.AO5 ? "text-[#808080]" : ""
                        } text-[20px]`}
                      >
                        {averages.AO5 ? <Time value={averages.AO5} /> : "-"}
                      </p>
                    </span>
                    <span className="grid items-center text-center">
                      <p className="text-[#808080] text-[16px] font-semibold select-none">
                        AO50
                      </p>
                      <p
                        className={`${
                          !averages.AO50 ? "text-[#808080]" : ""
                        } text-[20px] font-bold`}
                      >
                        {averages.AO50 ? <Time value={averages.AO50} /> : "-"}
                      </p>
                    </span>
                  </span>
                  <span className="grid grid-rows-2">
                    <span className="grid items-center text-center">
                      <p className="text-[#808080] text-[16px] font-semibold select-none">
                        AO12
                      </p>
                      <p
                        className={`${
                          !averages.AO12 ? "text-[#808080]" : ""
                        } text-[20px] font-bold`}
                      >
                        {averages.AO12 ? <Time value={averages.AO12} /> : "-"}
                      </p>
                    </span>
                    <span className="grid items-center text-center">
                      <p className="text-[#808080] text-[16px] font-semibold select-none">
                        MEAN
                      </p>
                      <p
                        className={`${
                          solves.length < 2 ? "text-[#808080]" : ""
                        } text-[18px] font-bold`}
                      >
                        {solves.length < 2 ? (
                          "-"
                        ) : (
                          <Time
                            value={Math.ceil(
                              solves.reduce((acc, curr) => acc + curr, 0) /
                                solves.length
                            )}
                          />
                        )}
                      </p>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`${
                !toggleScramble ? "flex" : "hidden"
              } w-[320px] h-[80px] flex flex-row justify-between items-center text-[#808080] font-semibold text-center border-[2px] border-dashed hover:border-solid border-[#80808016] hover:border-[#80808032] rounded-md`}
            >
              <span className="w-1/3">
                <p
                  className={`${
                    averages.AO5 && !darkMode
                      ? "text-[#000000]"
                      : averages.AO5 && darkMode
                      ? "text-[#FFFFFF]"
                      : ""
                  }`}
                >
                  {averages.AO5 ? <Time value={averages.AO5} /> : "-"}
                </p>
                <p className="select-none">AO5</p>
              </span>
              <span className="w-1/3">
                {(() => {
                  if (previousTime === null) {
                    if (solves[solves.length - 1] == null) {
                      return <p>-</p>;
                    } else {
                      return (
                        <p
                          className={`${
                            !darkMode ? "text-[#000000]" : "text-[#FFFFFF]"
                          }`}
                        >
                          {<Time value={solves[solves.length - 1]} />}
                        </p>
                      );
                    }
                  } else if (solves[solves.length - 2] != null) {
                    return (
                      <p
                        className={`${
                          !darkMode ? "text-[#000000]" : "text-[#FFFFFF]"
                        }`}
                      >
                        {<Time value={solves[solves.length - 2]} />}
                      </p>
                    );
                  } else {
                    return <p>-</p>;
                  }
                })()}
                <p className="select-none">PREVIOUS</p>
              </span>
              <span className="w-1/3">
                <p
                  className={`${
                    averages.AO12 && !darkMode
                      ? "text-[#000000]"
                      : averages.AO12 && darkMode
                      ? "text-[#FFFFFF]"
                      : ""
                  }`}
                >
                  {averages.AO12 ? <Time value={averages.AO12} /> : "-"}
                </p>
                <p className="select-none">AO12</p>
              </span>
            </div>
          </div>
        </div>
      </section>
      <span className={`${isFast ? "hidden" : ""} z-40`}>
        <svg
          onClick={() => setNavbar(!navbar)}
          className={`w-6 h-6 absolute ${
            navbar ? "top-[72px]" : "top-[24px]"
          } right-[24px] fill-[#808080] ${
            !darkMode ? "hover:fill-[#000000]" : "hover:fill-[#FFFFFF]"
          } cursor-pointer z-40`}
          viewBox="0 0 32 32"
        >
          {!navbar ? (
            <g transform="translate(-102.000000, -985.000000)">
              <path d="M129,1000 L120.028,1000 C119.749,1000 119.497,999.885 119.316,999.699 C119.123,999.535 119,999.296 119,999 L119,990 C119,989.447 119.448,989 120,989 C120.552,989 121,989.447 121,990 L120.969,996.575 L127.756,989.787 L129.17,991.201 L122.372,998 L129,998 C129.552,998 130,998.448 130,999 C130,999.553 129.552,1000 129,1000 L129,1000 Z M117,1012 C117,1012.55 116.552,1013 116,1013 C115.448,1013 115,1012.55 115,1012 L115.032,1005.43 L108.244,1012.21 L106.83,1010.8 L113.628,1004 L107,1004 C106.448,1004 106,1003.55 106,1003 C106,1002.45 106.448,1002 107,1002 L115.972,1002 C116.251,1002 116.502,1002.12 116.684,1002.3 C116.877,1002.46 117,1002.7 117,1003 L117,1012 L117,1012 Z M130,985 L106,985 C103.791,985 102,986.791 102,989 L102,1013 C102,1015.21 103.791,1017 106,1017 L130,1017 C132.209,1017 134,1015.21 134,1013 L134,989 C134,986.791 132.209,985 130,985 L130,985 Z"></path>
            </g>
          ) : (
            <g transform="translate(-570.000000, -933.000000)">
              <path d="M598,947 C598,947.553 597.553,948 597,948 C596.447,948 596,947.553 596,947 L596.031,940.426 L589.244,947.213 L587.83,945.799 L594.629,939 L588,939 C587.447,939 587,938.553 587,938 C587,937.447 587.447,937 588,937 L596.972,937 C597.251,937 597.503,937.115 597.685,937.301 C597.878,937.465 598,937.704 598,938 L598,947 L598,947 Z M584,961 L575.028,961 C574.749,961 574.497,960.885 574.315,960.699 C574.122,960.535 574,960.297 574,960 L574,951 C574,950.447 574.447,950 575,950 C575.553,950 576,950.447 576,951 L575.969,957.575 L582.756,950.787 L584.171,952.201 L577.371,959 L584,959 C584.553,959 585,959.447 585,960 C585,960.553 584.553,961 584,961 L584,961 Z M598,933 L574,933 C571.791,933 570,934.791 570,937 L570,961 C570,963.209 571.791,965 574,965 L598,965 C600.209,965 602,963.209 602,961 L602,937 C602,934.791 600.209,933 598,933 L598,933 Z"></path>
            </g>
          )}
        </svg>
        <svg
          onClick={() => {
            setToggleScramble(!toggleScramble);
            localStorage.setItem(
              "toggleScramble",
              JSON.stringify(!toggleScramble)
            );
          }}
          className={`w-6 h-6 fixed ${
            navbar ? "top-[120px]" : "top-[72px]"
          } right-[24px] ${
            !darkMode ? "hover:fill-[#000000]" : "hover:fill-[#FFFFFF]"
          } fill-[#808080] cursor-pointer`}
          viewBox="0 0 321.95 321.95"
        >
          <g transform="translate(0 -562.36)">
            <path d="M111.85,807.341h-97.6c-18.9,0-18.9,28,0,28h97.6C130.75,835.341,130.75,807.341,111.85,807.341z" />
            <path
              d="M210.05,688.441h64l-24.7,24.7c-13.6,13.1,6.3,33.6,19.4,19.9l49.3-48.8c5.2-5.8,5.2-14.2,0-19.9l-49.3-48.8
				c-2.7-2.6-5.8-4.2-10-4.2c-12.6,0-18.4,15.2-9.4,24.1l24.7,24.7h-64C191.15,660.141,191.15,688.441,210.05,688.441z"
            />
            <path
              d="M307.55,807.041h-90.2l-93.4-140.6c-2.6-3.7-7.3-6.3-12.1-6.3h-64l25.2-24.7c8.9-8.9,2.6-24.6-10.5-24.1v0
				c-3.7,0-6.8,1.6-9.4,4.2l-48.8,48.8c-5.8,5.8-5.8,14.2,0,19.9l48.8,48.8c13.1,13.6,33.6-6.8,19.9-19.9l-25.2-24.7h56.7
				l93.9,140.6c2.6,3.7,6.8,6.3,11.5,6.3h97.6C326.45,835.341,326.45,807.041,307.55,807.041z"
            />
          </g>
        </svg>
        <svg
          className={`w-6 h-6 fixed ${
            navbar ? "top-[168px]" : "top-[120px]"
          } right-[24px] cursor-pointer`}
          viewBox="0 0 16 16"
          onClick={() => {
            setToggleColor(!toggleColor);
            localStorage.setItem("toggleColor", JSON.stringify(!toggleColor));
          }}
        >
          <path
            d="M10.5 10.5c.002 2.762-2.237 5-5 5s-5.002-2.238-5-5c-.002-2.76 2.237-5 5-5s5.002 2.24 5 5z"
            fill={!toggleColor ? "#FF15A1" : "#80808016"}
            stroke={!toggleColor ? "" : "#373737"}
          />
          <path
            d="M8 1.401a4.998 4.998 0 0 0-2.488 9.334c-.004-.078-.012-.155-.012-.234a4.998 4.998 0 0 1 7.488-4.334A4.994 4.994 0 0 0 8 1.4z"
            fill={!toggleColor ? "#1583FF" : "#80808016"}
          />
          <path
            d="M10.5 5.5a4.998 4.998 0 0 0-5 5c0 .08.008.157.012.235A4.998 4.998 0 0 0 13 6.401c0-.079-.008-.156-.012-.234A4.975 4.975 0 0 0 10.5 5.5z"
            fill={!toggleColor ? "#00CF2D" : "#80808016"}
          />
          <path
            d="M12.988 6.167c.004.078.012.155.012.234a4.998 4.998 0 0 1-7.489 4.334 4.994 4.994 0 0 0 4.989 4.766 4.998 4.998 0 0 0 2.488-9.334z"
            fill={!toggleColor ? "#F8FF15" : "#80808016"}
          />
          <path
            d="M5.512 10.735a4.996 4.996 0 0 0 2.486 4.093 4.987 4.987 0 0 0 2.49-4.091A4.978 4.978 0 0 1 8 11.4a4.975 4.975 0 0 1-2.488-.666z"
            fill={!toggleColor ? "#EF0000" : "#80808016"}
          />
          <path
            d="M7.998 6.173A4.991 4.991 0 0 0 5.5 10.5c0 .079.008.156.012.234a4.978 4.978 0 0 0 4.977.002c.003-.079.011-.157.011-.236a4.99 4.99 0 0 0-2.502-4.328z"
            fill={!toggleColor ? "#383027" : "#80808016"}
          />
          <path
            d="M5.5 5.5c-.91 0-1.76.247-2.494.67a4.99 4.99 0 0 0 2.506 4.564c-.004-.077-.012-.154-.012-.233a4.991 4.991 0 0 1 2.498-4.328A4.975 4.975 0 0 0 5.5 5.5z"
            fill={!toggleColor ? "#5100CC" : "#80808016"}
          />
          <path
            d="M8 1.401a4.998 4.998 0 0 0-4.994 4.77 4.998 4.998 0 1 0 4.992 8.658 4.998 4.998 0 1 0 4.99-8.662A4.994 4.994 0 0 0 8 1.4z"
            fill="none"
            stroke={!toggleColor ? "" : "#373737"}
          />
        </svg>
        <span
          className={`w-6 h-6 fixed flex items-center justify-center ${
            navbar ? "top-[216px]" : "top-[168px]"
          } right-[24px] text-2xl leading-none cursor-pointer`}
          onClick={() => setNowFast(!nowFast)}
        >
          {nowFast ? "🚀" : "🐌"}
        </span>
      </span>
      <div
        onTouchStart={() => process_touchstart("touchstart")}
        onTouchEnd={() => process_touchend("touchend")}
        className={`${
          isMobile ? "flex" : "hidden"
        } w-screen h-screen fixed select-none cursor-pointer z-10`}
      />
    </div>
  );
};

export default Timer;
