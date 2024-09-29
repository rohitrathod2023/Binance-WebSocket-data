import React from "react";
import "./CoinToggle.css";
const CoinToggle = ({ selectedCoin, onCoinChange }) => {
  const coins = ["ETHUSDT", "BNBUSDT", "DOTUSDT"];

  return (
    <div className="coin-toggle">
      <select
        value={selectedCoin}
        onChange={(e) => onCoinChange(e.target.value)}
      >
        {coins.map((coin) => (
          <option key={coin} value={coin}>
            {coin}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinToggle;
