import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  // состояние в котором содержится значение инпута
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  //обработчики изменяют состояние
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({ name: name, link: link });
  };
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      isClose={props.isClose}
      title="Новое место"
      name="add-card"
      buttonText="Создать"
      typeForm="popup__form_type_add-card"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="popup-add-card-input-name"
        autoComplete="off"
        name="name"
        minLength="2"
        maxLength="30"
        required
        type="text"
        placeholder="Название"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error popup-add-card-input-name-error"></span>
      <input
        className="popup__input"
        id="popup-add-card-input-link"
        autoComplete="off"
        name="link"
        required
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error popup-add-card-input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
