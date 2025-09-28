import React from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const [search, setSearch] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Have to Implement search logic here
    console.log("Searching for:", search);
    setIsOpen(false);
  }

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute left-0 top-0 bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
        onSubmit={handleSearch}
         className="relative flex item-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search products..."
              // value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <HiMagnifyingGlass className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            <HiMiniXMark className="h-6 w-6 text-gray-700 ml-4" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
