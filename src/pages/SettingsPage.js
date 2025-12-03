import { useAccounts } from "../context/AccountProvider";
import { Settings } from "lucide-react";
import { AccountCard, LogOutItem } from "../components/AccountCards";
import { useState } from "react";

const SettingsPage = () => {
  const {
    currentAccounts,
    availableAccounts,
    addAccount,
    deleteAccount,
    loading,
    error,
  } = useAccounts();

  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    window.location.href = "/login";
  };

  const handleAddNewAccount = () => {
    if (selectedCurrencyId) {
      addAccount(selectedCurrencyId);
      setSelectedCurrencyId("");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-lg text-gray-500">
        Loading account settings
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-lg text-red-500">
        Error loading settings:{error}, Check JSON server status.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
        <Settings size={28} className="text-indigo-500" />
        <span>Account Settings</span>
      </h2>

      {/* Section 1 Current accounts */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold  text-gray-700 mb-4">
          Your Current Accounts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          {currentAccounts.map((account) => (
            <AccountCard
              key={account.id}
              currency={`${account.currency}(${account.id})`}
              balance={`${account.symbol}${account.balance.toFixed(2)}`}
              status={account.isDefault ? "Default" : "Active"}
              onClick={() => console.log(`Viewing ${account.currency}`)}
              onDelete={() => deleteAccount(account.id)}
            />
          ))}
        </div>
      </section>

      {/* Section 2 Add new accounts */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Accounts
        </h3>

        <div className="space-y-3 bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100">
          {availableAccounts && availableAccounts.length > 0 ? (
            <div className="flex space-x-4 items-center">
              <select
                value={selectedCurrencyId}
                onChange={(e) => setSelectedCurrencyId(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select a currency
                </option>
                {availableAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.currency}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddNewAccount}
                disabled={!selectedCurrencyId}
                className={`px-4 py-2 text-white font-semibold rounded-lg shadow transition duration-150 ${
                  selectedCurrencyId
                    ? "bg-indigo-600 hover:bg-indigo-700 "
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add Account
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              You currently own all available currencies.
            </p>
          )}
        </div>
      </section>

      {/* Log out section */}
      <section>
        <button
          onClick={handleLogout}
          className="w-full text-left p-0 border-none bg-transparent  hover:bg-transparent"
        >
          <LogOutItem />
        </button>
      </section>
    </div>
  );
};

export default SettingsPage;
