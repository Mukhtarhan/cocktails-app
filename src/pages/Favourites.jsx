import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path to your AuthProvider
import './css/Drinks.css'; // Reuse the Drinks.css styles

const Favourites = () => {
    const { user } = useAuth(); // Access the user from AuthProvider

    if (!user) {
        return (
            <div className="container">
                <h2>You need to log in to your account</h2>
            </div>
        );
    }

    const { cocktails } = user;
    console.log(cocktails)
    return (
        <div className="container">
            <div className="cocktails-container">
                {cocktails && cocktails.length > 0 ? (
                    cocktails.map((cocktail) => (
                        <div className="cocktail-card" key={cocktail.idDrink}>
                            <img
                                src={cocktail.image}
                                alt={cocktail.name}
                                className="cocktail-img"
                            />

                            <div className="cocktail-info">
                                <div className="content-text">
                                    <h2 className="cocktail-name">{cocktail.name}</h2>
                                    <span className="cocktail-info">{cocktail.strCategory}</span>
                                </div>
                                <Link to={`/drinks/${cocktail.idDrink}`}>
                                    <div className="btn">View Details</div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You haven't added any cocktails to your favourites yet.</p>
                )}
            </div>
        </div>
    );
};

export default Favourites;
