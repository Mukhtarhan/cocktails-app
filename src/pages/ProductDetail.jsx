import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthProvider context
import './css/ProductDetail.css';

const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`;

const ProductDetail = () => {
    const { idDrink } = useParams();
    const { user, setUser } = useAuth(); // Get user and setUser from AuthProvider
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(url + idDrink);
            const { drinks } = await response.json();
            setProduct(drinks[0]);
        };

        fetchProduct();
    }, [idDrink]);

    // Memoize `isFavorite` calculation
    const isFavorite = useMemo(() => {
        return user && product && user.cocktails.some((c) => c.idDrink === product.idDrink);
    }, [user, product]);

    const toggleFavorite = async () => {
        if (!user) {
            alert('You need to log in to your account');
            return;
        } // Ensure user is logged in

        const updatedCocktails = isFavorite
            ? user.cocktails.filter((c) => c.idDrink !== product.idDrink) // Remove favorite
            : [...user.cocktails, { idDrink: product.idDrink, name: product.strDrink, image: product.strDrinkThumb, strCategory: product.strCategory }]; // Add favorite

        const updatedUser = { ...user, cocktails: updatedCocktails };
        setUser(updatedUser);

        try {
            // Update user data on the server
            await fetch(`https://67415a25e4647499008d72f6.mockapi.io/api/v1/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUser),
            });
        } catch (err) {
            console.error("Failed to update user data:", err);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="drink">
                <div className="favorite-icon" onClick={toggleFavorite}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFavorite ? "red" : "white"}
                        className="size-6 heart-icon"
                    >
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>
                <div className="flex-container">
                    <img
                        src={product.strDrinkThumb}
                        className="cocktail-img"
                        alt={product.strDrink}
                    />

                    <div className="cocktail-infos">
                        <div className="row">
                            <h3 className="label">Name:</h3>
                            <p className="text">{product.strDrink}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Category:</h3>
                            <p className="text">{product.strCategory}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Info:</h3>
                            <p className="text">{product.strAlcoholic}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Instructions:</h3>
                            <p className="text">{product.strInstructions}</p>
                        </div>
                        <div className="row">
                            <h3 className="label">Glass:</h3>
                            <p className="text">{product.strGlass}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
