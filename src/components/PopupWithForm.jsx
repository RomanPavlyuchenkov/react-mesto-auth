import closeIcon from "../images/Close-Icon.svg";

function PopupWithForm(props) {
  const { isOpen, isClose, onSubmit } = props;
  return (
    <div
      className={`popup popup_type_${props.name} ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup_form ${props.typeForm}`}
          name={`${props.name}`}
          onSubmit={onSubmit}
        >
          {props.children}
          <button className="popup__btn-save" type="submit">
            {props.buttonText}
          </button>
        </form>
        <button type="button" className="popup__close " onClick={isClose}>
          <img className="popup__close-img" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
