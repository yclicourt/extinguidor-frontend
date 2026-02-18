"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-700 mt-auto rounded-b-xl">
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Página{" "}
            <span className="font-semibold text-white">{currentPage}</span> de{" "}
            <span className="font-semibold text-white">{totalPages}</span>
          </p>
        </div>

        <nav className="inline-flex -space-x-px rounded-lg border border-slate-700 overflow-hidden shadow-sm">
          <button
            onClick={() => createPageURL(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-2 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          <div className="px-4 py-2 bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center border-x border-slate-700">
            {currentPage}
          </div>

          <button
            onClick={() => createPageURL(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-2 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
