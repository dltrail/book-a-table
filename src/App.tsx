import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RestaurantDetails from "./components/RestaurantDetails";
import BookTable from "./components/BookTable";
import Heading from "./components/Heading";
import SearchBar from "./components/SearchBar";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);

  const [searchTerm, setSearchTerm] = useState(''); 

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
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
      </Row>
      <Row>
        <Col md={4}>
          <RestaurantList onRestaurantSelect={setSelectedRestaurantId} searchTerm={searchTerm} />

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
};


export default App;
