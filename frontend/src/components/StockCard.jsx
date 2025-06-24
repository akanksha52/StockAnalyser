import React from "react";
import "./StockCard.css";

function StockCard({ item }) {
  const isPositive = item.daily_return > 0;

  return (
    <div className={`stock-card ${isPositive ? 'positive' : 'negative'}`}>
      <div className="card-header">
        <h3>{item.date}</h3>
        <span className="price">${item.close_price.toFixed(2)}</span>
      </div>

      <div className="card-content">
        <p><strong>Open:</strong> ${item.open_price.toFixed(2)}</p>
        <p><strong>High:</strong> ${item.high.toFixed(2)}</p>
        <p><strong>Low:</strong> ${item.low.toFixed(2)}</p>
        <p><strong>Volume:</strong> {item.volume.toLocaleString()}</p>
        <p>
          <strong>Daily Return:</strong>{" "}
          <span className={isPositive ? "green-text" : "red-text"}>
            {item.daily_return !== null ? (item.daily_return * 100).toFixed(2) + "%" : "-"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default StockCard;
