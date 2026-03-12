import { RutaState } from "@/app/helpers/enums/ruta.enum";
import { Ruta } from "@/app/helpers/interfaces/ruta.interface";
import { CheckCircle2, Clock } from "lucide-react";
interface PropsRouteCardInactive {
  route: Ruta;
  isSelected: boolean;
}
const RouteCardInactive = ({ route, isSelected }: PropsRouteCardInactive) => {
  return (
    <>
      <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0" />
      <div className="flex-1">
        <p className="text-xs font-bold text-slate-800">{route.title}</p>
        <p className="text-[10px] text-slate-400">{route.comments}</p>
      </div>

      {route.state === RutaState.PENDIENTE ||
      route.state === RutaState.EN_PROGRESO ? (
        <Clock
          className={isSelected ? "text-white" : "text-blue-500"}
          size={20}
        />
      ) : (
        <CheckCircle2
          className={isSelected ? "text-white" : "text-green-500"}
          size={20}
        />
      )}
    </>
  );
};
export default RouteCardInactive;
