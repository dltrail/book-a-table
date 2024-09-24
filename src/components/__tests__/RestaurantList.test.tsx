import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RestaurantList from "../RestaurantList"; // Path to your component file

const mockResponse = {
  json: jest.fn().mockResolvedValue([
    { id: 1, name: "Restaurant 1" },
    { id: 2, name: "Restaurant 2" },
  ]),
  ok: true,
  status: 200,
  statusText: "OK",
  headers: new Headers(),
  redirected: false,
  type: "basic",
  url: "http://localhost/api/restaurants",
};

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue(mockResponse) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks(); // Clean up mocks after each test
});

test("renders loading state initially", () => {
  render(<RestaurantList onRestaurantSelect={function (id: number): void {
    throw new Error("Function not implemented.");
  } } />);
  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

test("renders error message when fetch fails", async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject("API is down"));

  render(<RestaurantList onRestaurantSelect={function (id: number): void {
    throw new Error("Function not implemented.");
  } } />);
  
  // Wait for the error state to be rendered
  await screen.findByText(/There was a problem fetching the restaurants:/i);
});
