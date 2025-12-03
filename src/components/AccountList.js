import React from "react";
import { useAccounts } from "../context/AccountProvider";

const AccountList = () => {
  const { currentAccounts, loading, error, } = useAccounts();

  if (loading) {
    return (
      <div className="p-8 text-xl text-gray-500 text-center">
        Loading account data...
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-3">Bank Accounts</h3>

      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded mb-4">{error}</div>
      )}

      {currentAccounts.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
          {currentAccounts.map((account) => (
            <div
              key={account.id}
              className="flex-shrink-0 w-64 p-5 bg-white text-gray-800 rounded-xl shadow-md border"
              style={{ minWidth: "250px" }}
            >
              <p className="text-sm opacity-80">{account.name}</p>

              <h3 className="text-2xl font-bold mt-1">
                {account.currency} {account.balance.toFixed(2)}
              </h3>

              <p className="text-xs opacity-70 mt-4">
                Account ID: {account.id}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic p-4">
          No accounts found in the database.
        </p>
      )}
    </div>
  );
};

export default AccountList;
