import React, { useEffect, useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import RecipeComponent from "../components/RecipeComponent";
import DiseaseInfoComponent from "../components/DiseaseInfoComponent";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./Home.css"

export const API_KEY = "a9118a3a";

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
  opacity: 50%;
`;

function Home() {
    const [searchQuery, updateSearchQuery] = useState("");
    const [loadMore, updateLoadMore] = useState(false);

    const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    const [RecipeList, updateRecipeList] = useState([]);
    const [filteredRecipeList, updateFilteredRecipeList] = useState([]);
    const [selectedDisease, onDiseaseSelect] = useState();

    const [timeoutId, updateTimeoutId] = useState();

    const fetchData = async (searchString) => {
        if (searchString === "") {
            const response = await Axios.get(`https://api.spoonacular.com/recipes/random?number=12&apiKey=9240baeabb4b4dd8aadcd48965ade114
`);
            console.log(RecipeList.concat(await response.data.recipes));

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

    };

    useEffect(() => {
        fetchData("");
    }, [])

    const clearSearch = () => {
        updateSearchQuery("");
        updateFilteredRecipeList([]);
    }

    const onTextChange = (e) => {
        onDiseaseSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        if (e.target.value !== "") {
            console.log("searchQuery is empty");
            const timeout = setTimeout(() => fetchData(e.target.value), 100);
            updateTimeoutId(timeout);
        }
        else {
            updateFilteredRecipeList([]);
        }
    };
    return (
        <Container>
            <div className="Header">
                <div className="AppName">
                    <img src="/react-Disease-app/virus.png" />
                    Recipe App
                </div>

                <div className="navbar">
                    <Link to="/">Home</Link>
                    {loggedin && <Link to="/Disease/AddDisease">Add Disease</Link>}
                    {loggedin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                </div>

                <div className="SearchBox">
                    <img src="/react-Disease-app/search-icon.svg" className="SearchIcon" />
                    <input
                        placeholder="Search Recipe or Ingrediants..."
                        value={searchQuery}
                        onChange={onTextChange}
                        className="SearchInput"
                    />
                    <img src="/react-Disease-app/close.png" onClick={clearSearch} className="CloseIcon" style={{marginLeft: '0'}} />
                </div>
            </div>
            {selectedDisease && <DiseaseInfoComponent selectedDisease={selectedDisease} onDiseaseSelect={onDiseaseSelect} />}
            <RecipeContainer>
                {filteredRecipeList?.length ? filteredRecipeList.map((Recipe, index) => (
                    <RecipeComponent
                        key={index}
                        Recipe={Recipe}
                        onDiseaseSelect={onDiseaseSelect}
                    />
                )) :
                    searchQuery === "" ? (
                        RecipeList?.length ?
                            RecipeList.map((Recipe, index) => (
                                <RecipeComponent
                                    key={index}
                                    Recipe={Recipe}
                                    onDiseaseSelect={onDiseaseSelect}
                                />
                            )) : <Placeholder src="/react-Disease-app/virus.png" />)
                        : <Placeholder src="/react-Disease-app/virus.png" />}
            </RecipeContainer>
            {loadMore && <img className="m-auto" style={{ position: "relative", bottom: "70px" }} src="react-Disease-app/loading.gif" height={"140px"} width={"140px"}></img>}
            {!loadMore && RecipeList.length && !filteredRecipeList.length && searchQuery === "" && <button className="btn btn-secondary m-auto mb-2" onClick={() => { updateLoadMore(true); fetchData(""); }} style={{ width: "10%" }}>Load More</button>}
        </Container>
    );
}

export default Home;