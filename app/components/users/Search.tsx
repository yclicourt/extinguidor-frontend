"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchUser = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    // Actualiza la URL sin recargar la pagina
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className="w-full pl-12 pr-4 py-2.5 bg-[#F1F5F9] border-transparent rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </>
  );
};
export default SearchUser;
