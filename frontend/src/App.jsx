import React, { useState } from "react";
import StockForm from './components/StockForm';
import StockSummary from "./components/StockSummary";
import "./App.css";

function App() {
  const [ticker, setTicker] = useState("");

  const handleFetchComplete = (fetchedTicker) => {
    setTicker(fetchedTicker);
  };

  return (
    <div className="App">
      <h1>📊 Stock Market Dashboard</h1>
      <StockForm onFetchComplete={handleFetchComplete} />
      <StockSummary ticker={ticker} />
    </div>
  );
}

export default App;
