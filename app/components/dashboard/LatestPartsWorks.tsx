import { fetchTablePartsWorks } from "../../helpers/api";
import HeaderLatestPartsWorks from "./HeaderLatestPartsWorks";
import LastPartsWorksTableWrapper from "./LastPartsWorksTableWrapper";
import Pagination from "./Pagination";

interface PropsTable {
  searchParams: {
    tab?: string;
    month?: string;
    year?: string;
    currentPage?: string;
  };
}

const LatestPartsWorks = async ({ searchParams }: PropsTable) => {
  const { data, totalPages, params } = await fetchTablePartsWorks({
    searchParams,
  });

  return (
    <div className="bg-slate-800 rounded-xl shadow-md border border-slate-700 flex flex-col h-87.5 overflow-hidden">
      {/* Header */}
      <HeaderLatestPartsWorks meta={params} />

      {/* Tabla */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <LastPartsWorksTableWrapper initialParts={data} />
      </div>

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={params.currentPage} />
    </div>
  );
};

export default LatestPartsWorks;
