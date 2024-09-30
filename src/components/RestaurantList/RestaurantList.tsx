import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ListGroup, Container, Spinner, Button } from "react-bootstrap";
import { getRestaurants } from "../../services/api";
import { Restaurant } from "../../types";
import RestaurantListItem from "../RestaurantListItem/RestaurantListItem";
import LoadingSpinner from "../Loading";
import SortComponent from "../SortComponent";
import NoResults from "../NoResults";

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
  searchTerm: string;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect, searchTerm
}) => {

  const [data, setData] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState(10);
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order


  const handleSortOrderChange = (order: string) => {
    // Implement sorting logic based on the order parameter
    setSortOrder(order);
  };

  // const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order

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


  const loadMore = useCallback(() => { //Using useCallback ensures that the functions are not recreated on every render.
    setIsPaginationLoading(true);
    setTimeout(() => {
      setPaginationLimit((prevLimit) => prevLimit + 5);
      setIsPaginationLoading(false);
    }, 2000);
  }, []);

  const handleRestaurantSelect = useCallback(
    (id: number) => {
      onRestaurantSelect(id);
    },
    [onRestaurantSelect]
  );

  const restaurantsSortedByRating = [...data].sort((a, b) => {
    const ratingA = a.rating;
    const ratingB = b.rating;

    return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
  });

  const filteredProperties = restaurantsSortedByRating.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by location (or any other field)
  );

  const limitedData = useMemo(() => filteredProperties.slice(0, paginationLimit), [filteredProperties, paginationLimit]); // limitedData is memoized so it's only recalculated when data or paginationLimit changes.


  //   const handleSortOrderChange = (order: string) => {
  //     // Implement sorting logic based on the order parameter
  //     setSortOrder(order);
  // };

  return (
    <Container>
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      {limitedData.length === 0 ?
        (<NoResults searchTerm={searchTerm}/>) :

        <><SortComponent onSortOrderChange={handleSortOrderChange} sortOrder={sortOrder} />

          <ListGroup>
            {limitedData.map((restaurant) => (
              <RestaurantListItem key={restaurant.id} id={restaurant.id} name={restaurant.name} shortDescription={restaurant.shortDescription} onRestaurantSelect={handleRestaurantSelect} />
            ))}
          </ListGroup></>

      }

      {isLoading && <LoadingSpinner message="loading..." />}

      {!isLoading && !isPaginationLoading && limitedData.length !== 0 && (
        <Button onClick={loadMore} aria-label="Load more restaurants">
          Load more
        </Button>
      )}

      {isPaginationLoading && <Spinner animation="border" role="status"><span className="sr-only">Loading more...</span></Spinner>}
    </Container>
  );
};

export default RestaurantList;
