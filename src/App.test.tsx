import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

describe("Tests on App Component", () => {
  it('renders a headline that points to "Welcome to the course of React Hooks"', () => {
    const h1Element = screen.getByText("Welcome to the course of React Hooks");
    expect(h1Element).toBeInTheDocument();
  });

  it("Should value is incremented by 1", () => {
    const valueElement = screen.getByTestId("test-value");
    const incrementBtnElement = screen.getByTestId(
      "test-button-increment-value"
    );

    const previousValue = Number(valueElement.textContent?.split(" ")[1]);
    fireEvent.click(incrementBtnElement);
    const nextValue = Number(valueElement.textContent?.split(" ")[1]);
    expect(nextValue - previousValue).toBe(1);
  });
});
