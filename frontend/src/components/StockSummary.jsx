import React, { useState, useEffect } from "react";
import axios from "axios";
import StockCard from "./StockCard";
import "./StockSummary.css";

function StockSummary({ ticker }) {
  const [data, setData] = useState([]);
  const [plotUrl, setPlotUrl] = useState("");

useEffect(() => {
  if (!ticker) return;

  const fetchEverything = async () => {
    try {
      // 1️⃣ Trigger backend to fetch and process stock data
      await axios.get(`http://localhost:5000/stocks/fetch/${ticker}`);

      // 2️⃣ Fetch processed stock data from MongoDB
      const response = await axios.get(`http://localhost:5000/stocks/data/${ticker}`);
      setData(response.data.reverse());

      // 3️⃣ Fetch generated plot image
      const plotResponse = await axios.get(`http://localhost:5000/stocks/plot/${ticker}`, {
        responseType: 'blob'
      });
      const imageUrl = URL.createObjectURL(plotResponse.data);
      setPlotUrl(imageUrl);
    } catch (error) {
      console.error("Error loading stock summary:", error);
    }
  };

  fetchEverything();
}, [ticker]);


  if (!ticker) return null;

  return (
    <div className="stock-summary">
      <h2>📊 Summary for {ticker}</h2>

      {data.length ? (
        <div className="cards-container">
          {data.slice(0, 10).map((item) => (
            <StockCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {plotUrl && (
        <div className="plot-section">
          <h3>📈 Stock Price Plot</h3>
          <img src={plotUrl} alt="Stock Plot" width="600" />
        </div>
      )}
    </div>
  );
}

export default StockSummary;
