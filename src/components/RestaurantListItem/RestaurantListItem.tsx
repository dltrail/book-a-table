import React from "react";
import { ListGroup, } from "react-bootstrap";
import './RestaurantListStyles.scss'

type RestaurantListItemProps = {
  id: number;
  name: string;
  shortDescription: string;
  onRestaurantSelect: (id: number) => void;
  isSelected: boolean
};

const RestaurantList: React.FC<RestaurantListItemProps> = ({
  id, name, shortDescription, onRestaurantSelect, isSelected
}) => {

 const handleRestaurantListItemClicked = (id: number) => {
    onRestaurantSelect(id);
    window.scrollTo({
      top: 0,      // Scroll to the top of the page
      behavior: 'smooth',  // Smooth scrolling animation
    });
  }

  return (
          <ListGroup.Item
          data-testid="list-item"
            key={id}
            action
            className={isSelected? 'selected': ''}
            onClick={() => {
              handleRestaurantListItemClicked(id)
            }}
          >
            <h5>{name}</h5>
            <p>{shortDescription}</p>
          </ListGroup.Item>
  );
};

export default RestaurantList;
