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
import { roboto } from "../ui/font";

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

interface ChartRoutesProps {
  initialData: {
    labels: string[];
    consulted: number[];
    completed: number[];
  };
}

const ChartRoutes = ({ initialData }: ChartRoutesProps) => {

  const data = {
    labels: initialData.labels,
    datasets: [
      {
        label: "Rutas Consultadas",
        data: initialData.consulted,
        borderColor: "#3498db", // Azul del diseño
        backgroundColor: "rgba(52, 152, 219, 0.1)",
        tension: 0.4, // Curva suave
        pointRadius: 4,
        pointBackgroundColor: "#3498db",
      },
      {
        label: "Rutas Completadas",
        data: initialData.completed,
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
        text: "Estadísticas de las Rutas ",
        align: "start",
        color: "white",
        font: { size: 20, weight: "bold", family: roboto.className },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
          drawOnChartArea: false,
          color: "#f0f0f0",
        },
        ticks: {
          autoSkip: true,
          stepSize: 10,
          maxRotation: 0,
          font: { size: 10 },
        },
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

export default ChartRoutes;
