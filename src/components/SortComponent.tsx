import React from 'react';

type SortProps = {
    onSortOrderChange: (value: string) => void;
    sortOrder: string;
};

const SortComponent: React.FC<SortProps> = ({
    onSortOrderChange, sortOrder
}) => {

    return (
        <div className="text-right mb-4">
            <label htmlFor="sort">Sort by: </label>
            <select className='border-[1px] p-2' name="sort" onChange={(e) => onSortOrderChange(e.target.value)}>
                <option value="asc">Lowest rating</option>
                <option value="desc">Highest rating</option>
            </select>
        </div>

    );
};

export default SortComponent;
