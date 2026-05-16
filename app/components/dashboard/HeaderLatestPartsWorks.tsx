"use client";
import { useRouter } from "next/navigation";

interface Props {
  meta: { month: number; year: number; activeTab: string };
}

const HeaderLatestPartsWorks = ({ meta }: Props) => {
  const router = useRouter();

  // Función para cambiar de pestaña sin perder el mes/año actual
  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", newTab);
    params.set("month", meta.month.toString());
    params.set("year", meta.year.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="p-4 border-b border-gray-300 flex justify-between items-center">
      <div className="flex gap-4">
        <button
          onClick={() => handleTabChange("assigned")}
          className={`text-sm font-semibold pb-1 ${meta.activeTab === "assigned" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-400"}`}
        >
          Assigned Work Orders
        </button>
        <button
          onClick={() => handleTabChange("unassigned")}
          className={`text-sm font-semibold pb-1 ${meta.activeTab === "unassigned" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-400"}`}
        >
          Unassigned Work Orders
        </button>
      </div>
      <div className="text-gray-300 text-xs flex items-center gap-2">
        Filters <span className="text-[10px]">▼</span>
      </div>
    </div>
  );
};
export default HeaderLatestPartsWorks;
