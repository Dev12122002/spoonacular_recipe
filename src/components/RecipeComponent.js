import React from "react";
import styled from "styled-components";
// import Axios from "axios";
import { useRef, useEffect, useState } from 'react';

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 330px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
  max-height: 400px;
  // border: 2px solid black;
  background: white;
`;
const CoverImage = styled.img`
  object-fit: contains;
  height: 250px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RecipeInfo = styled.span`
  // white-space: wrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // text-transform: capitalize;
  // border: 2px solid red; 
  // height: 100px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3; /* Number of lines to show */
  height: auto; /* Three lines multiplied by line height */
`;

const DiseaseComponent = (props) => {
  const { image, title, summary } = props.Recipe;
  const infoRef = useRef(null);

  // eslint-disable-next-line
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleImageError = (event) => {
    event.target.src = "/images/recipe_logo.png"; // Set the source of the image to the default image
    // console.error("Image not found");
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (infoRef.current) {
        setIsOverflowing(infoRef.current.scrollHeight > infoRef.current.clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);
  return (
    <RecipeContainer
      onClick={() => {
        // props.onDiseaseSelect(diseasId);
        // window.scrollTo({ top: 0, behavior: "smooth" });
        props.goToRecipeDetails(props.Recipe);
      }}
    >
      <CoverImage src={image + ""} alt={title} onError={handleImageError} />
      <RecipeName>{title}</RecipeName>
      <InfoColumn>
        <RecipeInfo ref={infoRef} dangerouslySetInnerHTML={{ __html: summary }}></RecipeInfo>
      </InfoColumn>
    </RecipeContainer>
  );
};
export default DiseaseComponent;