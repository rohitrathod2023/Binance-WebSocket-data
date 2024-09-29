import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartData, dailyInfo }) => {
  const data = {
    labels: chartData.map((point) => new Date(point.time).toLocaleTimeString()),
    datasets: [
      {
        label: "Price",
        data: chartData.map((point) => point.close),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: chartData.map((point) =>
          new Date(point.time).toLocaleTimeString()
        ),
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="daily-info">
        <p>Opening Price: {dailyInfo.open}</p>
        <p>Closing Price: {dailyInfo.close}</p>
        <p>High Price: {dailyInfo.high}</p>
        <p>Low Price: {dailyInfo.low}</p>
        <p>Volume: {dailyInfo.volume}</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
