import { FaBell, FaChevronDown } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Topbar = ({ title }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const greetingName = "Manasseh";

  return (
    <div className="bg-white border-b border-gray-200 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Left side conditional greeting */}
          <div className="flex items-center h-full">
            {isHomePage && (
              <div className="flex flex-col justify-center">
                {/* Large greeting text */}
                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                  Hello {greetingName}
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 leading-tight mt-0.5">
                  Send, save and receive funds in various currencies
                </p>
              </div>
            )}

            {!isHomePage && title && (
              <h1 className="text-2xl font-bold text-gray-900 leading-none">
                {title}
              </h1>
            )}
          </div>

          {/* Right side: utility links */}
          <div className="flex items-center space-x-6 h-full">
            {/* See our rates link */}
            <a
              href="#"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hidden sm:block transition"
            >
              See our rates
            </a>

            {/* Language selector */}
            <div className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer  hover:text-gray-900 transition">
              <span className="hidden sm:block">English(US)</span>
              <FaChevronDown className="h-3 w-3 text-gray-400" />
            </div>

            {/* Currency selector */}
            <div className=" flex items-center space-x-4">
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition">
                NG
              </span>

              {/* Notification icon */}
              <div className="w-8 h-8 rounded-full  bg-gray-100  flex items-center justify-center text-gray-600  text-lg">
                <FaBell />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topbar;
