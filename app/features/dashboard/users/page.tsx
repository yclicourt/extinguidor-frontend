import {
  UserPlus,
  Search,
  ShieldCheck,
  Mail,
  Trash2,
  Edit2,
  Filter,
  RotateCcw,
} from "lucide-react";


const USERS = [
  {
    id: 1,
    initials: "JP",
    name: "Juan Pérez",
    email: "juan.p@extinguidor.com",
    role: "Administrador",
    status: "ACTIVO",
    activity: "Hace 2 horas",
    color: "bg-blue-600",
  },
  {
    id: 2,
    initials: "JS",
    name: "Jane S.",
    email: "jane.s@extinguidor.com",
    role: "Técnico",
    status: "ACTIVO",
    activity: "Hace 10 min",
    color: "bg-indigo-500",
  },
  {
    id: 3,
    initials: "ML",
    name: "Marta L.",
    email: "marta.l@extinguidor.com",
    role: "Facturación",
    status: "INACTIVO",
    activity: "Ayer",
    color: "bg-emerald-500",
  },
];

const GestionUsuarios = () => {
  return (
    <div className="flex flex-col flex-1 p-8 bg-gray-300">
      {/* Header Superior */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#1E293B]">
            Gestión de Usuarios
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Administración de personal y niveles de acceso al sistema.
          </p>
        </div>
        <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 transition-transform active:scale-95">
          <UserPlus size={20} />
          Añadir Usuario
        </button>
      </div>

      {/* Contenedor de Tabla */}
      <div className="bg-slate-800 rounded-[20px] shadow-sm border border-slate-200 overflow-hidden">
        {/* Barra de Búsqueda */}
        <div className="p-5 border-b border-slate-500 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#F1F5F9] border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <button className="p-2.5 text-blue-500 rounded-xl hover:bg-slate-200">
            <Filter size={20} />
          </button>
          <button className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg">
            <Trash2 size={20} />
          </button>
        </div>

        {/* Tabla Real */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800 text-gray-300 border-white text-[11px] uppercase tracking-wider font-bold ">
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4 text-center">Rol / Permisos</th>
                <th className="px-6 py-4 text-center">Estado</th>
                <th className="px-6 py-4 text-center">Última Actividad</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {USERS.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 ${user.color} text-white rounded-full flex items-center justify-center font-bold shadow-inner`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-300">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
                      <ShieldCheck size={18} className="text-blue-500" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-xs font-bold">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        user.status === "ACTIVO"
                          ? "bg-green-300 text-green-600"
                          : "bg-slate-400 text-slate-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-xs text-slate-400 font-medium">
                    {user.activity}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Paginación */}
        <div className="p-6 bg-slate-800 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
          <span>Mostrando 4 de 24 usuarios</span>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-700">
              Anterior
            </button>
            <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold">
              Siguiente
            </button>
            <div className="flex gap-2 ml-4">
              <button className="p-2 border rounded-lg bg-white">
                <RotateCcw size={14} />
              </button>
              <button className="p-2 border rounded-lg bg-white text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionUsuarios;
