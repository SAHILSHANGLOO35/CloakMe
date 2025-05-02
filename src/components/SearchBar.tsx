"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

let debounceTimer: NodeJS.Timeout;

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const currentSearch = searchParams.get("search");
    setSearchValue(currentSearch || "");
  }, [searchParams]);

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      } else {
        params.delete("search");
      }

      const newPath = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.push(newPath);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  return (
    <div className="mb-6 mt-8">
      <div className="relative">
        <input
          id="search-input"
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts and users..."
          className="w-full rounded-full py-2 px-4 pl-10 text-white border bg-transparent border-[#374151] focus:outline-none focus:border-[#374151] peer"
          style={{ fontFamily: '"BR Firma", sans-serif', fontSize: '14px' }}
        />
        <span className="absolute left-3 top-2.5 text-gray-400 peer-focus:text-[#374151]">
          <Search size={16} />
        </span>
      </div>
    </div>
  );
}
