import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // State to handle errors
    const navigate = useNavigate();

    const login = (username, password) => {
        if (username === 'test' && password === 'test') {
            setUser(username); // Simulate successful login
            setError(null); // Clear any previous error
            navigate('/');
        } else {
            setError('Invalid username or password'); // Set an error if credentials are wrong
        }
    };

    const logout = () => {
        setUser(null); // Simulate logging out
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
