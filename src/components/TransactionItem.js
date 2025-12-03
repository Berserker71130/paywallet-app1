import { FiChevronRight } from "react-icons/fi";

const TransactionItem = ({ transaction, symbol }) => {
  const { type, description, amount, date, icon } = transaction;
  const isSent = type === "sent";
  const amountClass = isSent ? "text-red-500" : "text-green-500";
  const amountSign = isSent ? "-" : "+";
  const iconBg = isSent ? "bg-red-50" : "bg-green-50";
  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 hover:bg-gray-50 cursor-pointer transition">
      <div className="flex items-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mr-3 ${iconBg}`}
        >
          {icon}
        </div>

        <div>
          <p className="font-semibold text-gray-800">{description}</p>
          <p className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className={`font-semibold text-sm mr-2 ${amountClass}`}>
          {amountSign}
          {symbol}
          {typeof amount === "number" ? amount.toFixed(2) : "0.00"}
        </p>
        <FiChevronRight className="text-gray-400 text-lg" />
      </div>
    </div>
  );
};

export default TransactionItem;
