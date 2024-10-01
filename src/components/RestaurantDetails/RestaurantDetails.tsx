import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getRestaurantDetails } from "../../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

type RestaurantDetailsData = {
  details: {
    address: string;
    reviewScore: number | null;
    contactEmail: string;
    openingHours: {
      weekday: string;
      weekend: string;
    };
  };

  contactEmail: string;
};

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {

  const [rests, setRests] = useState<RestaurantDetailsData>();
  const { details } = rests || {};
  const { address, reviewScore, openingHours, contactEmail } = details || {};
  const { weekday, weekend } = openingHours || {};

  useEffect(() => {
    // Assuming you're fetching the data asynchronously
    getRestaurantDetails(restaurantId).then((data) => {
      setRests(data); // Set the details2 object after fetching
      console.log(data.details);
    }).catch(err => {
      console.error('Error fetching data:', err);

    });
  }, [restaurantId]);


  if (!restaurantId) { return null; }


  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title><h3 className="mb-4">Restaurant Details</h3></Card.Title>
          <Card.Text><span className="font-bold">📍 Address:</span> {address}</Card.Text>
          <Card.Text><span className="font-bold">⭐️ Review Score: </span>{reviewScore}</Card.Text>
          <Card.Text><span className="font-bold">📧 Contact:</span> {contactEmail}</Card.Text>
          <Card.Text className="flex flex-col"><span className="font-bold">⏰ Opening Hours:</span>
            <span className="ml-12">Weekends: {weekend}</span>
            <span className="ml-12">Weekdays: {weekday}</span>
          </Card.Text>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default RestaurantDetails;
