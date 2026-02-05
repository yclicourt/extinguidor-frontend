"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { bebas } from "../ui/font";

// Registro de componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const ChartWrapper = () => {
  
  const labels = [
    "1",
    "12",
    "13",
    "15",
    "16",
    "18",
    "20",
    "22",
    "25",
    "28",
    "29",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Consulted Routes",
        data: [18, 28, 32, 35, 38, 45, 52, 58, 65, 75, 85],
        borderColor: "#3498db", // Azul del diseño
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        tension: 0.4, // Curva suave
        pointRadius: 4,
        pointBackgroundColor: "#3498db",
      },
      {
        label: "Completed Routes",
        data: [10, 15, 20, 25, 28, 35, 40, 48, 55, 68, 78],
        borderColor: "#2ecc71", // Verde del diseño
        backgroundColor: "rgba(46, 204, 113, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#2ecc71",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: "Route Statistics (February 2026)",
        align: "start",
        color: "white",
        font: { size: 16, weight: "bold", family: bebas.className },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
          color: "#f0f0f0",
        },
        ticks: { stepSize: 10 },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-slate-800 p-5 rounded-xl shadow-md h-87.5">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartWrapper;
