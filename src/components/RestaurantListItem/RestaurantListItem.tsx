import React from "react";
import { ListGroup, } from "react-bootstrap";

type RestaurantListItemProps = {
  id: number;
  name: string;
  shortDescription: string;
  onRestaurantSelect: (id: number) => void;
};

const RestaurantList: React.FC<RestaurantListItemProps> = ({
  id, name, shortDescription, onRestaurantSelect
}) => {

  return (
          <ListGroup.Item
          data-testid="list-item"
            key={id}
            action
            onClick={() => {
              onRestaurantSelect(id);
              window.scrollTo({
                top: 0,      // Scroll to the top of the page
                behavior: 'smooth',  // Smooth scrolling animation
              });
            }}
          >
            <h5>{name}</h5>
            <p>{shortDescription}</p>
          </ListGroup.Item>
  );
};

export default RestaurantList;
