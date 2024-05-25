import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Algorithms, Navbar, Solves, Statistics, Timer } from "./components";

export const Context = React.createContext();

const App = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Context.Provider value={[darkMode, setDarkMode]}>
      <div
        className={`min-h-screen flex flex-col pt-[60px] RubikFont ${
          !darkMode ? "bg-bg_light text-black" : "bg-bg_dark text-white"
        }`}
      >
        <Router>
          <section className="w-full fixed top-0 z-20">
            <Navbar />
          </section>
          <section>
            <Routes>
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/" element={<Timer />} />
              <Route path="/solves" element={<Solves />} />
              <Route path="/algorithms" element={<Algorithms />} />
            </Routes>
          </section>
        </Router>
      </div>
    </Context.Provider>
  );
};

export default App;
