import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { navlinks } from "../data";
import { Context } from "../App";

type navlink = {
  title: string;
  url: string;
};

const Navbar = () => {
  const location = useLocation().pathname;
  const { darkMode, setDarkMode } = useContext(Context);

  return (
    <nav className="w-full h-full flex items-center font-bold select-none">
      <Link to="/algorithms" className="flex justify-center items-center">
        <svg
          className={`w-6 h-6 absolute left-0 ml-[24px] cursor-pointer ${
            location == "/algorithms"
              ? !darkMode
                ? "fill-[#000000]"
                : "fill-[#FFFFFF]"
              : `${
                  darkMode ? "hover:fill-[#FFFFFF]" : "hover:fill-[#000000]"
                } fill-[#808080]`
          }`}
        >
          <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM11.5 17.25C11.5 17.61 11.14 17.85 10.81 17.71C9.6 17.19 8.02 16.71 6.92 16.57L6.73 16.55C6.12 16.47 5.62 15.9 5.62 15.28V7.58C5.62 6.81 6.24 6.24 7 6.3C8.25 6.4 10.1 7 11.26 7.66C11.42 7.75 11.5 7.92 11.5 8.09V17.25ZM18.38 15.27C18.38 15.89 17.88 16.46 17.27 16.54L17.06 16.56C15.97 16.71 14.4 17.18 13.19 17.69C12.86 17.83 12.5 17.59 12.5 17.23V8.08C12.5 7.9 12.59 7.73 12.75 7.64C13.91 6.99 15.72 6.41 16.95 6.3H16.99C17.76 6.3 18.38 6.92 18.38 7.69V15.27Z" />
        </svg>
      </Link>
      <div className="w-full max-w-xl flex justify-between mx-auto text-center">
        {navlinks.map((link: navlink) => (
          <Link
            key={link.url}
            to={link.url}
            className={`w-1/3 mt-[2px] py-[16px] border-b-[2px] ${
              link.url === location
                ? !darkMode
                  ? "border-[#000000]"
                  : "border-[#FFFFFF]"
                : `${
                    !darkMode ? "hover:text-[#000000]" : "hover:text-[#FFFFFF]"
                  } text-[#808080] border-[#80808016]`
            }`}
          >
            {link.title}
          </Link>
        ))}
      </div>
      {!darkMode ? (
        <svg
          onClick={() => setDarkMode(!darkMode)}
          className={`w-6 h-6 absolute right-0 mr-[24px] ${
            !darkMode ? "hover:fill-[#000000]" : "hover:fill-[#FFFFFF]"
          } fill-[#808080] cursor-pointer`}
          viewBox="0 0 24 24"
        >
          <path d="M8.23129 2.24048C9.24338 1.78695 10.1202 2.81145 9.80357 3.70098C8.72924 6.71928 9.38932 10.1474 11.6193 12.3765C13.8606 14.617 17.3114 15.2755 20.3395 14.1819C21.2206 13.8637 22.2173 14.7319 21.7817 15.7199C21.7688 15.7491 21.7558 15.7782 21.7427 15.8074C20.9674 17.5266 19.7272 19.1434 18.1227 20.2274C16.4125 21.3828 14.3957 22.0001 12.3316 22.0001H12.3306C9.93035 21.9975 7.6057 21.1603 5.75517 19.6321C3.90463 18.1039 2.64345 15.9797 2.18793 13.6237C1.73241 11.2677 2.11094 8.82672 3.2586 6.71917C4.34658 4.72121 6.17608 3.16858 8.20153 2.25386L8.23129 2.24048Z" />
        </svg>
      ) : (
        <svg
          onClick={() => setDarkMode(!darkMode)}
          className={`w-6 h-6 absolute right-0 mr-[24px] ${
            !darkMode ? "hover:fill-[#000000]" : "hover:fill-[#FFFFFF]"
          } fill-[#808080] cursor-pointer`}
          viewBox="0 0 36 36"
        >
          <path d="M16 2s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2V2zm18 14s2 0 2 2s-2 2-2 2h-2s-2 0-2-2s2-2 2-2h2zM4 16s2 0 2 2s-2 2-2 2H2s-2 0-2-2s2-2 2-2h2zm5.121-8.707s1.414 1.414 0 2.828s-2.828 0-2.828 0L4.878 8.708s-1.414-1.414 0-2.829c1.415-1.414 2.829 0 2.829 0l1.414 1.414zm21 21s1.414 1.414 0 2.828s-2.828 0-2.828 0l-1.414-1.414s-1.414-1.414 0-2.828s2.828 0 2.828 0l1.414 1.414zm-.413-18.172s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zm-21 21s-1.414 1.414-2.828 0s0-2.828 0-2.828l1.414-1.414s1.414-1.414 2.828 0s0 2.828 0 2.828l-1.414 1.414zM16 32s0-2 2-2s2 2 2 2v2s0 2-2 2s-2-2-2-2v-2z"></path>
          <circle cx="18" cy="18" r="10"></circle>
        </svg>
      )}
    </nav>
  );
};

export default Navbar;
