import React, { useState } from "react";
import AccountList from "../components/AccountList";
import BalanceSection from "../components/BalanceSection";
import PromoBanner from "../components/PromoBanner";
import RecommendedCard from "../components/RecommendedCard";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import { IoReceiptOutline } from "react-icons/io5";
import { useAccounts } from "../context/AccountProvider";

const DashboardPage = () => {
  const { currentAccounts, addTransaction, error, loading } = useAccounts();

  const [amount, setAmount] = useState(100);
  const [sourceId, setSourceId] = useState(currentAccounts[0]?.id || "");
  const [destinationId, setDestinationId] = useState(
    currentAccounts[1]?.id || ""
  );
  const [description, setDescription] = useState("Test Transfer");

  const accountOptions = currentAccounts.map((acc) => ({
    id: acc.id,
    name: `${acc.name} (${acc.id}${acc.balance.toFixed(2)})`,
  }));

  const handleTransfer = async () => {
    if (!amount || amount <= 0 || sourceId === destinationId) {
      alert("Please enter a valid amount and select different accounts.");
      return;
    }

    const newTransaction = {
      amount,
      sourceAccountId: sourceId,
      destinationAccountId: destinationId,
      description,
      type: "Transfer",
    };

    const success = await addTransaction(newTransaction);

    if (success) {
      setAmount(0);
      setDescription("");
      console.log("Transfer successful.");
    } else {
      console.log("Transfer failed.");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading Dashboard...</div>;
  }

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      {/* ⭐ ONE MAIN CENTERED CONTAINER FOR PERFECT ALIGNMENT ⭐ */}
      <div className="max-w-[1048px] mx-auto space-y-8">
        <BalanceSection />

        <AccountList />

        {/* ⭐ TRANSFER BOX (Now perfectly aligned with AccountList) ⭐ */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-green-500 mr-2">
              <FaRegMoneyBillAlt />
            </span>
            Test Fund Transfer
          </h2>

          {error && (
            <div className="p-2 bg-red-100 text-red-700 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Source Account (Deduct from)
              </option>
              {accountOptions.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>

            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Destination Account (Deposit to)
              </option>
              {accountOptions.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />

            <button
              onClick={handleTransfer}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-150"
            >
              Execute Transfer
            </button>
          </div>
        </div>

        <PromoBanner />

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Recommended</h3>

          <div className="grid grid-cols-3 gap-3">
            <RecommendedCard
              title="Bills & Airtime"
              placeholderImage={
                <FaRegMoneyBillAlt className="text-green-500" />
              }
            />
            <RecommendedCard
              title="Gift Cards"
              placeholderImage={<FiGift className="text-red-500" />}
            />
            <RecommendedCard
              title="Invoices"
              placeholderImage={<IoReceiptOutline className="text-blue-500" />}
            />
          </div>
        </div>

        <div className="pb-16 text-center text-gray-300">
          Transaction Lists Will Go Here
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
