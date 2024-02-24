import { useContext } from "react";
import { Context } from "../App";

const Solves = () => {
  const [darkMode] = useContext(Context);

  return (
    <div
      className="w-screen fixed flex items-center justify-center"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <p
        className={`text-[64px] ${
          !darkMode ? "text-accent_light" : "text-accent_dark"
        }`}
      >
        IN PROGRESS
      </p>
    </div>
  );
};

export default Solves;
