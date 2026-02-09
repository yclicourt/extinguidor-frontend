import { Search, Calendar as FilterIcon } from "lucide-react";

import Calendar from "@/app/components/Calendar";
import RouteGest from "@/app/components/RouteGest";
import ParteTrabajoWrapper from "@/app/components/ParteTrabajoWrapper";

const ParteTrabajo = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {/* Header Superior */}

      <ParteTrabajoWrapper>
        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Sección Izquierda */}
          <div className="flex-3 bg-slate-700 rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="relative w-64">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-full text-sm outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-200">
                <FilterIcon size={16} /> Filtros
              </div>
            </div>

            <Calendar />
          </div>
          <RouteGest />
        </div>
      </ParteTrabajoWrapper>
    </div>
  );
};

export default ParteTrabajo;
