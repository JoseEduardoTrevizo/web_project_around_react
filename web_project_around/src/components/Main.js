import ImageProfile from "../images/Avatar.png";
import ImageVector from "../images/Vector.png";
import ImageEdit from "../images/Edit_Button.png";
import ImageAdd from "../images/Add_Button.png";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import api from "../api";
import Card from "./Card";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onClose,
  selectedCard,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((info) => {
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCurrentUser(info);
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
    api
      .getInitialCards()
      .then((response) => {
        setCards(response);
      })
      .catch((invalid) => {
        console.error("invalid message", invalid);
      });
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-picture">
            <img
              src={userAvatar}
              alt="Avatar"
              className="profile__avatar"
              onClick={onEditAvatarClick}
            />

            <img
              src={ImageVector}
              alt="Edit"
              className="profile__avatar-edit"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-info__avatar profile-info__avatar_name">
              {userName}
            </h2>
            <p className="profile-info__avatar profile-info__avatar_ocupation">
              {userDescription}
            </p>
          </div>
          <img
            src={ImageEdit}
            className="profile__edit-button"
            alt="Edit"
            id="btn_open_modal"
            onClick={onEditProfileClick}
          />
          <img
            src={ImageAdd}
            className="profile__button-add"
            alt="Add"
            onClick={onAddPlaceClick}
          />
        </section>
        {selectedCard && (
          <ImagePopup selectedCard={selectedCard} onClose={onClose} />
        )}
        <section className="elements">
          {cards.map((item, index) => {
            return (
              <Card
                card={item}
                key={index}
                currentUser={currentUser}
                onCardClick={onCardClick}
                onClose={onClose}
                ImagePopup={selectedCard}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
