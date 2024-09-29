import React from "react";
import "./IntervalSelector.css";

const IntervalSelector = ({ selectedInterval, onIntervalChange }) => {
  const intervals = ["1m", "3m", "5m"];

  return (
    <div className="interval-buttons">
      {intervals.map((interval) => (
        <button
          key={interval}
          className={`interval-button ${
            selectedInterval === interval ? "active" : ""
          }`}
          onClick={() => onIntervalChange(interval)}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};

export default IntervalSelector;
