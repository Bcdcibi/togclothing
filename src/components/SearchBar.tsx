"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`)
    }
  };

  return (
    <form className="w-full sm:w-auto" onSubmit={handleSearch}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" name="name" id="default-search" className="block w-full bg-gray-100 border focus:bg-transparent p-4 text-sm ps-10 rounded outline-none transition-all" placeholder="Search Products..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-lama hover:bg-lama/80 rounded font-medium text-sm px-4 py-2">Search</button>
      </div>
    </form>

  );
};

export default SearchBar;
