import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Axios from "axios";
import "./FoodTrivia.css";

export default function FoodJoke() {
    const [trivia, setTrivia] = useState("...loading next food trivia");
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
            const response = await Axios.get(`https://api.spoonacular.com/food/trivia/random?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`);
            setTrivia(String.raw`${response.data.text}`);
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
            <div className="container mt-5 text-center fctn">
                {error && <div className="alert alert-danger w-auto m-auto text-center" role="alert">{error}</div>}
                {!error && <>
                    <h3>Food Trivia</h3>
                    <div id="joke" className="joke">
                        {renderTextWithNewlines(trivia)}
                    </div>
                    <button id="triviaBtn" className="tbtn mt-4" onClick={generateJoke}>
                        Get Another Food Trivia
                    </button>
                </>}
            </div>

        </>
    );
}
