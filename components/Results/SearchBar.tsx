"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex items-center py-1 m-4 text-center gap-2 rounded-md w-fit bg-zinc-800">
      <IconSearch size={28} className="h-full pl-2 opacity-60" />
      <input
        placeholder="Search..."
        className="bg-transparent transition-all pl-2 py-2 w-52 focus:w-72 text-sm rounded-br-md rounded-tr-md outline-none outline-[1px] outline-transparent focus:outline-green-400 h-full"
        onChange={(e) => {
          e.preventDefault();
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
}
