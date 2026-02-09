import { CalendarIcon } from "lucide-react";

interface PropsHeaderCalendar {
  openModal: () => void;
}
const HeaderCalendar = ({ openModal }: PropsHeaderCalendar) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Lunes, 2 de Febrero, 2026
        </h1>
      </div>
      <div className="flex gap-3">
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
        >
          <CalendarIcon size={18} /> Crear Parte de Trabajo
        </button>
        <button
          onClick={openModal}
          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Subir Documentos/Fotos
        </button>
      </div>
    </header>
  );
};
export default HeaderCalendar;
