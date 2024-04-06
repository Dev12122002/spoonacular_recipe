import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Axios from "axios";
import "./FoodJoke.css";

export default function FoodJoke() {
    const [joke, setJoke] = useState("...loading next joke");
    const [error, setError] = useState(null);

    const renderTextWithNewlines = (text) => {
        return text.split(/\n|\\/).map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const generateJoke = async () => {
        try {
            const response = await Axios.get(`https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
            setJoke(String.raw`${response.data.text}`);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        generateJoke();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5 fctn">
                {error && <div className="alert alert-danger w-auto m-auto text-center" role="alert">{error}</div>}
                {!error && <>
                    <h3>Don't Laugh Challenge</h3>
                    <div id="joke" className="joke">
                        {renderTextWithNewlines(joke)}
                    </div>
                    <button id="jokeBtn" className="jbtn mt-4" onClick={generateJoke}>
                        Get Another Joke
                    </button>
                </>}
            </div>

        </>
    );
}
