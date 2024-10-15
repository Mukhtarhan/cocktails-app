import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/Drinks.css'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=m';

const Drinks = () => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const drinks = await response.json();
                console.log(drinks);

                setCocktails(drinks.drinks);
            } catch (error) {
                console.error('Error fetching drinks:', error);
            }
        };

        fetchCocktails();
    }, []);

    return (
        <div className="container">
            <div className="cocktails-container">
                {cocktails.map((cocktail) => (
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
                ))}
            </div>
        </div>
    );
    
};

export default Drinks;
