import { NavLink } from "react-router-dom"
import './NavBar.css'

import { useAuth } from '../context/AuthContext'; // Assuming you saved AuthContext.js in the 'context' folder

const NavBar = () => {
    const { user, logout } = useAuth();
    return(
        <div>
            <nav>
                <div className="nav-items container">
                    <div className="logo">
                        <a href="/"><h1>Cocktails</h1></a>
                    </div>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/drinks'>Drinks</NavLink></li>
                        <li><NavLink to='/search'>Search</NavLink></li>
                        <li><NavLink to='/random'>Random Drink</NavLink></li>
                        {user ? (
                    <>
                        <li onClick={logout}><NavLink>Logout</NavLink></li>
                    </>
                ) : (
                    <li><NavLink to="/login">Login</NavLink></li>
                )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar