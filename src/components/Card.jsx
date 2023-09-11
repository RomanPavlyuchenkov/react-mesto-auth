import deleteBtn from "../images/delete.svg";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function Card({ onCardClick, onCardLike, onCardDelete, ...props }) {
  const handleClick = () => {
    onCardClick(props.card); // наши карточки при загрузке
  };
  const handleLikeClick = () => {
    onCardLike(props.card);
  };
  const currentUser = React.useContext(CurrentUserContext);
  //для корзины. Проверяем id
  const isOwn = props.card.owner._id === currentUser._id;
  // проверяем лайк на этой карточке
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked ? "elements__like_active" : " "
  }`;
  const handleDeleteClick = () => {
    onCardDelete(props.card._id);
  };
  return (
    <div className="elements__element">
      {isOwn && (
        <button
          className="elements__delete"
          type="button"
          onClick={handleDeleteClick}
        >
          <img src={deleteBtn} alt="удалить" />
        </button>
      )}

      <img
        className="elements__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__container-btn">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like-count">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
