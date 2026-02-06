import React from "react";
import { Search, Calendar as CalendarIcon, Filter } from "lucide-react"; 
import Image from "next/image";

const ParteTrabajo = () => {
  // Datos ficticios para las rutas laterales
  const dailyRoutes = [
    {
      id: 1,
      title: "Revisión Anual Edificio Norte",
      type: "Ruta Diaria",
      status: "completed",
    },
    {
      id: 2,
      title: "Ruta 345: Carga de Extintores",
      type: "Pendiente",
      status: "pending",
    },
    {
      id: 3,
      title: "Ruta 346: Extintores Edificio B",
      type: "Pendiente",
      status: "warning",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {/* Header Superior */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Lunes, 2 de Febrero, 2026
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
            <CalendarIcon size={18} /> Crear Parte Periódico
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
            Subir Documentos/Fotos
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Sección del Calendario (Izquierda) */}
        <div className="flex-3 bg-slate-700 rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {/* Barra de búsqueda y filtros internos */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="relative w-64">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-full text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <Filter size={16} /> Filtros
            </div>
          </div>

          {/* Grilla del Calendario */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="text-center font-bold text-lg mb-4 text-gray-700">
              FEBRERO 2026
            </div>
            <div className="grid grid-cols-7 border-t border-l border-gray-200">
              {/* Días de la semana o números - Render dinámico */}
              {Array.from({ length: 31 }).map((_, i) => (
                <div
                  key={i}
                  className="border-r border-b border-gray-200 h-24 p-2 relative hover:bg-gray-300 transition-colors"
                >
                  <span className="text-sm text-gray-200">{i + 1}</span>
                  {/* Ejemplo de punto indicador (Azul en tu diseño) */}
                  {(i === 11 || i === 12 || i === 23) && (
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 flex justify-center">
            <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-medium text-sm">
              Sumar Ruta
            </button>
          </div>
        </div>

        {/* Barra Lateral de Rutas (Derecha) */}
        <aside className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-slate-700 p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-200 text-sm mb-4 flex justify-between">
              Rutas del día{" "}
              <span className="text-gray-400 font-normal">(21 Pedidos)</span>
            </h3>

            <div className="space-y-3">
              {dailyRoutes.map((ruta) => (
                <div
                  key={ruta.id}
                  className="p-3 border border-gray-100 rounded-lg flex gap-3 items-start hover:border-blue-200 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                    <Image
                      src="/favicon.svg"
                      alt="thumb"
                      width={150}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-200 truncate">
                      {ruta.title}
                    </p>
                    <p className="text-[10px] text-gray-500">Olisabots</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      ruta.status === "completed"
                        ? "border-green-500"
                        : ruta.status === "warning"
                          ? "border-orange-400"
                          : "border-gray-300"
                    }`}
                  >
                    {ruta.status === "completed" && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ParteTrabajo;
