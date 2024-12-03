import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ProductDetail from "./ProductDetail";

const mockProduct = {
  idDrink: "12345",
  strDrink: "Margarita",
  strDrinkThumb: "https://example.com/margarita.jpg",
  strCategory: "Cocktail",
  strAlcoholic: "Alcoholic",
  strInstructions: "Shake all ingredients with ice.",
  strGlass: "Cocktail glass",
};

const mockUser = {
  id: "1",
  name: "Test User",
  cocktails: [],
};

describe("ProductDetail Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("renders loading state initially", async () => {
    fetch.mockResponseOnce(JSON.stringify({ drinks: [mockProduct] }));

    render(
      <AuthContext.Provider value={{ user: null, setUser: jest.fn() }}>
        <MemoryRouter initialEntries={["/drinks/12345"]}>
          <Routes>
            <Route path="/drinks/:idDrink" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("fetches and displays product details", async () => {
    fetch.mockResponseOnce(JSON.stringify({ drinks: [mockProduct] }));

    render(
      <AuthContext.Provider value={{ user: mockUser, setUser: jest.fn() }}>
        <MemoryRouter initialEntries={["/drinks/12345"]}>
          <Routes>
            <Route path="/drinks/:idDrink" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText(/Margarita/i)).toBeInTheDocument());
    expect(screen.getByText(/Cocktail/i)).toBeInTheDocument();
    expect(screen.getByText(/Alcoholic/i)).toBeInTheDocument();
    expect(screen.getByText(/Shake all ingredients with ice./i)).toBeInTheDocument();
    expect(screen.getByAltText(/Margarita/i)).toHaveAttribute("src", mockProduct.strDrinkThumb);
  });

  it("shows alert if user is not logged in and tries to favorite", async () => {
    fetch.mockResponseOnce(JSON.stringify({ drinks: [mockProduct] }));
    window.alert = jest.fn();

    render(
      <AuthContext.Provider value={{ user: null, setUser: jest.fn() }}>
        <MemoryRouter initialEntries={["/drinks/12345"]}>
          <Routes>
            <Route path="/drinks/:idDrink" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText(/Margarita/i)).toBeInTheDocument());

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(window.alert).toHaveBeenCalledWith("You need to log in to your account");
  });

  it("toggles favorite status for logged-in user", async () => {
    const mockSetUser = jest.fn();

    fetch.mockResponseOnce(JSON.stringify({ drinks: [mockProduct] }));
    fetch.mockResponseOnce(JSON.stringify(mockUser)); // Mock PUT request

    render(
      <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <MemoryRouter initialEntries={["/drinks/12345"]}>
          <Routes>
            <Route path="/drinks/:idDrink" element={<ProductDetail />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => expect(screen.getByText(/Margarita/i)).toBeInTheDocument());

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockSetUser).toHaveBeenCalledWith({
      ...mockUser,
      cocktails: [
        {
          idDrink: mockProduct.idDrink,
          name: mockProduct.strDrink,
          image: mockProduct.strDrinkThumb,
          strCategory: mockProduct.strCategory,
        },
      ],
    });
  });
});
