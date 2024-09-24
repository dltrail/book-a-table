import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  test("renders restaurant list with dynamic restaurant name and description", () => {
    render(<Loading/>);
  
    const LoadingSpinner = screen.getByRole("status");
    expect(LoadingSpinner).toBeInTheDocument();
  });
});
