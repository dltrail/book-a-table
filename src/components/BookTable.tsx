import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface BookTableProps {
  restaurantId: number; // Prop for the restaurant ID
}

const BookTable: React.FC<BookTableProps> = (restaurantId) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    restaurant: restaurantId

  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  useEffect(() => {
    // Reset form fields, error message, and booking status when restaurantId changes
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      restaurant: restaurantId
    });
    setErrorMessage(null);
    setIsBookingSuccessful(false);
    // Optionally, fetch any data related to the new restaurant here
  }, [restaurantId]); // Trigger this effect when restaurantId changes


  // Update formData when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Basic phone number validation
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^[0-9]{7,15}$/; // Allows 7 to 15 digits
    return phoneRegex.test(phone);
  };

  const validateFormData = (data: { name: any; email: any; phone: any; date: any; time: any; guests: any; }) => {
    const { name, email, phone, date, time, guests } = data;
       const bookingDateTime = new Date(`${date}T${time}`);
    const currentTime = new Date();
    const oneHourInMillis = 60 * 60 * 1000;
    if (!name || !email || !phone) return "Please fill out all required fields.";
    if (!isValidEmail(email)) return "Please enter a valid email.";
    if (!isValidPhone(phone)) return "Please enter a valid phone number.";
    if (!date || !time) return "Please select a valid date and time.";
    if (parseInt(guests) > 12) return `Bookings are limited to 12people.`;
  
    if (bookingDateTime.getTime() < currentTime.getTime() + oneHourInMillis) {
       return "Bookings must be scheduled at least 1 hour in the future."
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsBookingSuccessful(false);
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
      setErrorMessage(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        restaurant: restaurantId
      });
    } catch (err) {
      console.log(err);
      setErrorMessage("An error occurred while processing your booking. Please try again.");
    } finally {
      console.log("Completed request");
    }
  };

  return (
    <Container>
      <h2>Book a Table</h2>
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
          <Form.Control type="email"
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* Conditionally render error message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Conditionally render the success message */}
      {isBookingSuccessful && (
        <div className="success-message">
          <p>Your booking was successful!</p>
        </div>
      )}
    </Container>
  );
};

export default BookTable;
