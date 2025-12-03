import React, { createContext, useState, useEffect, useContext } from "react";

export const ExchangeRateContext = createContext();

export const ExchangeRateProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [rateLoading, setRateLoading] = useState(true);
  const [rateError, setRateError] = useState(null);

  const BASE_CURRENCY = "NGN";

  const fetchExchangeRates = async () => {
    setRateLoading(true);
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/NGN");

      if (!response.ok) {
        throw new Error(`ExchangeRate API error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.rates) {
        throw new Error("Rates missing from API response.");
      }

      setExchangeRates(data.rates);
      setRateError(null);
    } catch (err) {
      console.error("Failed to fetch exchange rates:", err);
      setRateError("Failed to fetch live rates. Using fallback data.");

      setExchangeRates({
        NGN: 1,
        USD: 0.00067,
        EUR: 0.00062,
        GBP: 0.00054,
      });
    } finally {
      setRateLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  return (
    <ExchangeRateContext.Provider
      value={{ exchangeRates, rateLoading, rateError, BASE_CURRENCY }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRates = () => useContext(ExchangeRateContext);
