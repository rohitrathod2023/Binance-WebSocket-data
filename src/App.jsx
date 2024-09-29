import React, { useState } from "react";
import CoinToggle from "./components/CoinToggle";
import IntervalSelector from "./components/IntervalSelector";
import WebSocketManager from "./components/WebSocketManager";
import Chart from "./components/Chart";
import "./App.css";

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState("ETHUSDT");
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [chartData, setChartData] = useState([]);
  const [previousData, setPreviousData] = useState({});
  const [dailyInfo, setDailyInfo] = useState({
    open: 0,
    close: 0,
    high: 0,
    low: 0,
    volume: 0,
  });

  const handleWebSocketData = (data) => {
    const kline = data.k;
    const newPoint = {
      time: kline.t,
      open: kline.o,
      high: kline.h,
      low: kline.l,
      close: kline.c,
      volume: kline.v,
    };

    setChartData((prevData) => [...prevData, newPoint]);
    if (chartData.length === 0) {
      setDailyInfo({
        open: newPoint.open,
        close: newPoint.close,
        high: newPoint.high,
        low: newPoint.low,
        volume: newPoint.volume,
      });
    }
  };

  const handleCoinChange = (coin) => {
    setPreviousData((prev) => ({ ...prev, [selectedCoin]: chartData }));
    setSelectedCoin(coin);
    if (previousData[coin]) {
      setChartData(previousData[coin]);
    } else {
      setChartData([]);
    }
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div className="app">
      <h1>Binance Market Data</h1>
      <div className="selection-option">
        <CoinToggle
          selectedCoin={selectedCoin}
          onCoinChange={handleCoinChange}
        />
        <IntervalSelector
          selectedInterval={selectedInterval}
          onIntervalChange={handleIntervalChange}
        />
      </div>
      <WebSocketManager
        symbol={selectedCoin}
        interval={selectedInterval}
        onData={handleWebSocketData}
      />
      <Chart chartData={chartData} dailyInfo={dailyInfo} />
    </div>
  );
};

export default App;
