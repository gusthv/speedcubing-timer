import { useContext } from "react";
import { navLinks } from "../data";
import { Link, useLocation } from "react-router-dom";
import { sunIcon, moonIcon } from "../assets";
import { Context } from "../App";

const Navbar = () => {
  const location = useLocation().pathname;
  const [darkMode, setDarkMode] = useContext(Context);

  return (
    <nav
      className={`w-full h-[60px] flex items-center px-16 ${
        !darkMode ? "bg-navbar_light" : "bg-navbar_dark"
      }`}
    >
      <section className="w-full max-w-xl flex justify-between items-center mx-auto text-center font-bold">
        {navLinks.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={`w-1/3 border-b-[4px] py-[14px] mt-[4px] ${
              link.url === location
                ? !darkMode
                  ? "text-black border-accent_light hover:border-accent_light"
                  : "text-white border-accent_dark hover:border-accent_dark"
                : "border-transparent hover:border-[#bbbbbb]"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </section>
      <img
        src={!darkMode ? sunIcon : moonIcon}
        onClick={() => setDarkMode(!darkMode)}
        className="w-6 h-6 absolute right-0 mr-[24px] cursor-pointer"
        alt="theme-icon"
      />
    </nav>
  );
};

export default Navbar;
