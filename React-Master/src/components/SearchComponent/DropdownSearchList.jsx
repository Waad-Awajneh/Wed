// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function DropdownSearchList({ options }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedOption, setSelectedOption] = useState("");

// const [searchParams, setSearchParams]= useSearchParams();
//   const handleSearch = event => {
//     setSearchTerm(event.target.value);
//     setSearchParams({search: event.target.value});
//   };

//   const handleOptionSelect = event => {
//     setSelectedOption(event.target.value);
//     setSearchParams({selected: event.target.value});
//   };

//   const filteredOptions = options.filter(option =>
//     option.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="relative">
//       <input
//         className="block w-full py-2 px-3 rounded-md text-gray-900 placeholder-gray-500 border border-gray-300 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
//         type="text"
//         placeholder="Search"
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//         <svg className="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
//       </div>
//       <select
//         className="block w-full py-2 px-3 rounded-md text-gray-900 placeholder-gray-500 border border-gray-300 bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
//         value={selectedOption}
//         onChange={handleOptionSelect}
//       >
//         {filteredOptions.map(option => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
import React, { useState } from 'react';

function DropdownSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block">
      <button
        className="bg-white text-gray-800 font-medium py-2 px-4 rounded-md border border-gray-300"
        onClick={toggleDropdown}
      >
        Dropdown
      </button>
      {isOpen && (
        <div
          className="absolute z-50 bg-white rounded-md py-2 overflow-auto text-gray-700 border border-gray-300"
          style={{ minWidth: "250px" }}
        >
          <input
            className="px-2 py-1 rounded-md w-full"
            type="text"
            placeholder="Search.."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {filteredOptions.map(option => (
            <div
              key={option}
              className="px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownSearch;
