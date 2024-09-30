import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getRestaurantDetails } from "../../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

type RestaurantDetailsData = {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {

  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantDetailsData>();

  useEffect(() => {
    getRestaurantDetails(restaurantId).then((data) => {
      setRestaurantDetails(data.details); 
    }).catch(err => {
      console.error('Error fetching data:', err);
    });
  }, [restaurantId]);
  if (!restaurantId) return null;
  if (!restaurantDetails) return null;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {restaurantDetails.address}</Card.Text>
          <Card.Text>Review Score: {restaurantDetails.reviewScore}</Card.Text>
          <Card.Text>Contact: {restaurantDetails.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
