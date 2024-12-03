import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../context/AuthContext"; // Import the context
import LoginRegister from "./LoginRegister";

const mockLogin = jest.fn();
const mockRegister = jest.fn();

describe("LoginRegister Component", () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider
        value={{
          login: mockLogin,
          register: mockRegister,
          error: null,
        }}
      >
        <LoginRegister />
      </AuthContext.Provider>
    );
  });

  it("renders Login tab by default", () => {
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
  });

  it("switches to Register tab when clicked", () => {
    const registerTab = screen.getByText(/Register/i);
    fireEvent.click(registerTab);
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
  });

  it("calls login function with correct data", () => {
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const submitButton = screen.getByText(/Login/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith("testuser", "password123");
  });

  it("calls register function with correct data", () => {
    fireEvent.click(screen.getByText(/Register/i)); // Switch to Register tab

    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
    const submitButton = screen.getByText(/Register/i);

    fireEvent.change(nameInput, { target: { value: "Test User" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockRegister).toHaveBeenCalledWith("Test User", "testuser", "password123");
  });

  it("shows error message when passwords do not match during registration", () => {
    fireEvent.click(screen.getByText(/Register/i)); // Switch to Register tab

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm your password/i);
    const submitButton = screen.getByText(/Register/i);

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Passwords do not match!/i)).toBeInTheDocument();
    expect(mockRegister).not.toHaveBeenCalled();
  });
});
