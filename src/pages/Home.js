import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
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
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 80%;
`;

function Home() {

    const [searchQuery, updateSearchQuery] = useState("");
    const [loadMore, updateLoadMore] = useState(false);

    // const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    const [RecipeList, updateRecipeList] = useState([]);
    const [filteredRecipeList, updateFilteredRecipeList] = useState([]);
    const [error, updateError] = useState(null);
    // const [selectedDisease, onDiseaseSelect] = useState();

    const [timeoutId, updateTimeoutId] = useState();

    const navigate = useNavigate();

    const fetchData = async (searchString) => {
        try {
            if (searchString === "") {
                const response = await Axios.get(`https://api.spoonacular.com/recipes/random?number=12&apiKey=${process.env.REACT_APP_API_KEY}`);
                // console.log(RecipeList.concat(await response.data.recipes));

                updateRecipeList(RecipeList.concat(response.data.recipes));
            } else {
                updateFilteredRecipeList(RecipeList.filter(recipe =>
                    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    recipe.extendedIngredients.some(ingredient =>
                        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                ));

            }
            updateLoadMore(false);
        }
        catch (error) {
            updateError(error.message);
        }

    };

    useEffect(() => {
        fetchData("");
    }, [])

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
            <Header searchQuery={searchQuery} onTextChange={onTextChange} clearSearch={clearSearch} />
            {/* {selectedDisease && <DiseaseInfoComponent selectedDisease={selectedDisease} onDiseaseSelect={onDiseaseSelect} />} */}
            <RecipeContainer style={{ marginTop: "70px" }}>
                {filteredRecipeList?.length ? filteredRecipeList.map((Recipe, index) => (
                    <RecipeComponent
                        key={Recipe.id}
                        Recipe={Recipe}
                        goToRecipeDetails={goToRecipeDetails}
                    />
                )) :
                    searchQuery === "" ? (
                        RecipeList?.length ?
                            RecipeList.map((Recipe, index) => (
                                <RecipeComponent
                                    key={Recipe.id}
                                    Recipe={Recipe}
                                    goToRecipeDetails={goToRecipeDetails}
                                />
                            )) : <Placeholder src="/images/Recipe_loading1.png" />)
                        : <Placeholder src="/images/Recipe_loading.png" />}
            </RecipeContainer>
            {error && <div className="alert alert-danger w-25 m-auto text-center" role="alert">{error}</div>}
            {loadMore && <img className="m-auto" style={{ position: "relative", bottom: "70px" }} src="images/loading.gif" alt="Loading..." height={"140px"} width={"140px"}></img>}
            {!loadMore && RecipeList.length && !filteredRecipeList.length && searchQuery === "" && <button className="btn btn-success m-auto mb-2" onClick={() => { updateLoadMore(true); fetchData(""); }} style={{ width: "auto" }}>Load More</button>}
        </Container>
    );
}

export default Home;