// RestaurantContext.tsx
import React, { createContext, useState, useEffect, useMemo } from 'react'
import { getRestaurants } from '../services/api'
import { Restaurant, RestaurantContextProps } from '../types'

export const RestaurantContext = createContext<
  RestaurantContextProps | undefined
>(undefined)

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<Restaurant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  )

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true)
      try {
        const response = await getRestaurants()
        setData(response)
      } catch (err) {
        setError(`There was a problem fetching the restaurants: ${err}`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  const contextValue = useMemo(
    () => ({
      restaurants: data,
      error,
      isLoading,
      selectedRestaurant,
      setSelectedRestaurant,
    }),
    [data, error, isLoading, selectedRestaurant]
  )

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  )
}
