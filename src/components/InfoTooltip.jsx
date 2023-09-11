import React from "react";
import closeIcon from "../images/Close-Icon.svg";
import infoSuccess from "../images/popupsuccess.svg";
import infoUnsuccessfully from "../images/popupunsuccessfully.svg";
function InfoTooltip(props) {
  const { isOpen, onClose, isSuccess } = props;
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup_type_info">
        <img
          className="popup_type_info-img"
          src={isSuccess ? infoSuccess : infoUnsuccessfully}
          alt={
            isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так!"
          }
        />
        <p className="popup_type_info-text">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button type="button" className="popup__close " onClick={onClose}>
          <img className="popup__close-img" src={closeIcon} alt="Закрыть" />
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
