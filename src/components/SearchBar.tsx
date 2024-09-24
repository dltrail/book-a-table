import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="text-center">
      <input
        className="border-[1px] border-black p-2 w-3/4 mx-auto my-4"
        type="text"
        placeholder="Search properties..."
        value={searchTerm}
        onChange={onSearchChange} // Handle input change
      />
      {searchTerm && (
        <button onClick={onClearSearch}>
          Clear search
        </button>
      )}
    </div>
  );
};

export default SearchBar;
