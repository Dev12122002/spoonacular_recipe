import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import "./RecipeDetails.css"
import { useNavigate } from 'react-router-dom';
import SimilarRecipe from '../components/SimilarRecipe';

export default function RecipeDetails() {
    const [isScrollBtnVisible, setIsScrollBtnVisible] = useState(false);
    const scrollableDivRef = useRef(null);

    const location = useLocation(); // Use useLocation hook to get location state
    const recipe = location.state; // Access recipe from location state
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo(0, 0);
        if (scrollableDivRef.current) {
            // scrollableDivRef.current.scrollTop = 0;
            scrollableDivRef.current.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scrolling behavior
            });
        }
    };

    // Function to handle scroll event and toggle visibility of the arrow
    const handleScroll = () => {
        const scrollTop = scrollableDivRef.current.scrollTop;
        if (scrollTop > 300) { // Adjust this threshold as needed
            setIsScrollBtnVisible(true);
        } else {
            setIsScrollBtnVisible(false);
        }
    };

    useEffect(() => {
        if (recipe === null) {
            navigate('/');
        }
        window.scrollTo(0, 0);
        scrollToTop();
        scrollableDivRef.current.addEventListener('scroll', handleScroll);

    }, [navigate, recipe]);

    const handleImageError = (event) => {
        event.target.src = "/images/recipe_logo.png"; // Set the source of the image to the default image
        console.error("Image not found");
    };

    return (
        <>
            <Header category={false} />
            <div className={`floating-arrow ${isScrollBtnVisible ? 'visible' : ''}`} onClick={scrollToTop}>
                <img src="/images/up.svg" alt="menu" />
            </div>
            {recipe && <div className="container mt-3 ctn">
                <div className="card" ref={scrollableDivRef}>
                    <div className="card-body">
                        <h3 className="card-title mt-3">{recipe.title}</h3>
                        <h6 className="card-subtitle">{recipe.creditsText}</h6>
                        <div className="row mt-5">
                            <div className="col-12 white-parent">
                                <div className="white-box text-center"><img src={recipe.image + ""} style={{ objectFit: "contain", height: "300px" }} onError={handleImageError} alt={recipe.title} className="img-responsive" /></div>
                            </div>
                            <div className="col-12 px-5 mt-5">
                                <h4 className="box-title text-center">Recipe description</h4>
                                <p className='r-desc mt-4' dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                            </div>
                            <div className="col-12 px-5 mt-5">
                                <h4 className="box-title text-center">Instructions</h4>
                                <p className='r-desc mt-4' dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
                            </div>


                            <div className="col-md-6 col-sm-12 p-5">
                                <h4 className="box-title text-center mb-4">Ingredients</h4>
                                {recipe.extendedIngredients.map((Ingrediant, index) => (
                                    <p className='r-desc text-center' key={index}>{Ingrediant.original}</p>
                                ))}
                            </div>

                            <div className="col-md-6 col-sm-12 p-5">
                                <h4 className="box-title text-center mb-4">Dish Type</h4>
                                {recipe.dishTypes.map((dtype, index) => (
                                    <p className='r-desc text-center' key={index}>{dtype}</p>
                                ))}
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <h3 className="box-title mt-5">General Info</h3>
                                <div className="table-responsive mt-4">
                                    <table className="table table-striped table-product">
                                        <tbody>
                                            <tr>
                                                <td width="390">Dairy Free</td>
                                                <td>{recipe.dairyFree ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Gluten Free</td>
                                                <td>{recipe.glutenFree ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Health Score</td>
                                                <td>{recipe.healthScore}</td>
                                            </tr>
                                            <tr>
                                                <td>Cooking Time</td>
                                                <td>{recipe.readyInMinutes} Minutes</td>
                                            </tr>
                                            <tr>
                                                <td>Sustainable</td>
                                                <td>{recipe.sustainable ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Vegan</td>
                                                <td>{recipe.vegan ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Vegetarian</td>
                                                <td>{recipe.vegetarian ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Healthy</td>
                                                <td>{recipe.veryHealthy ? "Yes" : "No"}</td>
                                            </tr>
                                            <tr>
                                                <td>Popular</td>
                                                <td>{recipe.veryPopular ? "Yes" : "No"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            }

            <h2 className="card-title mt-5 text-center" style={{ opacity: "0.8" }}>Similar Recipies</h2>
            <SimilarRecipe scrollToTop={scrollToTop} className="mt-5" recipe={recipe} rid={recipe.id} />

            <div className='mb-2 demo'>S
                none
            </div>

        </>
    )
}
