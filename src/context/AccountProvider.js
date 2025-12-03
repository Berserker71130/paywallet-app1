import React, { createContext, useState, useContext, useEffect } from "react";
import { useExchangeRates } from "./ExchangeRateProvider"; // ⭐️ Imported Exchange Rates

export const AccountContext = createContext();

const initialTransactions = [];

export const AccountProvider = ({ children }) => {
  // ⭐️ 1. CONSUME EXCHANGE RATES HERE
  const { exchangeRates, rateLoading } = useExchangeRates();

  const [ALL_CURRENCIES, setAllCurrncies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/transactions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/accounts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAccounts(data);

      const defaultAcc = data.find((acc) => acc.isDefault);
      setSelectedAccountId(defaultAcc?.id ?? null);

      setError(null);
    } catch (err) {
      setError("Failed to fetch accounts.");
      console.error(err);
      setAccounts([]);
    } finally {
      // Set loading to false once BOTH accounts and rates are ready
      if (!rateLoading) {
        setLoading(false);
      }
    }
  };

  const fetchAllCurrencies = async () => {
    try {
      const response = await fetch("http://localhost:3000/all_currencies");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllCurrncies(data);
    } catch (err) {
      console.error("Failed to fetch all currencies:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchAllCurrencies();
    fetchTransactions();
  }, []);

  // Set overall loading status once both data sources are resolved
  useEffect(() => {
    if (!rateLoading && accounts.length > 0) {
      setLoading(false);
    }
  }, [rateLoading, accounts.length]);

  const addAccount = async (accountId) => {
    const accountDetails = ALL_CURRENCIES.find((acc) => acc.id === accountId);

    if (accountDetails && !accounts.some((acc) => acc.id === accountId)) {
      const newAccount = {
        ...accountDetails,
        balance: 0.0,
        isDefault: false,
      };
      try {
        await fetch("http://localhost:3000/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        await fetchAccounts();
      } catch (e) {
        console.error("Error adding account:", e);
        setError("Failed to add account via API");
      }
    }
  };

  const deleteAccount = async (accountId) => {
    try {
      await fetch(`http://localhost:3000/accounts/${accountId}`, {
        method: "DELETE",
      });

      await fetchAccounts();
    } catch (e) {
      console.error("Failed to delete account via API");
    }
  };

  // ⭐️ NEW FUNCTION: Handles increasing an account balance via Mock API
  const depositFunds = async (accountId, amount) => {
    const numericAmount = parseFloat(amount);
    const targetAccount = accounts.find((acc) => acc.id === accountId);

    if (!targetAccount || isNaN(numericAmount) || numericAmount <= 0) {
      console.error("Invalid account or deposit amount.");
      return false;
    }

    const newBalance = targetAccount.balance + numericAmount;

    try {
      // 1. PATCH request to update balance
      const patchResponse = await fetch(
        `http://localhost:3000/accounts/${accountId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: newBalance }),
        }
      );

      if (!patchResponse.ok) throw new Error("Deposit balance update failed.");

      // ⭐️ 2. RECORD THE DEPOSIT TRANSACTION
      const depositTransaction = {
        id: Date.now().toString() + "-DEP", // Unique ID for deposit
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        amount: numericAmount,
        type: "Deposit", // ⭐️ CRITICAL: Type for green color
        sourceAccountId: "External",
        destinationAccountId: accountId,
        description: `Deposit to ${accountId}`,
        status: "Completed",
      };

      await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depositTransaction),
      });

      // NOTE: We don't need to fetchAccounts/Transactions here because it's done by addTransaction,
      // but if you call depositFunds directly from a component, you'll need the fetches here.
      // Assuming you call depositFunds directly for simple deposits:
      await fetchAccounts();
      await fetchTransactions();

      return true;
    } catch (e) {
      console.error("Error depositing funds:", e);
      setError(`Failed to deposit funds to ${accountId}.`);
      return false;
    }
  };

  // ⭐️ MODIFIED FUNCTION: Handles transfer/deduction and deposit
  const addTransaction = async (newTransactionDetails) => {
    const { amount, sourceAccountId, destinationAccountId } =
      newTransactionDetails;
    const numericAmount = parseFloat(amount);
    const sourceAccount = accounts.find((acc) => acc.id === sourceAccountId);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Invalid transaction amount.");
      return false;
    }

    if (!sourceAccount || sourceAccount.balance < numericAmount) {
      setError("Insufficient funds for this transaction.");
      return false;
    }

    // --- 1. DEDUCT from Source Account ---
    const newSourceBalance = sourceAccount.balance - numericAmount;
    let transactionSuccessful = false;

    try {
      // PATCH request to deduct from source account
      const deductResponse = await fetch(
        `http://localhost:3000/accounts/${sourceAccountId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: newSourceBalance }),
        }
      );

      if (!deductResponse.ok) throw new Error("Deduction failed.");
      transactionSuccessful = true;
    } catch (e) {
      console.error("Error deducting funds:", e);
      setError(`Failed to deduct funds from ${sourceAccountId}.`);
      return false;
    }

    // --- 2. DEPOSIT to Destination Account (if deduction was successful) ---
    if (transactionSuccessful && destinationAccountId) {
      const depositSuccess = await depositFunds(
        destinationAccountId,
        numericAmount
      );
      if (!depositSuccess) {
        // NOTE: In a real banking app, a failure here would require rolling back the deduction.
        // For this mock environment, we just log the error.
        transactionSuccessful = false;
        setError(
          "Funds were deducted but deposit failed. Balance may be inconsistent."
        );
        return false;
      }
    }

    // --- 3. RECORD TRANSACTION (if fund movement was successful) ---
    if (transactionSuccessful) {
      const transactionToAdd = {
        ...newTransactionDetails,
        id: Date.now().toString() + "-TXN", // Unique ID for transfer
        // ⭐️ REMOVE isDebit. Set type explicitly to 'Transfer' for the row logic to work.
        type: "Transfer",
        date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        status: "Completed",
      };

      try {
        await fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(transactionToAdd),
        });
        setError(null);
        // Re-fetch all accounts and transactions to update UI after successful transfer
        await fetchAccounts();
        await fetchTransactions();
        return true; // ⭐️ Return TRUE on success
      } catch (e) {
        console.error("Error adding transaction record:", e);
        setError("Funds moved, but failed to record transaction.");
        return false;
      }
    }
    return false;
  };

  // ⭐️ TOTAL NET WORTH CALCULATION (Remains unchanged)
  const totalNetWorthNGN = accounts.reduce((total, account) => {
    const rate = exchangeRates[account.id];

    if (account.id === "NGN") {
      return total + account.balance;
    }

    if (!rate || rate === 0) {
      return total;
    }

    return total + account.balance / rate;
  }, 0);

  const availableAccounts = ALL_CURRENCIES.filter(
    (allCur) => !accounts.some((acc) => acc.id === allCur.id)
  ).map((acc) => ({
    id: acc.id,
    currency: `${acc.currency}(${acc.id})`,
  }));

  const contextValue = {
    addAccount,
    deleteAccount,
    // ⭐️ EXPORT NEW FUNCTION
    depositFunds,
    currentAccounts: accounts,
    availableAccounts,
    transactions,
    addTransaction,
    selectedAccountId,
    setSelectedAccountId,
    loading,
    error,
    exchangeRates,
    totalNetWorthNGN,
  };

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccounts = () => {
  return useContext(AccountContext);
};
