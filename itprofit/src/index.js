import Inputmask from "inputmask";
import "./style.sass";

Inputmask({ mask: "+375(99) 999-99-99" }).mask(
  document.getElementById("phone")
);

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения полей формы
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const generalError = document.getElementById("generalError");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");

  // Проверка, что поля не пустые
  if (
    username.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.inputmask.unmaskedvalue().length < 1 ||
    message.value.trim() === ""
  ) {
    generalError.innerHTML = "Заполните все поля.";
    return;
  } else {
    generalError.innerHTML = "";
  }

  // Проверка корректности username
  const usernameRegex = /^.{3,}$/;
  if (!usernameRegex.test(username.value)) {
    notValid(username, nameError, "Имя длинее 3 букв.")
    return;
  } else {
    valid(username, nameError)
  }

  // Проверка корректности email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notValid(email, emailError, "Введите корректный email.")
    return;
  } else {
    valid(email, emailError)
  }

  // Проверка корректности phone
  if (phone.inputmask.unmaskedvalue().length < 9) {
    notValid(phone, phoneError, "Введите корректный номер.")
    return;
  } else {
    valid(phone, phoneError)
  }

  alert("Форма успешно отправлена!");
});

function notValid(input, el, errorMessage) {
  input.classList.add('invalid');
  el.innerHTML = errorMessage;
}

function valid(input, el) {
  input.classList.remove('invalid');
  input.classList.add('valid');
  el.innerHTML = "";
}
