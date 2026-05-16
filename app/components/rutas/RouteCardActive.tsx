import { Ruta } from "@/app/helpers/interfaces/ruta.interface";

interface PropsRouteCardActive {
  route: Ruta;
  
}
const RouteCardActive = ({ route }: PropsRouteCardActive) => {
  return (
    <>
      <div className="w-12 h-12 bg-white/20 rounded-lg shrink-0" />
      <div className="flex-1">
        <p className="text-xs font-bold">{route.title}</p>
        <p className="text-[10px] opacity-80">{route.comments}</p>
      </div>
      <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
    </>
  );
};
export default RouteCardActive;
