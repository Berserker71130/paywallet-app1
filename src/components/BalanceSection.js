import ActionButton from "./ActionButton";
import { FaExchangeAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { SiConvertio } from "react-icons/si";
import { RiSendPlaneFill } from "react-icons/ri";
import AccountSelector from "./AccountSelector";
import { useAccounts } from "../context/AccountProvider";
import { useExchangeRates } from "../context/ExchangeRateProvider";

const BalanceSection = () => {
  const { currentAccounts, selectedAccountId } = useAccounts();
  const { exchangeRates } = useExchangeRates();

  const currentAccount = currentAccounts.find(
    (acc) => acc.id === selectedAccountId
  );

  if (!currentAccount) {
    return (
      <div className="flex flex-col items-center justify-center pt-10 pb-4 text-gray-500 ">
        Loading Account...
      </div>
    );
  }

  const cardSuffix =
    currentAccount.id === "NGN"
      ? "8221"
      : currentAccount.id === "EUR"
      ? "3076"
      : "****";

  // Helper: Convert NGN → target currency using live API
  const convertedBalance = (balance, currency) => {
    if (!exchangeRates || !exchangeRates[currency]) return balance.toFixed(2);
    return (balance * exchangeRates[currency]).toFixed(2);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 pb-4">
      <div className="flex flex-col items-center mb-6 relative w-full">
        <div className="mb-1">
          <AccountSelector />
        </div>

        {/* Balance display */}
        <div className="flex items-center text-5xl font-extrabold text-gray-800 mt-2">
          {/* Optional: show both NGN and converted currency */}₦
          {currentAccount.balance.toFixed(2)} ({currentAccount.symbol}
          {convertedBalance(currentAccount.balance, currentAccount.id)})
          <span className="ml-2 text-xl text-indigo-500 cursor-pointer">
            <FaExchangeAlt />
          </span>
        </div>
      </div>

      <div className="flex items-center text-gray-600 text-sm mb-8 border border-gray-300 rounded-md shadow-md p-2">
        <span className="mr-2 text-blue-500 text-lg">
          <BsBank2 />
        </span>
        <span className="mr-2 font-bold">•••• {cardSuffix}</span>
        <span className="font-bold text-gray-500">
          <FaArrowRight />
        </span>
      </div>

      <div className="flex justify-around w-full max-w-xs px-4 border-b border-gray-100 pb-8">
        <ActionButton icon={<GiMoneyStack />} label="Add Money" />
        <ActionButton icon={<RiSendPlaneFill />} label="Send" />
        <ActionButton icon={<SiConvertio />} label="Convert" />
      </div>
    </div>
  );
};

export default BalanceSection;
