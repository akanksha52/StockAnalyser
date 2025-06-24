import React, { useState } from "react";
import axios from "axios";

function StockForm({ onFetchComplete }) {
  const [ticker, setTicker] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) return alert("Please enter a stock ticker!");

    try {
      // Fetch stock data from your backend
      await axios.get(`http://localhost:5000/stocks/fetch/${ticker}`);
      onFetchComplete(ticker);
    } catch (error) {
      console.error("Error fetching stock data:", error);
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter Stock Ticker (e.g. AAPL)"
      />
      <button type="submit">Fetch Stock Data</button>
    </form>
  );
}

export default StockForm;
