import { FaChevronRight } from "react-icons/fa6";
const RecommendedCard = ({ title, placeholderImage }) => {
  return (
    <div className="p-3 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg border border-gray-300 transition">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800 leading-none">
            {title}
          </span>
        </div>

        <span className="text-gray-400 text-lg ml-2">
          <FaChevronRight />
        </span>
      </div>

      <div className="mt-2 h-10 flex items-end justify-start">
        <span className="text-3xl opacity-70">{placeholderImage}</span>
      </div>
    </div>
  );
};

export default RecommendedCard;
