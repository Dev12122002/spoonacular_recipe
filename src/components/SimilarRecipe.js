import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./SimilarRecipe.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SimilarRecipe({ recipe, rid, scrollToTop }) {

    const [similarRecipeList, updateSimilarRecipeList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    var settings = {
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1020,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    focusOnSelect: false,
                }
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const fetchSimilarRecipe = async () => {
        setLoading(true);
        try {

            let response = await Axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/similar?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);

            let ids = "";
            response.data.forEach(async (recipe) => {
                ids = ids + recipe.id + ",";
            });
            ids = ids.slice(0, -1);
            response = await Axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);

            updateSimilarRecipeList(response.data);

        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    const goToRecipeDetails = (recipe) => {
        navigate('/RecipeDetails', { state: recipe });
    };

    const handleImageError = (event) => {
        event.target.src = "/images/recipe_logo.png"; // Set the source of the image to the default image
        console.error("Image not found");
    };

    useEffect(() => {
        fetchSimilarRecipe();
        // eslint-disable-next-line
    }, [rid]);

    return (
        <>

            {loading ? <div className="d-flex justify-content-center"><img className="m-auto" src={"images/loading.gif"} width={"200px"} height={"200px"} alt="Loading Similar..." /></div>
                :
                error ?
                    <div className="container w-50">
                        < div className="alert alert-danger mt-3 m-auto text-center w-100" role="alert">{error}</div >
                    </div >
                    :
                    similarRecipeList.length > 0 ? <Slider {...settings} className="slider mx-auto mt-2">
                        {similarRecipeList.map((Recipe, index) => (

                            <div className="scard" key={index}>
                                <img src={Recipe.image} alt="Similar Recipe" onError={handleImageError} />
                                <div className="info">
                                    <h1>{Recipe.title}</h1>

                                    <button className="mt-2" onClick={() => { goToRecipeDetails(Recipe); }}>Read More</button>
                                </div>
                            </div>

                        ))}

                    </Slider> : <h3>No similar recipe found</h3>
            }

        </>

    );
}