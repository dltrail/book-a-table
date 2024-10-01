import { Restaurant } from '../types';

export const sortRestaurantsByRating = (
  restaurants: Restaurant[],
  sortOrder: 'asc' | 'desc' = 'asc'
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;
    
    return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
  });
};
