import React from "react";

function Login(props) {
  const { onLogin } = props;
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!password || !email) {
      return;
    }

    onLogin({ email, password });
  };

  return (
    <div className="login-register">
      <div className="login-register__container">
        <h2 className="popup__title login-register__title">Вход</h2>
        <form
          className="popup_form"
          action="#"
          name="login"
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
