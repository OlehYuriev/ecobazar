// src/hooks/useExchangeRate.js
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const useExchangeRate = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [errorRate, setErrorRate] = useState("");
  const [loadingRate, setLoadingRate] = useState(true);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD?apikey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const data = await response.json();
        setExchangeRate(data.rates.UAH);
        setLoadingRate(false);
        setErrorRate("");
      } catch (error) {
        console.log(error);
        setErrorRate("An error has occurred");
        setLoadingRate(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { exchangeRate, errorRate, loadingRate, currency };
};

export default useExchangeRate;
