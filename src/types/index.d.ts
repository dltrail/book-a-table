export type Restaurant = {
  id: number
  name: string
  shortDescription: string
  rating: number
}

export type SortOrder = 'asc' | 'desc'

export type RestaurantContextProps = {
  restaurants: Restaurant[]
  error: string | null
  isLoading: boolean
  loadMore: () => void
  paginationLimit: number
  isPaginationLoading: boolean
  sortOrder: sortOrder
  setSortOrder: (order: SortOrder) => void
  selectedRestaurant: number | null
  setSelectedRestaurant: (id: number | null) => void
}
