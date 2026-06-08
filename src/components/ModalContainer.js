import Modal from "./Modal";
import styled from "styled-components";

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ") : "";

const difficultyColors = {
  easy:   { bg: "#d4edda", color: "#155724" },
  medium: { bg: "#fff3cd", color: "#856404" },
  hard:   { bg: "#f8d7da", color: "#721c24" },
};

const StyledContainer = styled.div`
  max-height: calc(90vh - 2.5rem);
  overflow-y: auto;
  padding: 0 6px 4px;
  font-family: "Poppins", sans-serif;
  scrollbar-width: thin;
  scrollbar-color: #698cf5 #f0f0f0;
`;

const StyledCloseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  padding-bottom: 2px;
`;

const StyledCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6c757d;
  padding: 4px 8px;
  border-radius: 6px;
  line-height: 1;
  &:hover {
    color: #333;
    background: #f0f0f0;
  }
`;

const StyledHeader = styled.div`
  margin-bottom: 10px;
  h1 {
    font-size: 20px;
    text-align: center;
    margin: 0 0 8px;
    line-height: 1.3;
  }
`;

const StyledBadgeRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
`;

const StyledBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  text-transform: capitalize;
  background: ${(p) => p.bg || "#e9ecef"};
  color: ${(p) => p.color || "#495057"};
`;

const StyledDescription = styled.p`
  font-size: 13px;
  color: #555;
  line-height: 1.6;
  text-align: center;
  margin: 0 0 12px;
`;

const StyledStats = styled.div`
  display: flex;
  justify-content: space-around;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 12px;
`;

const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  font-weight: 600;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    color: #6c757d;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const StyledDietaryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
  justify-content: center;
`;

const StyledDietaryTag = styled.span`
  font-size: 11px;
  background: #e8f4f8;
  color: #1a6985;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: capitalize;
`;

const StyledSection = styled.div`
  margin-bottom: 14px;
  h3 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 8px;
    padding-bottom: 4px;
    border-bottom: 2px solid #698cf5;
    color: #333;
  }
`;

const StyledIngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledIngredient = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledIngredientQty = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #698cf5;
  white-space: nowrap;
  flex-shrink: 0;
`;

const StyledInstructionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledStep = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 13px;
  line-height: 1.65;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

const StyledStepNumber = styled.span`
  min-width: 24px;
  height: 24px;
  background: #698cf5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
`;

const ModalContainer = (props) => {
  const recipe = props.recipe;
  const {
    name,
    description,
    difficulty,
    cuisine,
    meal_type,
    prep_time,
    cook_time,
    servings,
    calories_per_serving,
    protein,
    dietary_tags,
    ingredients,
    instructions,
  } = recipe;

  const diffStyle = difficultyColors[difficulty] || {};

  return (
    <Modal onClose={props.onClose}>
      <StyledContainer>
        <StyledCloseRow>
          <StyledCloseButton onClick={props.onClose}>✕</StyledCloseButton>
        </StyledCloseRow>

        <StyledHeader>
          <h1>{name}</h1>
          <StyledBadgeRow>
            <StyledBadge bg={diffStyle.bg} color={diffStyle.color}>
              {difficulty}
            </StyledBadge>
            <StyledBadge>{capitalize(cuisine)}</StyledBadge>
            <StyledBadge>{capitalize(meal_type)}</StyledBadge>
          </StyledBadgeRow>
        </StyledHeader>

        <StyledDescription>{description}</StyledDescription>

        <StyledStats>
          <StyledStat>
            <span>Prep</span>
            <span>{prep_time}m</span>
          </StyledStat>
          <StyledStat>
            <span>Cook</span>
            <span>{cook_time}m</span>
          </StyledStat>
          <StyledStat>
            <span>Serves</span>
            <span>{servings}</span>
          </StyledStat>
          <StyledStat>
            <span>Calories</span>
            <span>{calories_per_serving}</span>
          </StyledStat>
          <StyledStat>
            <span>Protein</span>
            <span>{protein}g</span>
          </StyledStat>
        </StyledStats>

        {dietary_tags?.length > 0 && (
          <StyledDietaryTags>
            {dietary_tags.map((tag) => (
              <StyledDietaryTag key={tag}>
                {tag.replace(/_/g, " ")}
              </StyledDietaryTag>
            ))}
          </StyledDietaryTags>
        )}

        <StyledSection>
          <h3>Ingredients</h3>
          <StyledIngredientList>
            {ingredients.map((ing) => (
              <StyledIngredient key={ing.id}>
                <span>
                  {ing.name}
                  {ing.optional && (
                    <em style={{ color: "#999", fontSize: "11px" }}>
                      {" "}(optional)
                    </em>
                  )}
                </span>
                <StyledIngredientQty>
                  {ing.quantity} {ing.unit}
                </StyledIngredientQty>
              </StyledIngredient>
            ))}
          </StyledIngredientList>
        </StyledSection>

        <StyledSection>
          <h3>Instructions</h3>
          <StyledInstructionList>
            {instructions.map((step, i) => (
              <StyledStep key={i}>
                <StyledStepNumber>{i + 1}</StyledStepNumber>
                <span>{step}</span>
              </StyledStep>
            ))}
          </StyledInstructionList>
        </StyledSection>
      </StyledContainer>
    </Modal>
  );
};

export default ModalContainer;
