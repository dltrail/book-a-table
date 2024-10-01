import React from 'react';
import { SortOrder } from '../types';

type SortProps = {
    onSortOrderChange: (value: SortOrder) => void;
    sortOrder: string;
};

const SortComponent: React.FC<SortProps> = ({
    onSortOrderChange, sortOrder
}) => {

    return (
        <div className="text-right mb-4 flex items-center">
            <label htmlFor="sort" className='w-1/2' >Sort by: &nbsp;</label>
            <select className='border-[1px] p-2 w-1/2' name="sort" onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}>
                <option value="asc">Lowest rating</option>
                <option value="desc">Highest rating</option>
            </select>
        </div>

    );
};

export default SortComponent;
