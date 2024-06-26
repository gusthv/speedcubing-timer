import { useContext } from "react";
import { navLinks } from "../data";
import { Link, useLocation } from "react-router-dom";
import { sunIcon, moonIcon, bookIcon } from "../assets";
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
      <Link
        to="/algorithms"
        className="flex justify-center items-center mr-[12px]"
      >
        <img
          src={bookIcon}
          className="w-6 h-6 absolute left-0 ml-[24px] cursor-pointer select-none"
          alt="algorithms-icon"
        />
      </Link>
      <section className="w-full max-w-xl flex justify-between items-center mx-auto text-center font-bold">
        {navLinks.map((link) => (
          <Link
            key={link.url}
            to={link.url}
            className={`w-1/3 border-b-[4px] py-[14px] mt-[4px] transition-all select-none ${
              link.url === location
                ? !darkMode
                  ? "text-black border-accent_light hover:border-accent_light shadow-[rgba(107,_206,_242,_0.99)_0px_15px_15px_-20px]"
                  : "text-white border-accent_dark hover:border-accent_dark shadow-[rgba(107,_206,_242,_0.99)_0px_15px_15px_-20px]"
                : "border-transparent hover:border-[#6bcef254] hover:shadow-[rgba(107,_206,_242,_0.99)_0px_15px_15px_-20px]"
            }`}
          >
            {link.title}
          </Link>
        ))}
      </section>
      <img
        src={!darkMode ? sunIcon : moonIcon}
        onClick={() => setDarkMode(!darkMode)}
        className="w-6 h-6 absolute right-0 mr-[24px] cursor-pointer select-none"
        alt="theme-icon"
      />
    </nav>
  );
};

export default Navbar;
