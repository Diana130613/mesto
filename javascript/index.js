import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards} from './cards.js'; //импортируем массив карточек

const buttonEdit = document.querySelector('.profile__button_edit');
const buttonClose = document.querySelector('.popup__close-button');
const buttonAddClose = document.querySelector('.popup__close-button_add');
const buttonAdd = document.querySelector('.profile__button_add');

const popup = document.querySelector('.popup_edit');
const popupPreview = document.querySelector('.popup-preview');
const popupAdd = document.querySelector('.popup_add');

const nameInput = document.querySelector('.popup__input_edit_title');
const jobInput = document.querySelector('.popup__input_edit_subtitle');
const formEdit = document.querySelector('.popup__form_edit');
const formAdd = document.querySelector('.popup__form_add');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validateProfile = new FormValidator(obj, document.forms.form_edit);
validateProfile.enableValidation(obj, document.forms.form_edit);

//добавить карточки
function addCard(name, link) {
  const card = new Card(name, link, 'element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
}

initialCards.forEach( (item) => {
  addCard(item.name, item.link)
});

//попап редактирование
buttonEdit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

function popupClose() {
  popup.classList.toggle('popup_opened');
}
buttonClose.addEventListener('click', popupClose);

//добавить данные из инпутов в форму
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose();
}
formEdit.addEventListener('submit', formSubmitHandler);

// закрыть попап добавления новой карточки
function popupAddClose() {
  popupAdd.classList.toggle('popup_opened');
};
buttonAddClose.addEventListener('click', popupAddClose);

// добавить новую карточку по кнопке «сохранить»
formAdd.addEventListener('submit', function(evt){
  evt.preventDefault();
  const name = document.querySelector('.popup__input_add_title');
  const link = document.querySelector('.popup__input_add_link');
  addCard(name.value, link.value);
  popupAddClose();
  name.value = ""; //сбросить поля ввода
  link.value = ""; //сбросить поля ввода
});

//попап добавление фотографии
buttonAdd.addEventListener('click', function() {
  popupAdd.classList.add('popup_opened');
});

// закрыть попап-превью карточки
document.querySelector('.popup-preview__close-button').addEventListener('click', function() {
  popupPreview.classList.toggle('popup_opened');
});

// закрытие на клавишу esc
function closeByEsc (evt){
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.classList.remove('popup_opened');
  }
}
window.addEventListener('keydown', closeByEsc);

// закрыть попапы с формой по оверлею
const popupOverlay = Array.from(document.querySelectorAll('.popup'));
popupOverlay.forEach(elem => {
  elem.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      evt.target.classList.remove('popup_opened');
    }
  })
})
