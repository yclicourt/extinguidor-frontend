import { fetchChartRoutes } from "../helpers/api";
import ChartRoutes from "./ChartRoute";

interface Stats {
  day: string;
  total_consulted: number;
  total_completed: number;
}
const ChartRouteWrapper = async () => {
  const fetchRouteDataStats = await fetchChartRoutes();

  // 1. Obtener el número de días del mes actual
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 2. Crear un objeto base con todos los días en 0
  const fullStats: Record<string, { consulted: number; completed: number }> = {};
  for (let i = 1; i <= daysInMonth; i++) {
    fullStats[i.toString()] = { consulted: 0, completed: 0 };
  }

  // 3. "Rellenar" con los datos reales que vienen de la API
  fetchRouteDataStats.forEach((item: Stats) => {
    // Importante: item.day debe coincidir con el alias del SQL
    if (fullStats[item.day]) {
      fullStats[item.day].consulted = item.total_consulted || 0;
      fullStats[item.day].completed = item.total_completed || 0;
    }
  });

  // 4. Convertir a los arrays que necesita Chart.js
  const chartDataTransform = {
    labels: Object.keys(fullStats), // ['1', '2', '3', ..., '31']
    consulted: Object.values(fullStats).map(d => d.consulted),
    completed: Object.values(fullStats).map(d => d.completed),
  };

  return <ChartRoutes initialData={chartDataTransform} />;
};

export default ChartRouteWrapper