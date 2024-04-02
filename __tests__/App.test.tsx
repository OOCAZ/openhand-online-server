import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../src/app/page";
import React from "react";

jest.mock("axios");

describe("Page", () => {
  it("renders a heading", () => {
    render(<App />);

    const heading = screen.getByText("Welcome to OpenHand!");

    expect(heading).toBeInTheDocument();
  });
  it("has an input box and add a number", async () => {
    render(<App />);

    const input = screen.getByTestId("input-field");
    const addNumber = screen.getByTestId("add-number");

    fireEvent.click(input);
    fireEvent.change(input, "22");
    //added awaits to wait for log statements still need work on this...
    await fireEvent.click(addNumber);
    const addedNumber = screen.getByTestId("added-number");
    await fireEvent.click(addedNumber);
  });
  it("has an input box and remove a number", async () => {
    render(<App />);

    const input = screen.getByTestId("input-field");
    const removeNumber = screen.getByTestId("remove-number");

    fireEvent.click(input);
    fireEvent.change(input, "22");
    await fireEvent.click(removeNumber);
    const removedNumber = screen.getByTestId("removed-number");
    await fireEvent.click(removedNumber);
  });
});
