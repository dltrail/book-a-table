import { Restaurant } from '../../types';
import { filteredRestaurants, sortRestaurantsByRating } from '../filterAndSort';

describe('sortRestaurantsByRating', () => {
  const mockRestaurants: Restaurant[] = [
    { id: 1, name: 'Restaurant A', shortDescription: 'A', rating: 4.5 },
    { id: 2, name: 'Restaurant B', shortDescription: 'B', rating: 4.7 },
    { id: 3, name: 'Restaurant C', shortDescription: 'C', rating: 4.0 },
    { id: 4, name: 'Restaurant D', shortDescription: 'D', rating: 5.0 },
  ];

  it('should sort restaurants in ascending order', () => {
    const sortedRestaurants = sortRestaurantsByRating(mockRestaurants, 'asc');
    expect(sortedRestaurants).toEqual([
      { id: 3, name: 'Restaurant C', shortDescription: 'C', rating: 4.0 },
      { id: 1, name: 'Restaurant A', shortDescription: 'A', rating: 4.5 },
      { id: 2, name: 'Restaurant B', shortDescription: 'B', rating: 4.7 },
      { id: 4, name: 'Restaurant D', shortDescription: 'D', rating: 5.0 },
    ]);
  });

  it('should sort restaurants in descending order', () => {
    const sortedRestaurants = sortRestaurantsByRating(mockRestaurants, 'desc');
    expect(sortedRestaurants).toEqual([
      { id: 4, name: 'Restaurant D', shortDescription: 'D', rating: 5.0 },
      { id: 2, name: 'Restaurant B', shortDescription: 'B', rating: 4.7 },
      { id: 1, name: 'Restaurant A', shortDescription: 'A', rating: 4.5 },
      { id: 3, name: 'Restaurant C', shortDescription: 'C', rating: 4.0 },
    ]);
  });
})

describe('filter restaurants', () => {
  const mockRestaurants: Restaurant[] = [
    { id: 1, name: 'Restaurant A', shortDescription: 'A', rating: 4.5 },
    { id: 2, name: 'Restaurant B', shortDescription: 'B', rating: 4.7 },
    { id: 3, name: 'Restaurant C', shortDescription: 'C', rating: 4.0 },
    { id: 4, name: 'Restaurant D', shortDescription: 'D', rating: 5.0 },
  ];

  const searchTerm = 'Restaurant A'

  it('should filter restaurants whose name contains search term', () => {
    const filteredRestaurantList = filteredRestaurants(mockRestaurants, searchTerm);
    expect(filteredRestaurantList).toEqual([
      { id: 1, name: 'Restaurant A', shortDescription: 'A', rating: 4.5 },
    ]);
  });

})