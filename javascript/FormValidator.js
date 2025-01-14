export default class FormValidator {
  constructor (obj, formClass) {
    this._obj = obj;
    this._formClass = formClass;
    this._inputs = Array.from(this._formClass.querySelectorAll(obj.inputSelector));
    this._error = Array.from(this._formClass.querySelectorAll(obj.errorSelector));
    this._button = this._formClass.querySelector(obj.buttonSelector);
  }

  enableValidation = () => {
    this._setEventListener(this._formClass);
  }

  handleInput(evt, errorClass) {
    const input = evt.target;
    const error = document.querySelector(`#${input.id}-error`);
      if (input.checkValidity()) {
        input.classList.remove(errorClass);
        error.textContent = '';
      } else {
        input.classList.add(errorClass);
        error.textContent = input.validationMessage;
      }
  }

  toggleValidButton(formElement, inactiveButtonClass) {
    const submitButton = formElement.querySelector('.popup__button'); // находим кнопки сабмитов
    const isFormValid = formElement.checkValidity();
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(inactiveButtonClass, !isFormValid);
  }

  _setEventListener() {
    const formElements = Array.from(document.querySelectorAll(this._obj.formSelector)); // создаём массив форм
    formElements.forEach(formElement => {
      const inputElements = Array.from(formElement.querySelectorAll(this._obj.inputSelector)); // создаём массив инпутов
      inputElements.forEach(input => {
        input.addEventListener('input', (e) => this.handleInput(e, this._obj.errorClass)); // вешаем слушатель на инпуты
      });
      formElement.addEventListener('input', (e) => this.toggleValidButton(formElement, this._obj.inactiveButtonClass)) // вешаем на форму слушатель
    })
  }
}
