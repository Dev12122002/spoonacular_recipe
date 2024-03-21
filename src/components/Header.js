import React from 'react'
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import AuthService from "../services/auth.service";
import "./Header.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Header(props) {

    // const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    // const location = useLocation();
    // const navigate = useNavigate();


    return (
        <Container>
            <div className="Header px-4" style={{ height: "80px" }}>
                <div className="AppName">
                    <img src="/images/recipe_logo.png" alt="logo" width={"55px"} height={"55px"} />
                    <div className="mx-2">Recipe App</div>
                </div>

                <div className="navbar">
                    <Link to="/" className='m-auto'>Home</Link>
                    {/* {loggedin && <Link to="/Disease/AddDisease">Add Disease</Link>}
                    {loggedin ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>} */}
                </div>

                <div className="SearchBox">
                    <img src="/images/search-icon.svg" alt="search" className="SearchIcon" />
                    <input
                        placeholder="Search Recipe or Ingrediants..."
                        value={props.searchQuery}
                        onChange={props.onTextChange}
                        className="SearchInput"
                    />
                    <img src="/images/close.png" alt="close" onClick={props.clearSearch} className="CloseIcon" />
                </div>
            </div>
        </Container >
    )

}
