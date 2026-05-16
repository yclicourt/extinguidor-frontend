import { RouteIcon } from "lucide-react";

interface PropsCreateRoute {
  openModal: () => void;
}

const CreateRoute = ({ openModal }: PropsCreateRoute) => {
  return (
    <button
      onClick={openModal}
      className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/20"
    >
      <RouteIcon size={20} /> Crear Nueva Ruta
    </button>
  );
};
export default CreateRoute;
