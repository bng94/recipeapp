import Modal from "./Modal";
import styled from "styled-components";

const capitalizeTheFirstLetterOfEachWord = (words) => {
  var separateWord = words.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
};

const StyledModalInnerContainer = styled.div`
  h1 {
    font-size: 30px;
    text-align: center;
  }
`;

const StyledPerServingInfo = styled.div`
  text-align: center;
  padding: 10px 0;
  div {
    font-weight: bold;
    span {
      font-weight: normal;
    }
  }
`;

const StyledRecipeType = styled.div`
  font-size: 20px;
  font-weight: bold;
  span {
    font-weight: normal;
    font-size: 14px;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledButton = styled.a`
  text-decoration: none;
  font-size: 24px;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: inline-block;
  background: #698cf5;
  border: 1px solid #337fed;
  padding: 10px 20px;
  color: #fff;

  &:hover {
    border: 1px solid #337fed;
    background: #1e62d0;
  }
`;

const ModalContainer = (props) => {
  const recipe = props.recipe;
  const servingSize = recipe.yield;
  return (
    <Modal onClose={props.onClose}>
      <StyledModalInnerContainer>
        <h1>{recipe.label}</h1>
        <p>
          {recipe.healthLabels.length &&
            recipe.healthLabels
              .map((label) => label.replace("-", " "))
              .join(", ")}
        </p>
        <StyledRecipeType>
          Dish Type:{" "}
          {recipe.dishType.length &&
            recipe.dishType.map((type) => {
              type = capitalizeTheFirstLetterOfEachWord(type);
              return <span key={type}>{type}</span>;
            })}
        </StyledRecipeType>
        <StyledRecipeType>
          Meal Type:{" "}
          {recipe.mealType.length &&
            recipe.mealType.map((type) => {
              let mealType = type.replace("/", " ");
              mealType = capitalizeTheFirstLetterOfEachWord(mealType);
              return <span key={mealType}>{mealType.replace(" ", ", ")}</span>;
            })}
        </StyledRecipeType>
        <StyledRecipeType>
          Cuisine Type:{" "}
          {recipe.cuisineType.length &&
            recipe.cuisineType.map((type, index) => {
              type = capitalizeTheFirstLetterOfEachWord(type);
              return <span key={index}>{type}</span>;
            })}
        </StyledRecipeType>
      </StyledModalInnerContainer>
      <StyledPerServingInfo>
        <div>
          Serving Size: <span>{servingSize} </span>
        </div>
        <div>
          Calories Per Serving:
          <span> {Math.round(Math.round(recipe.calories) / servingSize)} </span>
        </div>
      </StyledPerServingInfo>
      <StyledButtonGroup>
        <StyledButton href={recipe.url} target="_blank">
          Cooking Instruction
        </StyledButton>
        <StyledButton href={recipe.shareAs} target="_blank">
          More Details
        </StyledButton>
      </StyledButtonGroup>
    </Modal>
  );
};

export default ModalContainer;
