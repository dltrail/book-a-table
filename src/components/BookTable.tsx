import React, { useCallback, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Button } from "@dltrail/gs-frontend-toolkit";
import { validateFormData } from "../utils/validationHelpers";
interface BookTableProps {
  restaurantId: number;
}

const BookTable: React.FC<BookTableProps> = ({restaurantId}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 0,
    restaurant: restaurantId
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  useEffect(() => {

    setFormData((prevData) => ({
      ...prevData,
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 0,
      restaurant: restaurantId
    }));
    setErrorMessage(null);
    setIsBookingSuccessful(false);
  }, [restaurantId]);


  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrorMessage(null);

    const error = validateFormData(formData);
    if (error) return setErrorMessage(error);

    try {
      const response = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Booking failed");

      console.log("Booking successful");
      setIsBookingSuccessful(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 0,
        restaurant: restaurantId
      });
    } catch (err) {
      console.log(err);
      setErrorMessage("An error occurred while processing your booking. Please try again.");
    }
  };

  return (
    <Container>
      <h2 className="text-2xl mb-4">Book a Table</h2>
      {/* Conditionally render error message */}
      {errorMessage && <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>}

      {/* Conditionally render the success message */}
      {isBookingSuccessful && (
        <div className="alert alert-success" role="alert">
        Your booking was successful!
      </div>
      )}

      <Form onSubmit={handleSubmit} className="w-[320px]">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3"
        >
          <Form.Label>Phone</Form.Label>
          <Form.Control type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3"
        >
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3"
        >
          <Form.Label>Time</Form.Label>
          <Form.Control type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3"
        >
          <Form.Label>Guests</Form.Label>
          <Form.Control type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange} />
        </Form.Group>

        <Button type="submit" variation={"filled"}>
          Book now
        </Button>
      </Form>
    </Container>
  );
};

export default BookTable;
