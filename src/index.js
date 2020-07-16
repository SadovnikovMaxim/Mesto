
import { Api } from '../src/scripts/Api.js';
import { FormValidator } from '../src/scripts/FormValidator.js';
import { UserInfo } from '../src/scripts/UserInfo.js';
import { Popup } from '../src/scripts/Popup.js';
import { CardList } from '../src/scripts/CardList.js';
import { Card } from '../src/scripts/Card.js';

import './pages/index.css'

(function(){


  // переменные
  const list = document.querySelector('.places-list');
  const addFormOpen = document.querySelector('.user-info__button');
  const modal = document.querySelector('.popup_type_card');
  const modalProfile = document.querySelector('.popup_type_profile');
  const modalImage = document.querySelector('.popup_type_image')
  const profileFormOpen = document.querySelector('.user-info__button-edit');
  const closeButtonCard = document.querySelector('.popup__close');
  const closeButtonEdit = document.querySelector('.popup__close_type_profile');
  const closeButtonImage = document.querySelector('.popup__close_type_image');
  const form = document.querySelector('.popup__form');
  const nameProfile = document.querySelector('.popup__input_name');
  const jobProfile = document.querySelector('.popup__input_job');
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const formProfile = document.querySelector('.popup__form_type_profile');
  const addButtonProfile = document.querySelector('.popup__button_type_profile');
  const addButton = document.querySelector('.popup__button_disabled');
  const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'
  const config = {
    url: `${serverUrl}/cohort11`, 
      headers: {
        authorization: '9f8e0cc6-e90b-4d08-990d-9809078a2843',
        'Content-Type': 'application/json'
    }
  }

  // Функции
  // Увеличение картинки
  function openImagePopup() {
    popupImage.open();
  }

 function callbackCard(name, link){
   const card = new Card(name, link, openImagePopup);
   return card.create()
 }

// Классы
  const popupAdd = new Popup(modal);
  const popupEdit = new Popup(modalProfile);
  const popupImage = new Popup(modalImage);
  const userInfo = new UserInfo(userName, userJob, nameProfile, jobProfile);
  const formCard = document.forms.new;
  const formUser = document.forms.user;
  const formValidator = new FormValidator(formUser, addButtonProfile);
  const formValidatorCard = new FormValidator(formCard, addButton);
  const api = new Api(config)

//Загрузка карточек с сервера
  api.getCard()
  .then( res => {
    const cardList = new CardList(res, list, callbackCard);
    cardList.render();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  });

//Загрузка профиля с сервера
  api.loadUser()
  .then((res) => {
    userInfo.updateUserInfo(res.name, res.about);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
  });
  

// Валидация
  formUser.addEventListener('input', () => {
    formValidator.handlerInputForm();
  });

  formCard.addEventListener('input', () => {
    formValidatorCard.inputHandler();
  });

//Открытие окна для добавления карточки
  addFormOpen.addEventListener('click', () =>{
    popupAdd.open();
  });

//Открытие окна с редактирование профиля
  profileFormOpen.addEventListener('click', () =>{

    userInfo.setUserInfo(userName.textContent, userJob.textContent);
    formValidator.setSubmitButtonState(addButtonProfile, true);
    popupEdit.open();
    formValidator.clearError();
});

// Изменение профиля
  formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    api.updateUser(nameProfile.value, jobProfile.value)
    .then((res) => {
      userInfo.updateUserInfo(res.name, res.about);

      formProfile.reset();
      popupEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`); // выведем ошибку в консоль
    });
  })
  const initialCards = [
    {
    }] // Пустой массив, т.к. карточки не подгружаются с сервера
  //Добавление новой карточки
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('.popup__input_type_name').value;
    const link = form.querySelector('.popup__input_type_link-url').value;
    const cardLists = new CardList(initialCards, list, callbackCard);
    cardLists.addCard(name, link);

    form.reset();
    popupAdd.close();
    formValidatorCard.inputHandler();
  })

  //Закрытие окон
  closeButtonCard.addEventListener('click', () =>{
    popupAdd.close();
  });
  closeButtonEdit.addEventListener('click', () =>{
    popupEdit.close();
  });
  closeButtonImage.addEventListener('click', () =>{
    popupImage.close();
  });

})();
