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
});
