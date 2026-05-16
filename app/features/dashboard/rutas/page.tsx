import { MapPin, Camera, ChevronLeft, Settings } from "lucide-react";
import { bebas } from "@/app/ui/font";
import RouteMap from "@/app/components/rutas/RouteMap";
import { fetchAllWorkParts } from "@/app/helpers/api";
import RouteMapVisualizerWrapper from "@/app/components/rutas/RouteMapVisualizerWrapper";

const Rutas = async () => { 

  const dataParts = await fetchAllWorkParts()

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-50">
      {/* PANEL IZQUIERDO: Formulario y Listado (Desktop) / Vista Principal (Mobile) */}
      <section className="w-full lg:w-1/3 bg-slate-700 p-4 overflow-y-auto border-r border-slate-200">
        <h2
          className={`${bebas.className} text-xl font-bold mb-4 text-slate-100`}
        >
          Visualización de la Ruta
        </h2>
        {/* Lista de Partes Incluidos */}
        <div className="space-y-3">
          {/* Cards Completadas */}
          <RouteMap />
        </div>
      </section>

      {/* PANEL CENTRAL: Mapa (Oculto en mobile si se desea o integrado) */}
      <section className="hidden lg:flex flex-1 bg-slate-100 relative items-center justify-center h-full">
        <div className="absolute inset-0 w-full h-full z-10">
          {/* AQUÍ INYECTAMOS TU MAPA REAL DE LEAFLET */}
          <RouteMapVisualizerWrapper partes={dataParts}/>
        </div>
      </section>

      {/* VISTA MOBILE (Simulada como la del diseño) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 top-0 bg-slate-900 z-50 flex flex-col">
        <div className="p-4 flex justify-between text-white items-center">
          <ChevronLeft />
          <div className="text-center">
            <p className="text-[10px] opacity-60">Hoy</p>
            <p className="text-xs font-bold">Lunes, 2 de Feb, 2026</p>
          </div>
          <Settings size={18} />
        </div>

        <div className="px-4 pb-4">
          <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg">
            <MapPin size={18} /> CHECK-IN
          </button>
        </div>

        <div className="flex-1 bg-white rounded-t-4xl p-6 space-y-6 overflow-y-auto">
          {/* Contenido mobile: Lista de tareas y botón de evidencia */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800">Tareas</h4>
            <button className="w-full py-4 border-2 border-dashed border-blue-200 rounded-xl text-blue-500 flex items-center justify-center gap-2 text-sm font-medium">
              <Camera size={18} /> Subir Fotos/Videos
            </button>
            <div className="p-4 bg-slate-50 rounded-xl flex justify-between items-center">
              <span className="text-sm font-medium text-slate-600">
                Evidencia
              </span>
              <Camera className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rutas;
