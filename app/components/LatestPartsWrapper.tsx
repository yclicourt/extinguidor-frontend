// Mock de datos basado en tu imagen
const WORK_ORDERS = [
  { id: 1, title: 'Part: 345 | Maintenance', client: '', assignee: 'John P.', status: 'COMPLETED' },
  { id: 2, title: 'Client A', client: '', assignee: 'Jane S.', status: 'IN PROGRESS' },
  { id: 3, title: 'Part: 346 | Installation', client: '', assign: '', status: 'PENDING' },
  { id: 4, title: 'Part: 347 | New Project', client: '', assign: '', status: 'COMPLETED' },
  { id: 5, title: 'Part: 347 | New Project', client: '', assign: '', status: 'COMPLETED' },
  
];

const LatestPartsWrapper = () => {
  return (
    <div className="bg-slate-800 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header de la Tabla */}
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <div className="flex gap-4">
          <button className="text-sm text-gray-300 font-semibold border-b-2 border-blue-600 pb-1">
            Assigned Work Orders
          </button>
          <button className="text-sm text-gray-300 font-medium pb-1">
            Unassigned Work Orders
          </button>
        </div>
        <div className="text-gray-300 text-xs flex items-center gap-2">
           Filters <span className="text-[10px]">▼</span>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-800 text-gray-300 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Assign</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {WORK_ORDERS.map((order, index) => (
              <tr key={order.id} className="text-sm text-gray-300 hover:bg-gray-500 transition-colors">
                <td className="px-4 py-4 text-gray-300">{index + 1}</td>
                <td className="px-4 py-4 font-medium text-gray-300">{order.title}</td>
                <td className="px-4 py-4 text-gray-300">{order.client || '—'}</td>
                <td className="px-4 py-4 text-gray-300">{order.assignee || '—'}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente auxiliar para los tags de estado
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    COMPLETED: "bg-green-500 text-white",
    "IN PROGRESS": "bg-blue-400 text-white",
    PENDING: "bg-gray-300 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles.PENDING}`}>
      {status}
    </span>
  );
};

export default LatestPartsWrapper;