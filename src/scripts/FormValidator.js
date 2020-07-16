export class FormValidator{
  constructor(form, button){
    this.form = form;
    this.button = button;
    this.errors = this.form.querySelectorAll('.error');
  }

//Функция проверки поля на ошибки
  isValidate(input) {
  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов'
  }
  input.setCustomValidity(""); 
// Если на инпуте есть required будет true/false(заполнено)
  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false;
    }
// Если на инпуте есть minlength будет true/false(достигнута минимальная длина)
  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false;
    }
  return input.checkValidity();
  }

  validFieldInput(input) {
    
    const errorElem = input.closest('.popup__form').querySelector(`#${input.id}-error`);
    this.isValidate(input);

    errorElem.textContent = input.validationMessage;
  }

  setSubmitButtonState(button, state) {

    if(state) {

      this.button.removeAttribute('disabled');
      this.button.classList.remove('popup__button_invalid');
    } else {
      this.button.setAttribute('disabled', true);
      this.button.classList.add('popup__button_invalid');
    }
  }

  handlerInputForm(){
    const currentForm = this.form;
    const submit = currentForm.querySelector('.button');

    this.validFieldInput(event.target);

    if (currentForm.checkValidity()) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }

//Для активации кнопки на добавление карточки
  inputHandler() {
    const name = this.form.elements.name;
    const link = this.form.elements.link;

    if (name.value.length === 0 || link.value.length === 0) {
      this.button.setAttribute('disabled', true);
      this.button.classList.add('popup__button_disabled');
    } else {
      this.button.removeAttribute('disabled');
      this.button.classList.remove('popup__button_disabled');
    }
  }

// Функция очистки ошибок
  clearError(){

    this.errors.forEach(element => {
      element.textContent = '' ;
    });
    
    const nameProfile = document.querySelector('.popup__input_name');
    const jobProfile = document.querySelector('.popup__input_job');
    nameProfile.setCustomValidity(""); 
    jobProfile.setCustomValidity("")
  }

}