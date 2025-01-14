export default class Card {
  constructor(name, link, cardTemplate) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() { //находим темплейт и копируем карточку
    const cardElement = document
    .querySelector(`.${this._cardTemplate}`)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() { // наполняем карточку контентом
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__cover').src = this._link; // передаём значение src для изображения
    this._element.setAttribute('alt', this._name); // передаём значение alt для изображения
    this._element.querySelector('.element__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() { //вешаем слушатели на карточку
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.element__remove').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.element__cover').addEventListener('click', () => this._openPopupPrewiev());
  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _openPopupPrewiev() {
    const title = this._element.querySelector('.element__title').textContent;
    const imageTitle = document.querySelector('.popup-preview__image');
    imageTitle.src = this._element.querySelector('.element__cover').src;
    imageTitle.setAttribute('alt', title);
    document.querySelector('.popup-preview__caption').textContent = title;
    document.querySelector('.popup-preview').classList.toggle('popup_opened');
  }
}
