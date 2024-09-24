import React, { useEffect, useState } from "react";
import { ListGroup, Container } from "react-bootstrap";
import { getRestaurants } from "../services/api";

type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
};

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
}) => {
  const restaurants = [
    {
      id: 1,
      name: "Velvet & Vine",
      shortDescription: "A fine dining experience with a modern twist.",
      cuisine: "French",
      rating: 4.7,
      details: {
        id: 1,
        address: "123 Fine St, London",
        openingHours: {
          weekday: "12:00 PM - 10:00 PM",
          weekend: "11:00 AM - 11:00 PM",
        },
        reviewScore: 4.7,
        contactEmail: "info@gourmetkitchen.com",
      },
    },
  ];

  const [data, setData] = useState<Restaurant[]>([])
  const [error, setError] = useState({
    msg: '',
});
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  getRestaurants()
    .then((json) => {
      setData(json);
    })
    .catch((err) => {
      setError({
        msg: `There was a problem fetching the properties: ${err}`,
      });
    })
    .finally(() => {
      setIsLoading(false);
    });

}, []); // Empty dependency array, effect runs once


  return (
    <Container>
      <h2>Restaurants</h2>
      <ListGroup>
        {data.map((restaurant) => (
          <ListGroup.Item
            key={restaurant.id}
            action
            onClick={() => {
              console.log(restaurant.id)
              onRestaurantSelect(restaurant.id)}}
          >
            <h5>{restaurant.name}</h5>
            <p>{restaurant.shortDescription}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default RestaurantList;
