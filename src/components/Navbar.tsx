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
  const { darkMode, setDarkMode, isMobile } = useContext(Context);

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <span className="w-full flex justify-center items-center">
            <svg className="w-6 h-6" viewBox="0 0 283.831 283.831">
              <path
                d="M171.484,134.682h-47c-5.247,0-9.5,4.253-9.5,9.5v130c0,5.247,4.253,9.5,9.5,9.5h47c5.247,0,9.5-4.253,9.5-9.5v-130
	C180.984,138.935,176.73,134.682,171.484,134.682z"
              />
              <path
                d="M271.822,69.682h-47c-5.247,0-9.5,4.253-9.5,9.5v195c0,5.247,4.253,9.5,9.5,9.5h47c5.246,0,9.5-4.253,9.5-9.5v-195
	C281.322,73.935,277.069,69.682,271.822,69.682z"
              />
              <path
                d="M71.145,176.831h-47c-5.247,0-9.5,4.253-9.5,9.5v88c0,5.247,4.254,9.5,9.5,9.5h47c5.247,0,9.5-4.253,9.5-9.5v-88
	C80.645,181.085,76.392,176.831,71.145,176.831z"
              />
              <path
                d="M193.391,18.189L158.163,1.456c-7.486-3.558-16.431-0.369-19.984,7.113c-3.555,7.482-0.37,16.431,7.113,19.984l2.864,1.361
	L12.483,78.206C4.678,80.984,0.604,89.563,3.381,97.368c2.186,6.142,7.965,9.974,14.132,9.974c1.67,0,3.367-0.28,5.03-0.872
	l135.162-48.11l-1.031,2.17c-3.555,7.483-0.37,16.431,7.113,19.984c2.078,0.987,4.269,1.455,6.425,1.455
	c5.611-0.001,10.993-3.163,13.56-8.568l16.732-35.228C204.059,30.691,200.874,21.743,193.391,18.189z"
              />
            </svg>
          </span>
        );
      case 1:
        return (
          <span className="w-full flex justify-center items-center">
            <svg className="w-6 h-6" viewBox="0 0 256 256">
              <path d="M96,8a8.00008,8.00008,0,0,1,8-8h48a8,8,0,0,1,0,16H104A8.00008,8.00008,0,0,1,96,8ZM224,128a96,96,0,1,1-96-96A96.10874,96.10874,0,0,1,224,128ZM173.25488,82.74512a8.0006,8.0006,0,0,0-11.314,0l-39.59815,39.59814a8.00018,8.00018,0,0,0,11.31446,11.31348l39.59765-39.59815A8,8,0,0,0,173.25488,82.74512Z" />
            </svg>
          </span>
        );
      case 2:
        return (
          <span className="w-full flex justify-center items-center">
            <svg className="w-6 h-6" viewBox="0 0 36 36">
              <path d="M17.91,18.28c8.08,0,14.66-1.74,15.09-3.94V8.59c-.43,2.2-7,3.94-15.09,3.94A39.4,39.4,0,0,1,6.25,11V9a39.4,39.4,0,0,0,11.66,1.51C26,10.53,32.52,8.79,33,6.61h0C32.8,3.2,23.52,2.28,18,2.28S3,3.21,3,6.71V29.29c0,3.49,9.43,4.43,15,4.43s15-.93,15-4.43V24.09C32.57,26.28,26,28,17.91,28A39.4,39.4,0,0,1,6.25,26.52v-2A39.4,39.4,0,0,0,17.91,26C26,26,32.57,24.28,33,22.09V16.34c-.43,2.2-7,3.94-15.09,3.94A39.4,39.4,0,0,1,6.25,18.77v-2A39.4,39.4,0,0,0,17.91,18.28Z"></path>
              <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="w-full h-full flex items-center font-bold overflow-hidden select-none z-40">
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
      <div
        className={`w-full max-w-xl flex ${
          !isMobile ? "justify-between px-20" : "justify-center"
        } mx-auto text-center`}
      >
        {navlinks.map((link: navlink, index) => (
          <Link
            key={link.url}
            to={link.url}
            className={`${
              !isMobile ? "w-1/3" : "w-1/6"
            } mt-[2px] py-[16px] border-b-[2px] ${
              link.url === location
                ? !darkMode
                  ? "fill-[#000000] border-[#000000]"
                  : "fill-[#FFFFFF] border-[#FFFFFF]"
                : `${
                    !darkMode
                      ? "hover:text-[#000000] hover:fill-[#000000]"
                      : "hover:text-[#FFFFFF] hover:fill-[#FFFFFF]"
                  } text-[#808080] fill-[#808080] border-dashed hover:border-solid border-[#80808016] hover:border-[#80808032]`
            }`}
          >
            {!isMobile ? link.title : renderIcon(index)}
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
