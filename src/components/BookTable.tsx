import React, { useCallback, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Button } from "@dltrail/gs-frontend-toolkit";
import { validateFormData } from "../utils/validationHelpers";
interface BookTableProps {
  restaurantId: number;
}

/* 
Destructure prop correctly using {} instead of as a single argument to avoid performance issues
If you pass the entire props object as a single parameter, React has to check the entire object for changes, which can be less efficient than checking specific values. By destructuring, you make it clear which props your component uses, potentially optimizing re-renders
Improves readibility and maintainabilty
*/
const BookTable: React.FC<BookTableProps> = ({restaurantId}) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 0, // This should not be a string!!! you shouldn't have to use parseInt
    restaurant: restaurantId
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

  useEffect(() => {
    // Reset form fields, error message, and booking status when restaurantId changes
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


  // Update formData when input changes
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

 /*
 Move validation functions to a new file to improve perframce and organisation within the codebase. This way, these functions won't have to be recreated everytime the component renders as they won't be defined in it scope anymore
*/

  // Basic email validation
  // const isValidEmail = useCallback((email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }, []);

  // Basic phone number validation
  // const isValidPhone = (phone: string) => {
  //   const phoneRegex = /^[0-9]{7,15}$/; // Allows 7 to 15 digits
  //   return phoneRegex.test(phone);
  // };

  // const validateFormData = (data: { name: any; email: any; phone: any; date: any; time: any; guests: any; }) => {
  //   const { name, email, phone, date, time, guests } = data;
  //   const bookingDateTime = new Date(`${date}T${time}`);
  //   const currentTime = new Date();
  //   const oneHourInMillis = 60 * 60 * 1000;
  //   if (!name || !email || !phone) return "Please fill out all required fields.";
  //   if (!isValidEmail(email)) return "Please enter a valid email.";
  //   if (!isValidPhone(phone)) return "Please enter a valid phone number.";
  //   if (!date || !time) return "Please select a valid date and time.";
  //   if (parseInt(guests) > 12) return `Bookings are limited to 12people.`;

  //   if (bookingDateTime.getTime() < currentTime.getTime() + oneHourInMillis) {
  //     return "Bookings must be scheduled at least 1 hour in the future.";
  //   }
  //   return null;
  // };

  /* Batch state updates below */

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
    } finally {
      console.log("Completed request");
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
