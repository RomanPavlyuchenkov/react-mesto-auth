import React from "react";
import { Link } from "react-router-dom";
function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister({ email, password });
  };
  return (
    <div className="login-register">
      <div className="login-register__container">
        <h2 className="popup__title login-register__title">Регистрация</h2>
        <form
          className="popup_form"
          action="#"
          name="register"
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input login-register__input"
            autoComplete="off"
            required
            minLength="2"
            maxLength="40"
            type="email"
            placeholder="Email"
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
          />
          <span className="popup__input-error  "></span>
          <input
            className="popup__input login-register__input"
            autoComplete="off"
            required
            minLength="2"
            maxLength="400"
            name="about"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <span className="popup__input-error  "></span>
          <button className="popup__btn-save login-register__btn" type="submit">
            Зарегистрироваться
          </button>
          <Link className="login-register__link" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
