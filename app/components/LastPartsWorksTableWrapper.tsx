import { EstadoParteTrabajo } from "../helpers/enums/part_work.enum";
import { StatusBadge } from "./StatusBadge";

interface Props {
  initialParts: PartWork[];
}

interface PartWork {
  id: number;
  title: string;
  client: {
    name: string;
  };
  state: EstadoParteTrabajo;
  route: {
    in_charge: string;
  };
}

const LastPartsWorksTableWrapper = ({ initialParts }: Props) => {
  return (
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

        <tbody className="divide-y divide-slate-700">
          {initialParts.map((order, index) => (
            <tr
              key={order.id}
              className="text-sm text-gray-300 hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-4 py-4 text-gray-300">{index + 1}</td>

              <td className="px-4 py-4 font-medium text-gray-300">
                {order.title}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {order.client.name || "—"}
              </td>

              <td className="px-4 py-4 text-gray-300">
                {order.route.in_charge || "—"}
              </td>

              <td className="px-4 py-4">
                <StatusBadge status={order.state} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default LastPartsWorksTableWrapper;
