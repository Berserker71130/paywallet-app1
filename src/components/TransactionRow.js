import { IoIosArrowForward } from "react-icons/io";

const TransactionRow = ({ date, time, amount, type, description, status }) => {
  // CRITICAL FIX: Determine if the transaction is a deposit (money coming in)
  const isDeposit = type === "Deposit";

  // Dynamic color for the amount: Green for deposits, Red for everything else (Transfers/Sent)
  const amountColor = isDeposit
    ? "text-green-600 font-bold"
    : "text-red-600 font-bold";

  // Dynamic sign for the amount: Plus (+) for deposits, Minus (-) for transfers
  const amountSign = isDeposit ? "+" : "-";

  // Dynamic displayed type: Changes 'Transfer' (the data value) to 'Sent' (the display value)
  const displayType = type === "Transfer" ? "Sent" : type;

  // Dynamic color for the status badge
  const statusColor =
    status === "Completed"
      ? "text-green-600 bg-green-100"
      : "text-gray-600 bg-gray-100";

  // Define column width for the 5-column layout
  const COL_WIDTHS = {
    date: "w-[20%]",
    amount: "w-[15%]",
    type: "w-[15%]",
    description: "w-[35%]",
    status: "w-[15%]",
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150 cursor-pointer">
      {/* Date & time column 1 */}
      <div className={`${COL_WIDTHS.date} text-sm text-gray-700`}>
        <p className="font-medium">{date}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>

      {/* Amount column 2 */}
      <div className={`${COL_WIDTHS.amount} text-sm ${amountColor}`}>
        {amountSign}
        {amount}
      </div>

      {/* Type column 3 */}
      <div className={`${COL_WIDTHS.type} text-sm text-gray-700 capitalize`}>
        {displayType}
      </div>

      {/* Description column 4 */}
      <div className={`${COL_WIDTHS.description} text-sm text-gray-700`}>
        {description}
      </div>

      {/* Status & arrow column 5 */}
      <div
        className={`${COL_WIDTHS.status} flex items-center space-x-2 justify-end pr-4`}
      >
        <span
          className={`flex items-center px-2 py-0.5 text-xs font-semibold rounded-full ${statusColor}`}
        >
          <span
            className={`inline-block w-2 h-2 mr-1 rounded-full ${
              status === "Completed" ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
          {status}
        </span>
        <IoIosArrowForward className="text-gray-400 text-lg" />
      </div>
    </div>
  );
};
export default TransactionRow;
