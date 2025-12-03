import { FaArrowRight } from "react-icons/fa6";

const PromoBanner = () => {
  return (
    <div className="mx-4 p-4 rounded-xl shadow-lg bg-gradient-to-r from-indigo-400 to-indigo-900 text-white relative overflow-hidden">
      <span className="absolute top-2 right-2 text-xl cursor-pointer">X</span>

      <div className="flex justify-between items-end">
        {/* left side */}
        <div className="w-1/2 pr-2">
          <h2 className="text-lg font-bold leading-tight mb-2">
            Collect stamp from every country you send money to
          </h2>
          <button className="flex items-center text-sm font-semibold mt-3 p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
            View your stamps
            <span className="ml-3">
              <FaArrowRight />
            </span>
          </button>
        </div>

        {/* right side */}
        <div className="w-1/2 relative h-24 flex items-end justify-end">
          <div className="absolute right-0 right-16 w-16 h-12 bg-white rounded-md shadow-md transform rotate-6 z-0">
            <p className="text-xs text-black font-semibold p-1 leading-none">
              UNITED KINGDOM
            </p>
          </div>

          <div className="absolute top-4 right-4 w-16 h-12 bg-white rounded-md shadow-md transform -rotate-3 z-[2]">
            <p className="text-xs text-black font-semibold p-1 leading-none">
              GERMANY
            </p>
          </div>

          <div className="absolute bottom-0 right-10 w-16 h-12 bg-white rounded-md shadow-md transform rotate-3 z-[2]">
            <p className="text-xs text-black font-semibold p-1 leading-none">
              MEXICO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
