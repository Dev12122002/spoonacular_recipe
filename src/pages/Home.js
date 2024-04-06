import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled, { keyframes } from "styled-components";
import RecipeComponent from "../components/RecipeComponent";
// import { Link } from "react-router-dom";
// import AuthService from "../services/auth.service";
import "./Home.css"
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const RecipeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 80%;
  animation: ${rotate} 4s linear infinite; 
  z-index: -1!important;
`;

function Home() {

    const [searchQuery, updateSearchQuery] = useState("");
    const [loadMore, updateLoadMore] = useState(false);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [RecipeList, updateRecipeList] = useState([]);
    const [filteredRecipeList, updateFilteredRecipeList] = useState([]);
    const [categoryRecipeList, updateCategoryRecipeList] = useState([]);
    const [error, updateError] = useState(null);
    const [timeoutId, updateTimeoutId] = useState();

    const navigate = useNavigate();

    const changeCategory = (category) => {
        updateRecipeList([]);
        updateCategoryRecipeList([]);
        setCategory(category)
    }

    // Function to filter unique items based on ID
    const filterUniqueItems = (apiResponse) => {
        const uniqueIds = new Set(); // Set to track unique IDs
        return apiResponse.filter(item => {
            if (!uniqueIds.has(item.id)) {
                uniqueIds.add(item.id); // Add ID to set
                return true; // Keep the item in the filtered array
            }
            return false; // Discard the item
        });
    };

    const fetchData = async (searchString) => {

        const pageSize = 12;
        try {
            if (searchString === "") {
                let response;
                if (category === "") {
                    response = await Axios.get(`https://api.spoonacular.com/recipes/random?number=${pageSize}&offset=${(page - 1) * pageSize}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
                    updateRecipeList(filterUniqueItems(RecipeList.concat(response.data.recipes)));
                }
                else {
                    response = await Axios.get(`https://api.spoonacular.com/recipes/search?cuisine=${category}&number=${pageSize}&offset=${(page - 1) * pageSize}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);

                    let ids = "";
                    response.data.results.forEach(async (recipe) => {
                        ids = ids + recipe.id + ",";
                    });
                    ids = ids.slice(0, -1);
                    response = await Axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);

                    updateCategoryRecipeList(filterUniqueItems(categoryRecipeList.concat(response.data)));

                }


            } else {

                if (categoryRecipeList.length) {
                    updateFilteredRecipeList(categoryRecipeList.filter(recipe =>
                        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.extendedIngredients.some(ingredient =>
                            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    ));
                }
                else {
                    updateFilteredRecipeList(RecipeList.filter(recipe =>
                        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        recipe.extendedIngredients.some(ingredient =>
                            ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                    ));
                }

            }
            updateLoadMore(false);
        }
        catch (error) {
            updateError(error.message);
        }

    };

    useEffect(() => {
        updateRecipeList([]);
        fetchData("");
        // eslint-disable-next-line
    }, [category])

    const goToRecipeDetails = (recipe) => {
        navigate('/RecipeDetails', { state: recipe });
    };

    const clearSearch = () => {
        updateSearchQuery("");
        updateFilteredRecipeList([]);
    }

    const onTextChange = (e) => {
        // onDiseaseSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        if (e.target.value !== "") {
            const timeout = setTimeout(() => fetchData(e.target.value), 100);
            updateTimeoutId(timeout);
        }
        else {
            updateFilteredRecipeList([]);
        }
    };
    return (
        <Container>
            <Header category={true} searchQuery={searchQuery} onTextChange={onTextChange} clearSearch={clearSearch} setCategory={changeCategory} />

            <RecipeContainer className="rcontainer" style={{ marginTop: "10px" }}>
                {filteredRecipeList?.length ? filteredRecipeList.map((Recipe, index) => (
                    <RecipeComponent
                        key={Recipe.id}
                        Recipe={Recipe}
                        goToRecipeDetails={goToRecipeDetails}
                    />
                )) :
                    searchQuery === "" ? (
                        categoryRecipeList?.length ? categoryRecipeList.map((Recipe, index) => (
                            <RecipeComponent
                                key={Recipe.id}
                                Recipe={Recipe}
                                goToRecipeDetails={goToRecipeDetails}
                            />
                        )) :
                            RecipeList?.length ?
                                RecipeList.map((Recipe, index) => (
                                    <RecipeComponent
                                        key={Recipe.id}
                                        Recipe={Recipe}
                                        goToRecipeDetails={goToRecipeDetails}
                                    />
                                )) : <Placeholder src={"images/recipe_loading1.png"} />)
                        : <Placeholder src="images/recipe_loading.png" />}
            </RecipeContainer>
            {error && <div className="alert alert-danger w-auto m-auto text-center" role="alert">{error}</div>}
            {loadMore && <img className="m-auto" style={{ position: "relative", bottom: "70px" }} src="images/loading.gif" alt="Loading..." height={"140px"} width={"140px"}></img>}
            {((!loadMore && RecipeList.length === 0 && !filteredRecipeList.length === 0 && searchQuery === "") || (!loadMore && categoryRecipeList.length === 0 && !filteredRecipeList.length === 0 && searchQuery === "")) && <button className="btn btn-success m-auto mb-2" onClick={() => { setPage(pageCnt => pageCnt + 1); updateLoadMore(true); fetchData(""); }} style={{ width: "auto" }}>Load More</button>}
        </Container>
    );
}

export default Home;