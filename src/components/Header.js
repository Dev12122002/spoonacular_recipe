import React from 'react'
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";
// import AuthService from "../services/auth.service";
import "./Header.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavDropdown } from 'react-bootstrap';


// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export default function Header(props) {

    // const [loggedin, setloggedin] = useState(AuthService.checkLoggedIn());

    // const location = useLocation();
    // const navigate = useNavigate();
    const categories = [
        "African", "Asian", "American", "British", "Cajun", "Caribbean",
        "Chinese", "Eastern European", "European", "French", "German",
        "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
        "Korean", "Latin American", "Mediterranean", "Mexican",
        "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
    ];


    return (
        // <Container>
        <div className="Header container-fluid">
            <div className='row justify-content-between'>
                <div className="AppName column col-lg-4 col-md-4 col-sm-5 col-12">
                    <img src="/images/recipe_logo.png" alt="logo" width={"55px"} height={"55px"} />
                    <div className="mx-2">Recipe App</div>
                </div>

                <div className="mt-1 navbar column col-lg col-md col-sm col mx-4">
                    <div className='row links justify-content-around w-100 m-auto'>
                        <div className='col column'>
                            <Link to="/" className='m-auto'>Home</Link>
                        </div>
                        {props.category &&
                            <div className='col column'>
                                {/* <div style={{ maxHeight: '200px', overflowY: 'auto' }}> */}
                                <NavDropdown className='dropdown' id="nav-dropdown-dark-example"
                                    title="Category"
                                    menuVariant="dark">

                                    <div className='dmenu'>
                                        <NavDropdown.Item className='ditem' onClick={() => props.setCategory("")}>All</NavDropdown.Item>
                                        {categories.map((category, index) => (
                                            <NavDropdown.Item
                                                key={index}
                                                className='ditem'
                                                onClick={() => props.setCategory(category)}
                                            >
                                                {category}
                                            </NavDropdown.Item>
                                        ))}
                                    </div>

                                </NavDropdown>

                                {/* </div> */}
                            </div>
                        }
                    </div>
                </div>


                <div className='mt-1 column col-lg col-md col-sm-12 col-12'>
                    <div className="SearchBox w-100">
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
            </div>
        </div>


        // </Container >
    )

}
