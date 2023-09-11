import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { isOpen, isClose } = props;

  //  обновляет стейт инпута
  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser?.name ?? "");
    setDescription(currentUser?.about ?? "");
  }, [currentUser, isOpen]);
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({ name, about: description });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isClose={isClose}
      title="Редактировать профиль"
      name="edit-name"
      buttonText="Сохранить"
      typeForm="popup__form_type_edit-name"
    >
      <input
        className="popup__input"
        id="popup-edit-name-input-name"
        autoComplete="off"
        required
        minLength="2"
        maxLength="40"
        name="name"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error  popup-edit-name-input-name-error"></span>
      <input
        className="popup__input"
        id="popup-edit-name-input-status"
        autoComplete="off"
        required
        minLength="2"
        maxLength="400"
        name="about"
        type="text"
        placeholder="О себе"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error popup-edit-name-input-status-error "></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
