import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef(""); // записываем объект, возвращаемый хуком, в переменную
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      isClose={props.isClose}
      title="Обновить аватар"
      name="update-avatar"
      buttonText="Сохранить"
      typeForm="popup__form_type_update-avatar"
    >
      <input
        className="popup__input"
        id="popup-update-avatar-link"
        autoComplete="off"
        name="avatar"
        required
        type="url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span className="popup__input-error popup-update-avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
