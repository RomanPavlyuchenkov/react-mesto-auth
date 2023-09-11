import React from "react";
import editBtn from "../images/edit-btn.svg";
import addBtn from "../images/add-btn.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { cards } = props;
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-edit"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </button>
          <div className="profile__name">
            <div className="profile__edit">
              <h1 className="profile__title">{currentUser.name}</h1>

              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              >
                <img
                  className="profile__edit-button-img"
                  src={editBtn}
                  alt="редактировать"
                />
              </button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
          <img
            className="profile__add-button-img"
            src={addBtn}
            alt="добавить"
          />
        </button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
