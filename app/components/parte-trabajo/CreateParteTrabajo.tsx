import { ListCheck } from "lucide-react";

interface PropsCreateParteTrabajo {
  openModal: () => void;
}

const CreateParteTrabajo = ({ openModal }: PropsCreateParteTrabajo) => {
  return (
    <button
      onClick={openModal}
      className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-blue-900/20"
    >
      <ListCheck size={20} /> Crear Nuevo Parte
    </button>
  );
};
export default CreateParteTrabajo;
