"use client";
import { fetchRoutesGest } from "@/app/helpers/api";
import { Ruta } from "@/app/helpers/interfaces/ruta.interface";
import { useCallback, useEffect, useState } from "react";
import RouteCardActive from "./RouteCardActive";
import RouteCardInactive from "./RouteCardInactive";





const RouteMap = () => {
  const [routes, setRoutes] = useState<Ruta[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const loadMoreRoutes = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const result = await fetchRoutesGest({
        limit: 5,
        cursor: cursor ?? undefined,
      });

      if (result.data && result.data.length > 0) {
        setRoutes((prev) => {
          const newRoutes = result.data.filter(
            (nr: Ruta) => !prev.some((pr) => pr.id === nr.id),
          );
          return [...prev, ...newRoutes];
        });

        setCursor(result.nextCursor);
      }
      if (!result.nextCursor) setHasMore(false);
    } catch (error) {
      console.log("Error cargando las rutas: ", error);
    } finally {
      setLoading(false);
    }
  }, [cursor, loading, hasMore]);

  useEffect(() => {
    if (routes.length === 0) {
      loadMoreRoutes();
    }
  }, [loadMoreRoutes, routes.length]);

  return (
    <>
      <div className=" space-y-3">
        {routes.map((route) => {
          const isSelected = selectedRouteId === route.id;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`${
                isSelected
                  ? "p-3 bg-blue-600 text-white rounded-xl shadow-md flex items-center gap-3"
                  : "p-3 bg-white border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm"
              }`}
            >
              {isSelected ? (
                <RouteCardActive route={route} />
              ) : (
                <RouteCardInactive isSelected={isSelected} route={route} />
              )}
            </div>
          );
        })}
        {hasMore && (
          <button
            onClick={loadMoreRoutes}
            className="mt-4 w-full p-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            {loading ? "Cargando ..." : "Cargando mas rutas"}
          </button>
        )}
      </div>
    </>
  );
};
export default RouteMap;
