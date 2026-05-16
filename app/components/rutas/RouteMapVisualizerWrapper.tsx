"use client"
import { ParteTrabajo } from "@/app/helpers/interfaces/parte-trabajo.interface";
import dynamic from "next/dynamic";

const RouteMapVisualizer = dynamic(() => import("@/app/components/rutas/RouteMapVisualizer"), {
  ssr: false, 
  loading: () => (
    <div className="h-[400px] w-full bg-slate-800 animate-pulse rounded-xl flex items-center justify-center text-white">
      Cargando mapa operativo...
    </div>
  ),
});

interface PropsRutasPartesTrabajo {
  partes: ParteTrabajo[];
}
const RouteMapVisualizerWrapper = ({partes}:PropsRutasPartesTrabajo) => {
  return (
    <RouteMapVisualizer partes={partes} />
  )
}

export default RouteMapVisualizerWrapper