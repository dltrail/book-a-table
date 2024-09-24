import React from 'react';

interface NoResultsProps {
searchTerm: string
}

const NoResults: React.FC<NoResultsProps> = ({searchTerm}) => {
  return (
<div className="absolute bg-white z-[99] h-full w-full max-w-[1320px] text-center">
           <h3>I couldn`t find anything based on your search of </h3>
            <p className="font-bold text-lg">" {searchTerm} "</p> 
            <p>   I`m not that sophistacated just yet.
          </p>
        </div>
  );
};

export default NoResults;
