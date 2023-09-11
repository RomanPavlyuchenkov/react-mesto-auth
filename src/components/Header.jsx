import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
function Header(props) {
  const { onSignOut, email } = props;
  // хук, который может вернуть объект с данными о текущем роуте
  // внутри location поле pathname - это текущий роут, например /sign-up
  const location = useLocation({});

  const isSignUp = location.pathname === "/sign-up";
  const isLogin = location.pathname === "/sign-in";
  const isLoginIn = location.pathname === "/";
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__links">
        {isLoginIn && <p className="header__email">{email}</p>}
        {(isSignUp || isLogin) && (
          <Link
            className="header__link"
            to={isSignUp ? "/sign-in" : "/sign-up"}
          >
            {isSignUp ? "Войти" : "Регистрация"}
          </Link>
        )}
        {isLoginIn && (
          <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
            Выйти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
