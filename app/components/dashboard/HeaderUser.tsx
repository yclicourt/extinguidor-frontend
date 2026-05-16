import { UserPlus } from "lucide-react";

interface PropsHeaderUser {
  openModal: () => void;
}
const HeaderUser = ({ openModal }: PropsHeaderUser) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1E293B]">
          Gestión de Usuarios
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Administración de personal y niveles de acceso al sistema.
        </p>
      </div>
      <button
        onClick={openModal}
        className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-transform active:scale-95"
      >
        <UserPlus size={20} />
        Añadir Usuario
      </button>
    </div>
  );
};
export default HeaderUser;
