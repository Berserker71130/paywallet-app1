import { ChevronRight } from "lucide-react";
import { useAccounts } from "../context/AccountProvider";
import TransactionRow from "../components/TransactionRow";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "text-green-600 bg-green-100";
    case "Pending":
      return "text-yellow-600 bg-yellow-100";
    case "Failed":
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const transactionRow = ({
  date,
  amount,
  type,
  description,
  status,
  currency,
}) => {
  const amountColor = type === "Deposit" ? "text-green-600" : "text-gray-800";
  const statusClasses = getStatusColor(status);

  let displayDate = date || "";
  let displayTime = "";

  if (date) {
    const parts = date.split(",");

    displayDate = parts[0] + (parts[1] ? parts[1] : "");

    if (parts.length > 2) {
      displayDate = parts[0] + parts[1];
      displayTime = parts[2].trim();
    } else if (parts.length > 1) {
      displayDate = parts[0];
      displayTime = parts[1].trim();
    }
  }

  return (
    <div className="flex items-center p-4 bg-white border-b border-gray-100 transition-all duration-200 hover:bg-gray-50 cursor-pointer">
      <div className="w-1/6 text-sm text-gray-600 font-medium">
        <div className="font-medium text-gray-700">{displayDate}</div>
        <div className="text-xs text-gray-500">{displayTime}</div>
      </div>

      <div className={`w-1/6 text-base fonst-semibold ${amountColor}`}>
        {currency}
        {amount}
      </div>

      <div className="w-1/6 text-sm text-gray-500">{type}</div>
      <div className="w-2/6 text-sm text-gray-800">{description}</div>
      <div className="w-1/6 flex items-center justify-end">
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusClasses}`}
        >
          {status}
        </span>
      </div>

      <div className="w-auto ml-4">
        <ChevronRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
};

// Main transaction page
const TransactionPage = () => {
  const { transactions, loading, error } = useAccounts();

  if (loading)
    return (
      <div className="p-8 text-center text-lg">Loading Transactions...</div>
    );

  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        Error loading transactions: {error}
      </div>
    );
  return (
    <div className="p-8">
      <h2 className="text-3-xl font-bold text-gray-900 mb-8">
        Balance Transactions
      </h2>

      <div className="flex justify-between items-center mb-6 p-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-600">
        <div className="flex space-x-4">
          <span className="font-medium px-2 py-1 border rounded cursor-pointer">
            Filter by: All Transactions
          </span>
          <span className="font-medium px-2 py-1 border rounded cursor-pointer ">
            All Currencies
          </span>
        </div>

        <div className="font-medium px-2 py-1 border rounded cursor-pointer">
          Sort date: DD/MM/YY - DD/MM/YY
        </div>
      </div>

      <div className="flex items-center p-4 text-sm font-semibold text-gray-500 border-b border-gray-200bg-gray-50 rounded-lg-t-lg">
        <div className="w-1/6">DATE</div>
        <div className="w-1/6">AMOUNT</div>
        <div className="w-1/6">TYPE</div>
        <div className="w-2/6">DESCRIPTION</div>
        <div className="w-1/6 text-right pr-12">STATUS</div>
        <div className="w-auto ml-4"></div>
      </div>

      <div className="bg-white rounded-b-xl shadow-lg overflow-hidden border-t-0">
        {transactions.map((tx, index) => (
          <TransactionRow
            key={index}
            date={tx.date}
            amount={tx.amount}
            currency={tx.currency}
            type={tx.type}
            description={tx.description}
            status={tx.status}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionPage;
