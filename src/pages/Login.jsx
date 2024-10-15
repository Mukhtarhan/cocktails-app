import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './css/Login.css';  // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);

        console.log(e)

    
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Login;
