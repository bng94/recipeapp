import { Fragment, useState } from "react";
import ModalContainer from "./ModalContainer";
import style from "./modules/Recipe.module.css";

const Recipe = ({ recipe }) => {
  const { name, calories_per_serving, difficulty, cuisine, meal_type, prep_time, cook_time, dietary_tags, protein } = recipe;
  const [showModal, setShowModal] = useState(false);

  const showModalOverlay = () => {
    document.body.style.overflow = "hidden";
    setShowModal(true);
  };

  const hideModalOverlay = () => {
    document.body.style.overflow = "scroll";
    setShowModal(false);
  };

  return (
    <Fragment>
      {showModal && (
        <ModalContainer onClose={hideModalOverlay} recipe={recipe} />
      )}
      <div className={style.recipe} onClick={showModalOverlay}>
        <div className={style.header}>
          <h2 className={style.title}>{name}</h2>
          <span className={`${style.badge} ${style[difficulty]}`}>{difficulty}</span>
        </div>
        <div className={style.tags}>
          <span className={style.tag}>{cuisine}</span>
          <span className={style.tag}>{meal_type}</span>
        </div>
        <div className={style.meta}>
          <div className={style.metaItem}>
            <span className={style.metaLabel}>Prep</span>
            <span>{prep_time}m</span>
          </div>
          <div className={style.metaItem}>
            <span className={style.metaLabel}>Cook</span>
            <span>{cook_time}m</span>
          </div>
          <div className={style.metaItem}>
            <span className={style.metaLabel}>Cal</span>
            <span>{calories_per_serving}</span>
          </div>
          <div className={style.metaItem}>
            <span className={style.metaLabel}>Protein</span>
            <span>{protein}g</span>
          </div>
        </div>
        {dietary_tags?.length > 0 && (
          <div className={style.dietaryTags}>
            {dietary_tags.slice(0, 3).map((tag) => (
              <span key={tag} className={style.dietaryTag}>
                {tag.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Recipe;
