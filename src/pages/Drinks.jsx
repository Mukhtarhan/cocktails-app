import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './css/Drinks.css';

const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const Drinks = () => {
    const [cocktails, setCocktails] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    // Extract the search term from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || 'm'; // Default to 'm'

    // Fetch cocktails based on the search term
    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}${searchTerm}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const drinks = await response.json();
                setCocktails(drinks.drinks || []); // Set empty array if no drinks are found
            } catch (error) {
                console.error('Error fetching drinks:', error);
                setCocktails([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCocktails();
    }, [searchTerm]);

    return (
        <div className="container">
            <div className="cocktails-container">
                {loading ? (
                    <p>Loading...</p>
                ) : cocktails.length > 0 ? (
                    cocktails.map((cocktail) => (
                        <div className="cocktail-card" key={cocktail.idDrink}>
                            <img src={cocktail.strDrinkThumb} alt="" />

                            <div className="cocktail-info">
                                <div className="content-text">
                                    <h2 className="cocktail-name">{cocktail.strDrink}</h2>
                                    <span className="cocktail-info">{cocktail.strCategory}</span>
                                </div>
                                <Link to={`/drinks/${cocktail.idDrink}`}>
                                    <div className="btn">View Details</div>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cocktails found. Try another search term!</p>
                )}
            </div>
        </div>
    );
};

export default Drinks;
