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
        className={`w-screen h-[100dvh] ${
          !darkMode
            ? "bg-[#FFFFFF] text-[#000000]"
            : "bg-[#242526] text-[#FFFFFF]"
        }`}
      >
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
