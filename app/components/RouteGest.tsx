import Image from "next/image";
import { fetchRoutesGest } from "../helpers/api";
import { Ruta } from "../helpers/interfaces/ruta.interface";



async function RouteGest() {
  const { data } = await fetchRoutesGest();
  const dateRoute = new Date();
  return (
    <aside className="flex-1 flex flex-col gap-4 overflow-y-auto">
      <div className="bg-slate-500 p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-slate-700 text-sm mb-4 flex justify-between">
          Rutas del día {`${dateRoute.getDate()}`}
          <span className="text-slate-300 font-normal">{`${data.length} Pedidos`}</span>
        </h3>

        <div className="space-y-3">
          {data.map((ruta: Ruta) => (
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
                <p className="text-xs font-bold text-slate-300 truncate">
                  {ruta.title}
                </p>
                <p className="text-[10px] text-slate-800">
                  {ruta.vehicle.matricule}
                </p>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  ruta.status === "FINALIZADO"
                    ? "border-green-500"
                    : ruta.status === "PENDIENTE"
                      ? "border-orange-400"
                      : "border-gray-300"
                }`}
              >
                {ruta.status === "FINALIZADO" && (
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
export default RouteGest;
