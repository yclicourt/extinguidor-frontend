const Calendar = () => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="text-center font-bold text-lg mb-4 text-gray-700">
        FEBRERO 2026
      </div>
      <div className="grid grid-cols-7 border-t border-l border-gray-200">
        {/* Días de la semana o números - Render dinámico */}
        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-b border-gray-200 h-24 p-2 relative hover:bg-gray-300 transition-colors"
          >
            <span className="text-sm text-gray-200">{i + 1}</span>
            {/* Ejemplo de punto indicador (Azul en tu diseño) */}
            {(i === 11 || i === 12 || i === 23) && (
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
