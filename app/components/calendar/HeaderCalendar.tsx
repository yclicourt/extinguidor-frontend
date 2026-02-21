"use client";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { es } from "date-fns/locale";

const HeaderCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold capitalize text-white">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
      </div>
      <div className="flex gap-2 bg-slate-800 p-1 rounded-lg">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1)),
            )
          }
          className="p-2 hover:bg-slate-700 text-white rounded-md transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentDate(new Date())}
          className="px-3 text-xs text-gray-400 hover:text-white uppercase font-bold"
        >
          Hoy
        </button>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
            )
          }
          className="p-2 hover:bg-slate-700 text-white rounded-md transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </header>
  );
};
export default HeaderCalendar;
