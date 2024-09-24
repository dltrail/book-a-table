import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders restaurant list with dynamic restaurant name and description", () => {
    render(<App />);
  
    const restaurantName = screen.getByRole("heading", {
      level: 2,
      name: /Restaurants/i,
    });
    expect(restaurantName).toBeInTheDocument();
  });
});
