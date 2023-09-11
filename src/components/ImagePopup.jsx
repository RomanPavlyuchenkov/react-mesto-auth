import iconClose from "../images/Close-Icon.svg";

function ImagePopup({ onClose, ...props }) {
  /* {card?.} этот оператор проверяeт, есть ли card или нет */
  return (
    <div
      className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__container-image">
        <img
          className="popup__img"
          src={props.card?.link}
          alt={props.card?.name}
        />
        <h2 className="popup__title-image">{props.card?.name}</h2>
        <button
          className="popup__close popup__close_type_image"
          type="button"
          onClick={onClose}
        >
          <img className="popup__close-img" src={iconClose} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
