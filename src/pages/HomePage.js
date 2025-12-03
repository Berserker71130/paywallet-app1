import QuickActionCard from "../components/QuickActionCard";
import TransactionRow from "../components/TransactionRow";
import { IoSend, IoReceiptOutline } from "react-icons/io5";
import { FiCreditCard } from "react-icons/fi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useAccounts } from "../context/AccountProvider";

const HomePage = () => {
  const { transactions, loading, error } = useAccounts();

  const recentTransactions = [...transactions].reverse().slice(0, 7);
  if (loading) return <div className="p-8 text-center">Loading Home...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        Error Loading Data: {error}
      </div>
    );
  return (
    <div className="p-8 space-y-8 bg-gray-200 min-h-screen">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>

        {/* Grid container for cards */}
        <div className="grid grid-cols-4 gap-4 ">
          <QuickActionCard
            title="Send Money"
            description="Send money to 80+ countries instantly"
            icon={<IoSend className="text-blue-500" />}
          />

          <QuickActionCard
            title="Invoices"
            description="Create and send multiple-currency invoices"
            icon={<IoReceiptOutline className="text-purple-500" />}
          />

          <QuickActionCard
            title="Virtual Card"
            description="Shop, subscribe and pay bills securely online"
            icon={<FiCreditCard className="text-red-500" />}
          />

          <QuickActionCard
            title="Pay Bills"
            description="Pay for your internet , cable and other utility bills"
            icon={<FaRegMoneyBillAlt className="text-green-500" />}
          />
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Transactions
          </h2>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-800">
            See all
          </button>
        </div>

        {/* Transaction table */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex text-xs font-semibold text-gray-500 pb-3 border-b border-gray-200">
            <div className="w-[20%]">DATE</div>
            <div className="w-[15%]">AMOUNT</div>
            <div className="w-[15%]">TYPE</div>
            <div className="w-[35%]">DESCRIPTION</div>
            <div className="w-[15%] text-right pr-12">STATUS</div>
          </div>

          {/* Transaction rows - mapping the dummy data */}
          {recentTransactions.length > 0 ? (
            recentTransactions.map((tx) => (
              <TransactionRow
                key={tx.id}
                date={tx.date}
                time={tx.time}
                amount={tx.amount}
                type={tx.type}
                description={tx.description}
                status={tx.status}
              />
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recent transactions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
