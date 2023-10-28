import Inputmask from "inputmask";
import "./style.sass";

Inputmask({ mask: "+375(99) 999-99-99" }).mask(
  document.getElementById("phone")
);
const inputPhone = document.getElementById("phone");

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем значения полей формы
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Проверка, что поля не пустые
  if (
    username.trim() === "" ||
    email.trim() === "" ||
    inputPhone.inputmask.unmaskedvalue().length < 1 ||
    message.trim() === ""
  ) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  // Проверка корректности username
  const usernameRegex = /^.{3,}$/;
  if (!usernameRegex.test(username)) {
    alert("Имя должно содержать 2 слова длинее 3 букв.");
    return;
  }

  // Проверка корректности email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Пожалуйста, введите корректный email.");
    return;
  }

  // Проверка корректности phone
  if (inputPhone.inputmask.unmaskedvalue().length < 9) {
    alert("Пожалуйста, введите корректный номер.");
    return;
  }

  alert("Форма успешно отправлена!");
});
