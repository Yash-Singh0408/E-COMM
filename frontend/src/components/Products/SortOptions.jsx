import { useSearchParams } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set("sortBy", sortBy);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  const currentSort = searchParams.get("sortBy") || "";

  return (
    <div className="flex items-center justify-between sm:justify-end gap-3 mb-4">
      <label
        htmlFor="sort"
        className="flex items-center gap-2 text-sm font-medium text-color-text-primary tracking-wide"
      >
        <ArrowUpDown className="w-4 h-4 text-color-accent" />
        <span className="hidden sm:inline">SORT BY</span>
      </label>
      <div className="relative">
        <select
          id="sort"
          onChange={handleSortChange}
          value={currentSort}
          className="appearance-none bg-color-bg-highlight bg-bg border-2 border-color-border text-color-text-primary px-4 py-2 pr-10 rounded-sm focus:outline-none focus:border-color-accent transition-all duration-200 cursor-pointer text-sm font-medium hover:bg-color-border hover:shadow-sm"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-color-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
