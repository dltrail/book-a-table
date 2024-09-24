import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";
import Heading from "./components/Heading";
import SortComponent from "./components/SortComponent";
import SearchBar from "./components/SearchBar";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  const handleSortOrderChange = (order: string) => {
    // Implement sorting logic based on the order parameter
    setSortOrder(order);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the search input
  };

  return (
    <Container >
      <Row>
        <Col md={12}>
          <Heading />
        </Col>
      </Row>

      <Row>
     

<SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
        />
      </Row>

      <Row>
        <SortComponent onSortOrderChange={handleSortOrderChange} sortOrder={sortOrder} />
      </Row>
      <Row>
        <Col md={4}>
          <RestaurantList onRestaurantSelect={setSelectedRestaurantId} sortOrder={sortOrder} searchTerm={searchTerm} />


        </Col>
        <Col md={8}>
          {selectedRestaurantId && (
            <>
              <RestaurantDetails restaurantId={selectedRestaurantId} />
              <BookTable restaurantId={selectedRestaurantId} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
