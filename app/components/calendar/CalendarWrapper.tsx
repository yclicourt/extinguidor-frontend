"use client";
import { useState, useEffect, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfDay,
} from "date-fns";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { fetchCalendarData } from "@/app/helpers/api";
import { Ruta } from "@/app/helpers/interfaces/ruta.interface";
import { ParteTrabajo } from "@/app/helpers/interfaces/parte-trabajo.interface";
import { editParteTrabajoAssignToRoute } from "@/app/helpers/actions";
import HeaderCalendar from "./HeaderCalendar";
import RouteWrapper from "../rutas/RouteWrapper";
import ParteTrabajoWrapper from "../parte-trabajo/ParteTrabajoWrapper";

interface Props {
  children: React.ReactNode;
}
const CalendarView = ({ children }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(startOfDay(new Date()));

  // Estados de datos
  const [routes, setRoutes] = useState<Ruta[]>([]);
  const [unassignedParts, setUnassignedParts] = useState<ParteTrabajo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRouteId, setActiveRouteId] = useState<number | null>(null);

  // 1. Cargar Datos (Rutas y Partes No Asignados)

  const loadData = async () => {
    setIsLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      // Llamamos a tu helper de API
      const { dataRoutes, dataPartes } = await fetchCalendarData(month, year);

      // Guardamos en los estados para que useMemo pueda filtrar
      setRoutes(dataRoutes);
      setUnassignedParts(dataPartes);
    } catch (error) {
      toast.error("Error al cargar datos del calendario");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentDate]);

  // 2. Filtrar rutas para el día seleccionado
  const routesForSelectedDay = useMemo(() => {
    return routes.filter((route: Ruta) =>
      isSameDay(new Date(route.date), selectedDay),
    );
  }, [routes, selectedDay]);

  // 3. Función para asignar parte a ruta (Asignación desde la misma vista)
  const handleAssignToRoute = async (parteId: number, routeId: number) => {
    const toastId = toast.loading("Asignando parte a la ruta...");
    try {
      const result = await editParteTrabajoAssignToRoute(parteId, routeId);
      if (result.success) {
        const partAssign = unassignedParts.find((p) => p.id === parteId);
        setUnassignedParts((prev) =>
          prev.filter((p: ParteTrabajo) => p.id !== parteId),
        );

        setRoutes((prevRoutes) =>
          prevRoutes.map((route) => {
            if (route.id === routeId) {
              return {
                ...route,
                parts: partAssign
                  ? ([...(route.parts || []), partAssign].filter(
                      Boolean,
                    ) as ParteTrabajo[])
                  : route.parts || [],
              };
            }
            return route;
          }),
        );
        toast.success("Parte asignado correctamente", { id: toastId });

        // Refrescamos los datos del servidor para que las rutas
        // muestren el nuevo conteo de partes o detalles actualizados
        await loadData();
        // Aquí podrías llamar a tu función de fetching del calendario otra vez
        // fetchCalendarData();
      } else {
        toast.error(result.error || "No se pudo asignar el parte", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log("error: >>", error);
      toast.error("Error de conexión", { id: toastId });
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-slate-900 p-6 rounded-xl border border-slate-700 min-h-150">
      {/* SECCIÓN IZQUIERDA: CALENDARIO */}
      <div className="flex-1">
        <HeaderCalendar />

        <div className="grid grid-cols-7 gap-px bg-slate-700 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
            <div
              key={d}
              className="bg-slate-800/50 p-3 text-center text-[10px] font-black text-gray-500 uppercase tracking-widest"
            >
              {d}
            </div>
          ))}

          {days.map((day) => {
            routes.some((r: Ruta) => isSameDay(new Date(r.date), day));
            return (
              <div
                key={day.toString()}
                onClick={() => setSelectedDay(day)}
                className={`min-h-27.5 p-2 bg-slate-800 cursor-pointer transition-all relative group hover:bg-slate-700/50 ${
                  isSameDay(day, selectedDay)
                    ? "bg-slate-700 ring-2 ring-blue-500 ring-inset z-10"
                    : ""
                }`}
              >
                <span
                  className={`text-sm font-bold ${isSameDay(day, new Date()) ? "text-blue-500" : "text-gray-400"}`}
                >
                  {format(day, "d")}
                </span>

                <div className="mt-2 flex flex-col gap-1">
                  {routes
                    .filter((r: Ruta) => isSameDay(new Date(r.date), day))
                    .slice(0, 3)
                    .map((r: Ruta) => (
                      <div
                        key={r.id}
                        className="text-[9px] bg-blue-600/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30 flex justify-between items-center group/item"
                      >
                        <span className="truncate flex-1">
                          {r.title || `Ruta #${r.id}`}
                        </span>

                        {/* BADGE DE PARTES ASIGNADOS */}
                        {r.parts && r.parts.length > 0 && (
                          <span className="ml-1 bg-blue-500 text-white text-[8px] px-1 rounded-full font-bold min-w-3 text-center">
                            {r.parts.length}
                          </span>
                        )}
                      </div>
                    ))}
                  {routes.filter((r: Ruta) => isSameDay(new Date(r.date), day))
                    .length > 2 && (
                    <span className="text-[9px] text-gray-500 pl-1">
                      ...y más
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-row gap-2">
          <RouteWrapper selectedDay={selectedDay} onRouteCreated={loadData}>
            {children}
          </RouteWrapper>

          <ParteTrabajoWrapper>{children}</ParteTrabajoWrapper>
        </div>
      </div>

      {/* SECCIÓN DERECHA: PANEL DE DETALLES */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        {/* Rutas del Día */}
        <section className="flex-1 bg-slate-800/30 rounded-2xl border border-slate-700 p-5 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">
              Rutas para el {format(selectedDay, "dd/MM")}
            </h3>
            <span className="bg-blue-600/10 text-blue-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
              {routesForSelectedDay.length}
            </span>
          </div>

          <div className="space-y-3">
            {routesForSelectedDay.length > 0 ? (
              routesForSelectedDay.map((route: Ruta) => (
                <div
                  key={route.id}
                  onClick={() => setActiveRouteId(route.id)}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    activeRouteId === route.id
                      ? "border-blue-500 bg-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-500"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-white">
                      {route.title}
                    </p>
                    <span className="text-[10px] bg-slate-700 text-gray-300 px-2 py-0.5 mr-2 rounded-md">
                      {route.parts?.length || 0} partes
                    </span>

                    {activeRouteId === route.id && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  {/* Aquí podrías mostrar cuántos partes ya tiene esta ruta */}
                  <p className="text-[10px] text-gray-500 mt-1">
                    ID: {route.id} • {route.in_charge}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-xs text-gray-500 italic">
                  No hay rutas para este día
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Partes No Asignados (Basado en el mes seleccionado) */}
        <section className="h-72 bg-slate-800/30 rounded-2xl border border-orange-500/20 p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-orange-500 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} /> Sin Asignar ({unassignedParts.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
            {unassignedParts.map((parte: ParteTrabajo) => (
              <div
                key={parte.id}
                className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex items-center justify-between group"
              >
                <div className="truncate mr-2">
                  <p className="text-[11px] text-white font-bold truncate">
                    {parte.title}
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase">
                    {parte.client?.name || "Sin Cliente"} - {parte.category}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (!activeRouteId)
                      return toast.error(
                        "Selecciona primero una ruta de la izquierda",
                      );
                    handleAssignToRoute(parte.id, activeRouteId);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-[9px] px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Asignar
                </button>
              </div>
            ))}
            {unassignedParts.length === 0 && (
              <p className="text-[10px] text-gray-600 text-center mt-10">
                Todo asignado este mes
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CalendarView;
