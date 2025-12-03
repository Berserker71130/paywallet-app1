import { useState, useMemo } from "react";
import { useAccounts } from "../context/AccountProvider";
import { useExchangeRates } from "../context/ExchangeRateProvider";
import { FaChevronDown } from "react-icons/fa";

const AccountSelector = () => {
  const { currentAccounts, selectedAccountId, setSelectedAccountId } =
    useAccounts();
  const { exchangeRates } = useExchangeRates();

  const [isOpen, setIsOpen] = useState(false);

  const selectedAccount = useMemo(() => {
    return currentAccounts.find((acc) => acc.id === selectedAccountId);
  }, [currentAccounts, selectedAccountId]);

  const getFlag = (id) => {
    if (id === "NGN") return "🇳🇬";
    if (id === "EUR") return "🇪🇺";
    if (id === "USD") return "🇺🇸";
    if (id === "GBP") return "🇬🇧";
    return "🌍";
  };

  const handleSelect = (account) => {
    setSelectedAccountId(account.id);
    setIsOpen(false);
  };

  // Helper function: Convert NGN → target currency
  const convertBalance = (ngnBalance, currency) => {
    if (!exchangeRates || !exchangeRates[currency])
      return ngnBalance.toFixed(2);
    return (ngnBalance * exchangeRates[currency]).toFixed(2);
  };

  if (!selectedAccount) return null;

  return (
    <div className="relative">
      <p
        className="text-sm text-gray-700 font-semibold flex items-center mb-1 cursor-pointer relative z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-2">{getFlag(selectedAccount.id)}</span>
        {selectedAccount.currency}
        <FaChevronDown
          className={`ml-2 text-xs text-gray-400 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>

      {isOpen && (
        <div className="absolute top-full -left-1/2 ml-1/4 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-30">
          {currentAccounts.map((account) => (
            <div
              key={account.id}
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-indigo-50 ${
                selectedAccount.id === account.id ? "bg-indigo-100" : ""
              }`}
              onClick={() => handleSelect(account)}
            >
              <div className="flex items-center">
                <span className="mr-2">{getFlag(account.id)}</span>
                <span className="font-medium">{account.currency}</span>
              </div>
              <span className="text-sm text-gray-500">
                {account.symbol}
                {convertBalance(account.balance, account.currency)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountSelector;
