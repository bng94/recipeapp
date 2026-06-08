import { Fragment, useState } from "react";
import ModalContainer from "./ModalContainer";
import style from "./modules/Recipe.module.css";

const Recipe = ({ recipe }) => {
  const { label: title, calories, image: img, ingredients } = recipe;
  const [showModal, setShowModal] = useState(false);

  const showModalOverlay = () => {
    document.body.style.overflow = 'hidden';
    setShowModal(true);
  };

  const hideModalOverlay = () => {
    document.body.style.overflow = 'scroll';
    setShowModal(false);
  };

  return (
    <Fragment>
      {showModal && (
        <ModalContainer onClose={hideModalOverlay} recipe={recipe} />
      )}
      <div className={style.recipe} onClick={showModalOverlay}>
        <h1>{title}</h1>
        <img className={style.img} src={img} alt={title} />
        <p>Calories: {Math.round(calories)}</p>
        <ol>
          {ingredients.map((ingedient, index) => (
            <li key={index}>{ingedient.text}</li>
          ))}
        </ol>
      </div>
    </Fragment>
  );
};

export default Recipe;
