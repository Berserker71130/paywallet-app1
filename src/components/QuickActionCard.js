import { FaRegMoneyBillAlt } from "react-icons/fa";

const QuickActionCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col items-start p-4 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Icon area */}
      <div className="mb-3 text-4xl text-blue-500">{icon}</div>

      {/* Text content */}
      <h2 className="text-sm font-semibold text-gray-800 mb-1">{title}</h2>
      <p className="text-xs text-gray-500 leading-tight">{description}</p>
    </div>
  );
};

export default QuickActionCard;
