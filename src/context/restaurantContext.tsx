// RestaurantContext.tsx
import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getRestaurants } from '../services/api';
import { Restaurant, RestaurantContextProps } from '../types';

export const RestaurantContext = createContext<RestaurantContextProps | undefined>(undefined)

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState(6);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setIsLoading(true);
      try {
        const response = await getRestaurants();
        setData(response);
      } catch (err) {
        setError(`There was a problem fetching the restaurants: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const loadMore = useCallback(() => {
    setIsPaginationLoading(true);
    setTimeout(() => {
      setPaginationLimit((prevLimit) => prevLimit + 5);
      setIsPaginationLoading(false);
    }, 2000);
  }, []);

  const contextValue = useMemo(
    () => ({
      restaurants: data,
      error,
      isLoading,
      loadMore,
      paginationLimit,
      isPaginationLoading,
      sortOrder,
      setSortOrder,
      selectedRestaurant,
      setSelectedRestaurant,
    }),
    [data, error, isLoading, paginationLimit, isPaginationLoading, sortOrder, selectedRestaurant, loadMore]
  );

  return <RestaurantContext.Provider value={contextValue}>{children}</RestaurantContext.Provider>;
};
