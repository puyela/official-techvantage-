import React from 'react';
import '../index.css';
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  // Handle input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="flex items-center w-full md:w-8/12 lg:w-9/12">
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search for blog posts or authors..."
            value={searchTerm}
            className="w-full py-4 pl-14 pr-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-gray-500 hover:bg-gray-100"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="bg-primary text-white py-4 px-6 rounded-md ml-4 hover:bg-primary2 transition-all duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Display active filter */}
      {searchTerm && (
        <div className="flex justify-center mt-4">
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
            Filter applied: <strong>{searchTerm}</strong>
            <button
              className="ml-4 text-red-500 hover:underline"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;