import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getRestaurantDetails } from "../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

type RestaurantDetailsData = {
  details: {
    address: string;
    reviewScore: number;
    openingHours: {
      weekday: string;
      weekend: string;
    };
  }

  contactEmail: string;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {


  const [rests, setRests] = useState<RestaurantDetailsData>();

  const [isLoading, setIsLoading] = useState(true);

  const { details, contactEmail } = rests || {};
  const { address, reviewScore,  } = details || {};
  
  useEffect(() => {
    // Assuming you're fetching the data asynchronously
    getRestaurantDetails(restaurantId).then((data) => {
      setRests(data); // Set the details2 object after fetching
      console.log(data)
      setIsLoading(false); // Set loading to false
    }).catch(err => {
      console.error('Error fetching data:', err);
      setIsLoading(false); // Ensure loading state is cleared in case of error
    });
  }, [restaurantId]);
  

  if(!restaurantId){ return null}


  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Restaurant Details</Card.Title>
          <Card.Text>Address: {address}</Card.Text>
          <Card.Text>Review Score: {reviewScore}</Card.Text>
          <Card.Text>Contact: {rests?.contactEmail}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
