// Drinks.test.js
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Drinks from "./Drinks";

test("renders loading state initially", () => {
  render(
    <BrowserRouter>
      <Drinks />
    </BrowserRouter>
  );

  // Check for the loading text
  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
});

test("renders no cocktails found message when no results", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ drinks: null }),
    })
  );

  render(
    <BrowserRouter>
      <Drinks />
    </BrowserRouter>
  );

  // Wait for the "no cocktails" message
  const noCocktailsMessage = await screen.findByText(/no cocktails found/i);
  expect(noCocktailsMessage).toBeInTheDocument();
});

test("renders cocktail cards when data is fetched", async () => {
  const mockData = {
    drinks: [
      {
        idDrink: "12345",
        strDrink: "Margarita",
        strDrinkThumb: "https://example.com/margarita.jpg",
        strCategory: "Cocktail",
      },
    ],
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );

  render(
    <BrowserRouter>
      <Drinks />
    </BrowserRouter>
  );

  // Wait for the cocktail card to appear
  const cocktailName = await screen.findByText(/margarita/i);
  expect(cocktailName).toBeInTheDocument();

  const cocktailImage = screen.getByAltText("");
  expect(cocktailImage).toHaveAttribute("src", "https://example.com/margarita.jpg");
});
