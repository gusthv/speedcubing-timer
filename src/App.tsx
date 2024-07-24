import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createContext,
} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Algorithms, Statistics, Timer, Navbar, Solves } from "./components";

type ContextType = {
  navbar: boolean;
  setNavbar: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<ContextType>({
  navbar: true,
  setNavbar: () => {},
  darkMode: false,
  setDarkMode: () => {},
  isMobile: false,
  setIsMobile: () => {},
});

const App: FC = () => {
  const [navbar, setNavbar] = useState(
    localStorage.getItem("navbar") !== null
      ? JSON.parse(localStorage.getItem("navbar")!)
      : true
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") !== null
      ? JSON.parse(localStorage.getItem("darkMode")!)
      : true
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (navigator.userAgent.includes("Android" || "iPhone" || "iPad")) {
      setIsMobile(true);
    }
  });

  useEffect(() => {
    localStorage.setItem("navbar", JSON.stringify(navbar));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, navbar]);

  return (
    <Context.Provider
      value={{
        darkMode,
        setDarkMode,
        navbar,
        setNavbar,
        isMobile,
        setIsMobile,
      }}
    >
      <div
        className={`w-screen min-h-screen ${
          !darkMode
            ? "bg-[#FFFFFF] text-[#000000]"
            : "bg-[#242526] text-[#FFFFFF]"
        }`}
      >
        <svg
          onClick={() => setNavbar(!navbar)}
          className={`w-6 h-6 absolute ${
            navbar ? "top-[84px]" : "top-[24px]"
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
        <Router>
          <div className={`${navbar ? "flex" : "hidden"} h-[60px]`}>
            <Navbar />
          </div>
          <div
            className="z-20"
            style={
              navbar
                ? { height: "calc(100vh - 60px)" }
                : { height: "calc(100vh)" }
            }
          >
            <Routes>
              <Route path="/algorithms" element={<Algorithms />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/" element={<Timer />} />
              <Route path="/solves" element={<Solves />} />
            </Routes>
          </div>
        </Router>
      </div>
    </Context.Provider>
  );
};

export default App;
