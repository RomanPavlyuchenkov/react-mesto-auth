import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import mobillBtn from "../images/btn-mobill.svg";
function Header(props) {
  const { onSignOut, email, stateLogin } = props;

  // хук, который может вернуть объект с данными о текущем роуте
  // внутри location поле pathname - это текущий роут, например /sign-up
  const location = useLocation({});
  const [isShowExit, setIsShowExit] = React.useState(false);
  const isSignUp = location.pathname === "/sign-up";
  const isLogin = location.pathname === "/sign-in";
  const isLoginIn = location.pathname === "/";
  const handleShowExit = () => {
    setIsShowExit(true);
    if (isShowExit) {
      setIsShowExit(false);
    }
  };
  return (
    <header
      className={`header ${
        isShowExit && stateLogin ? "header_type_mobill" : ""
      }`}
    >
      <img className="header__logo" src={logo} alt="лого" />
      <div className="header__links">
        {(isSignUp || isLogin) && (
          <Link
            className="header__link"
            to={isSignUp ? "/sign-in" : "/sign-up"}
          >
            {isSignUp ? "Войти" : "Регистрация"}
          </Link>
        )}
        <button
          type="button"
          className={`header__mobill-btn ${
            stateLogin ? "" : "header__mobill-btn_hidden"
          }`}
          onClick={handleShowExit}
        >
          <img src={mobillBtn} alt="выйти" />
        </button>
        <div
          className={`header__email-exit  ${
            isShowExit && stateLogin ? "header__email-exit_type_mobill" : ""
          }`}
        >
          {isLoginIn && <p className="header__email">{email}</p>}
          {isLoginIn && (
            <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
              Выйти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
