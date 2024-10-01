import React, { useContext, useState } from 'react'
import { ListGroup, Container } from 'react-bootstrap'
import { RestaurantContext } from '../../context/restaurantContext'
import RestaurantListItem from '../RestaurantListItem/RestaurantListItem'
import LoadingSpinner from '../Loading/Loading'
import SortComponent from '../SortComponent'
import NoResults from '../NoResults'
import './RestaurantListStyles.scss'
import {
  filteredRestaurants,
  sortRestaurantsByRating,
} from '../../utils/filterAndSort'
import { Restaurant } from '../../types'

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void
  searchTerm: string
}

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
  searchTerm,
}) => {
  const context = useContext(RestaurantContext)

  if (!context) {
    throw new Error('RestaurantList must be used within a RestaurantProvider')
  }

  const {
    restaurants,
    error,
    isLoading,
    selectedRestaurant,
    setSelectedRestaurant,
  } = context

  const [sortOrder, setSortOrder] = useState('asc')
  const restaurantsSortedByRating = sortRestaurantsByRating(
    restaurants,
    sortOrder
  )
  const limitedData = filteredRestaurants(restaurantsSortedByRating, searchTerm)

  const handleRestaurantSelect = (id: number) => {
    onRestaurantSelect(id)
    setSelectedRestaurant(id)
  }

  return (
    <Container>
      {error && (
        <p role="alert" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {limitedData.length === 0 ? (
        <NoResults searchTerm={searchTerm} />
      ) : (
        <>
          <SortComponent
            onSortOrderChange={setSortOrder}
            sortOrder={sortOrder}
          />
          <ListGroup>
            {limitedData.map((restaurant: Restaurant) => (
              <RestaurantListItem
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                shortDescription={restaurant.shortDescription}
                onRestaurantSelect={handleRestaurantSelect}
                isSelected={restaurant.id === selectedRestaurant}
              />
            ))}
          </ListGroup>
        </>
      )}
      {isLoading && <LoadingSpinner message="loading..." />}
    </Container>
  )
}

export default RestaurantList
