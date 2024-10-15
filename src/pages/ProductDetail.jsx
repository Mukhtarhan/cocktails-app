import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './css/ProductDetail.css'

const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=`

const ProductDetail = () => {

    const {idDrink} = useParams()

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(url + idDrink)
            const {drinks} = await response.json()

            console.log(drinks[0])
            setProduct(drinks[0])
        }

        fetchProduct()
    }, [idDrink])

    return(
        <div className="container">
            <div className="drink">
                <div className="flex-container">
                    <img src={product.strDrinkThumb} className="cocktail-img" alt="" />

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
    )

}

export default ProductDetail