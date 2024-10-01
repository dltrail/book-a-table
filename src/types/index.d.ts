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
  selectedRestaurant: number | null
  setSelectedRestaurant: (id: number | null) => void
}
