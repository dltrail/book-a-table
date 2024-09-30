import React from 'react';
import { Button } from '@dltrail/gs-frontend-toolkit';

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
        placeholder="Search restaurants..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      {searchTerm && (
        <Button onClick={onClearSearch} variation={'filled'} disabled={searchTerm? false: true}>
          Clear search
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
