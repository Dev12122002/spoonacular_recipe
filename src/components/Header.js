import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function Header(props) {
    const [showCatDropdown, setShowCatDropdown] = useState(false);
    const [showPagesDropdown, setShowPagesCatDropdown] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();
    const categories = [
        "African", "Asian", "American", "British", "Cajun", "Caribbean",
        "Chinese", "Eastern European", "European", "French", "German",
        "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish",
        "Korean", "Latin American", "Mediterranean", "Mexican",
        "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
    ];

    const handleMouseEnter = (type) => {
        if (type === "category")
            setShowCatDropdown(true);
        else if (type === "pages")
            setShowPagesCatDropdown(true);
    };

    const handleMouseLeave = (type) => {
        if (type === "category")
            setShowCatDropdown(false);
        else if (type === "pages")
            setShowPagesCatDropdown(false);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 576); // Set the width breakpoint as per your requirement
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Call handleResize once on initial render
        handleResize();

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        // <Container>
        <div className="Header container-fluid sticky-top">
            <div className='row justify-content-between'>
                <div className="AppName column col-lg-4 col-md-4 col-sm-5 col-10">
                    <img src="/images/recipe_logo.png" alt="logo" width={"55px"} height={"55px"} />
                    <div className="mx-2">Recipe App</div>
                </div>

                {!isWideScreen && <div className="mt-2 column col-lg col-md col-sm col" onClick={() => setExpanded(!expanded)}>
                    {!expanded ?
                        <img src="/images/menu.svg" alt="menu" style={{ color: "white" }} />
                        :
                        <img src="/images/up.svg" alt="close" style={{ color: "white" }} />}
                </div>}

                {!isWideScreen ?
                    (expanded &&
                        <>
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
                                                menuVariant="dark"
                                                show={showCatDropdown}
                                                onMouseEnter={() => handleMouseEnter("category")}
                                                onMouseLeave={() => handleMouseLeave("category")}>

                                                <div className='dmenu'>
                                                    <NavDropdown.Item className='ditem' onClick={() => props.setCategory("")}>All</NavDropdown.Item>
                                                    {categories.map((category, index) => (
                                                        <NavDropdown.Item
                                                            key={index}
                                                            className='ditem'
                                                            onClick={(e) => { e.preventDefault(); props.setCategory(category) }}
                                                        >
                                                            {category}
                                                        </NavDropdown.Item>
                                                    ))}
                                                </div>

                                            </NavDropdown>

                                            {/* </div> */}
                                        </div>
                                    }

                                    <div className='col column'>
                                        {/* <div style={{ maxHeight: '200px', overflowY: 'auto' }}> */}
                                        <NavDropdown className='dropdown' id="nav-dropdown-dark-example"
                                            title="Pages"
                                            menuVariant="dark"
                                            show={showPagesDropdown}
                                            onMouseEnter={() => handleMouseEnter("pages")}
                                            onMouseLeave={() => handleMouseLeave("pages")}>

                                            <div className='dmenu'>
                                                {/* <NavDropdown.Item className='ditem' onClick={() => props.setCategory("")}>All</NavDropdown.Item> */}
                                                <NavDropdown.Item className='ditem' onClick={() => navigate("/FoodJokes")}>Food Jokes</NavDropdown.Item>
                                                <NavDropdown.Item className='ditem' onClick={() => navigate("/FoodTrivia")}>Food Trivia</NavDropdown.Item>
                                            </div>

                                        </NavDropdown>

                                        {/* </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className='mt-1 column col-lg col-md col-sm-12 col-12'>
                                {props.showSearch && <div className="SearchBox w-100">
                                    <img src="/images/search-icon.svg" alt="search" className="SearchIcon" />
                                    <input
                                        placeholder="Search Recipe or Ingrediants..."
                                        value={props.searchQuery}
                                        onChange={props.onTextChange}
                                        className="SearchInput"
                                    />
                                    <img src="/images/close.png" alt="close" onClick={props.clearSearch} className="CloseIcon" />
                                </div>}
                            </div>
                        </>
                    )
                    :
                    <>
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
                                            menuVariant="dark"
                                            show={showCatDropdown}
                                            onMouseEnter={() => handleMouseEnter("category")}
                                            onMouseLeave={() => handleMouseLeave("category")}>

                                            <div className='dmenu'>
                                                <NavDropdown.Item className='ditem' onClick={() => props.setCategory("")}>All</NavDropdown.Item>
                                                {categories.map((category, index) => (
                                                    <NavDropdown.Item
                                                        key={index}
                                                        className='ditem'
                                                        onClick={(e) => { e.preventDefault(); props.setCategory(category) }}
                                                    >
                                                        {category}
                                                    </NavDropdown.Item>
                                                ))}
                                            </div>

                                        </NavDropdown>

                                        {/* </div> */}
                                    </div>
                                }

                                <div className='col column'>
                                    {/* <div style={{ maxHeight: '200px', overflowY: 'auto' }}> */}
                                    <NavDropdown className='dropdown' id="nav-dropdown-dark-example"
                                        title="Pages"
                                        menuVariant="dark"
                                        show={showPagesDropdown}
                                        onMouseEnter={() => handleMouseEnter("pages")}
                                        onMouseLeave={() => handleMouseLeave("pages")}>

                                        <div className='dmenu'>
                                            {/* <NavDropdown.Item className='ditem' onClick={() => props.setCategory("")}>All</NavDropdown.Item> */}
                                            <NavDropdown.Item className='ditem' onClick={() => navigate("/FoodJokes")}>Food Jokes</NavDropdown.Item>
                                            <NavDropdown.Item className='ditem' onClick={() => navigate("/FoodTrivia")}>Food Trivia</NavDropdown.Item>
                                        </div>

                                    </NavDropdown>

                                    {/* </div> */}
                                </div>
                            </div>
                        </div>

                        <div className='mt-1 column col-lg col-md col-sm-12 col-12'>
                            {props.showSearch && <div className="SearchBox w-100">
                                <img src="/images/search-icon.svg" alt="search" className="SearchIcon" />
                                <input
                                    placeholder="Search Recipe or Ingrediants..."
                                    value={props.searchQuery}
                                    onChange={props.onTextChange}
                                    className="SearchInput"
                                />
                                <img src="/images/close.png" alt="close" onClick={props.clearSearch} className="CloseIcon" />
                            </div>}
                        </div>
                    </>
                }
            </div>
        </div>


        // </Container >
    )

}
