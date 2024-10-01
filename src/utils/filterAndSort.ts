import { Restaurant } from '../types'

// Sort by rating
export const sortRestaurantsByRating = (
  restaurants: Restaurant[],
  sortOrder: string
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    const ratingA = a.rating
    const ratingB = b.rating

    return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA
  })
}

// Filter by search term
export const filteredRestaurants = (
  restaurants: Restaurant[],
  searchTerm: string
): Restaurant[] => {
  return restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}
