// Componente auxiliar para los tags de estado
export const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    COMPLETED: "bg-green-500 text-white",
    "IN PROGRESS": "bg-blue-400 text-white",
    PENDING: "bg-gray-300 text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.PENDING}`}
    >
      {status}
    </span>
  );
};
