import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip";
function App() {
  // хранение состояния авторизации
  const [loggedIn, setLoggedIn] = React.useState(false);
  //состояние email
  const [isHeaderEmail, setIsHeaderEmail] = React.useState("");
  const navigate = useNavigate();

  //  открытия попапа успеха или ошибки регистрации
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  //  изменения картинки
  const [isSuccessImage, setIsSuccessImage] = React.useState(false);
  // handleRegister - передается в Register, при вызове отправляет запрос регистрации и перенаправляет на страницу /sing-in
  const handleRegister = ({ email, password }) => {
    return register({ email, password })
      .then((res) => {
        if (res) {
          navigate("/sign-in");
          setIsSuccessImage(true);
        }
      })
      .catch((err) => {
        setIsSuccessImage(false);
        navigate("/sign-up");
        console.log(err);
      })
      .finally(() => {
        setIsSuccessPopupOpen(true);
      });
  };

  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          navigate("/");
          setIsHeaderEmail(email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // checkToken  вызывается при монтировании App и отправляет запрос  если jwt есть в хранилище
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            navigate("/");
            setIsHeaderEmail(res.data.email);
          } else {
            navigate("/sign-in");
          }
        })
        .catch(console.error);
    }
  }, []);
  // удаление токена и выход
  const handleSignout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsSuccessPopupOpen(false);
  };

  /*   данные пользователя */
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser({
          name: currentUser.name,
          about: currentUser.about,
          avatar: currentUser.avatar,
          _id: currentUser._id,
        });
      })
      .catch((err) => console.log(`catch: ${err}`));
  }, []);
  /* открываем картинку */
  const [selectedCard, setSelectedCard] = React.useState(null);
  const handleCardClick = (data) => {
    setSelectedCard(data);
  };
  /* получаем карточки */
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(`catch: ${err}`));
  }, []);

  const handleCardLike = (card) => {
    //проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`catch: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(`catch: ${err}`));
    }
  };
  //Удаляем карточки
  const handleCardDelete = (cardID) => {
    api
      .deleteCard(cardID)
      .then(() => {
        //с помощью метода filter создаем копию массива, исключив из него удалённую карточку.
        setCards((cards) => cards.filter((c) => c._id !== cardID));
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //edit profile
  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInfo({ name, about })
      .then((newProfile) => {
        setCurrentUser(newProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //edit avatar
  const handleUpdateAvatar = (avatar) => {
    api
      .updateAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  //add place
  const handleAddPlace = (data) => {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`catch: ${err}`));
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={isHeaderEmail}
          onSignOut={handleSignout}
          stateLogin={loggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onCardLike={handleCardLike}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditAvatarPopup
          isClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccessImage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
