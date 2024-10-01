import React, { useContext, useMemo } from 'react';
import { ListGroup, Container, Button } from 'react-bootstrap';
import { RestaurantContext } from '../../context/restaurantContext';
import RestaurantListItem from '../RestaurantListItem/RestaurantListItem';
import LoadingSpinner from '../Loading/Loading';
import SortComponent from '../SortComponent';
import NoResults from '../NoResults';
import './RestaurantListStyles.scss';

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
  searchTerm: string;
};

const RestaurantList: React.FC<RestaurantListProps> = ({ onRestaurantSelect, searchTerm }) => {
  const context = useContext(RestaurantContext);

  if (!context) {
    throw new Error('RestaurantList must be used within a RestaurantProvider');
  }

  const {
    restaurants,
    error,
    isLoading,
    loadMore,
    paginationLimit,
    isPaginationLoading,
    sortOrder,
    setSortOrder,
    selectedRestaurant,
    setSelectedRestaurant,
  } = context;

  const handleRestaurantSelect = (id: number) => {
    onRestaurantSelect(id);
    setSelectedRestaurant(id);
  };

  const restaurantsSortedByRating = [...restaurants].sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;

    return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
  });

  const filteredProperties = restaurantsSortedByRating.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const limitedData = useMemo(() => filteredProperties.slice(0, paginationLimit), [filteredProperties, paginationLimit]);

  return (
    <Container>
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      {limitedData.length === 0 ? (
        <NoResults searchTerm={searchTerm} />
      ) : (
        <>
          <SortComponent onSortOrderChange={setSortOrder} sortOrder={sortOrder} />
          <ListGroup>
            {limitedData.map((restaurant) => (
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

      {!isLoading && limitedData.length !== 0 && (
        <Button
          onClick={loadMore}
          aria-label="Load more restaurants"
          className="text-center mx-auto inline-block mt-4 relative left-1/2 -translate-x-1/2 bg-[var(--primary-color)] border-[var(--primary-color)] hover:bg-white hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]"
        >
          {isPaginationLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </Container>
  );
};

export default RestaurantList;
