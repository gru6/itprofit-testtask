import Inputmask from "inputmask";
import "./style.sass";


Inputmask({ mask: "+375(99) 999-99-99" }).mask(
  document.getElementById("phone")
);

const form = document.getElementById("myForm");

form.addEventListener("submit", async function (event) {
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
    notValid(username, nameError, "Имя длинее 3 букв.");
    return;
  } else {
    valid(username, nameError);
  }

  // Проверка корректности email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notValid(email, emailError, "Введите корректный email.");
    return;
  } else {
    valid(email, emailError);
  }

  // Проверка корректности phone
  if (phone.inputmask.unmaskedvalue().length < 9) {
    notValid(phone, phoneError, "Введите корректный номер.");
    return;
  } else {
    valid(phone, phoneError);
  }

  alert("Форма успешно отправлена!");

  const userInfo = {
    username: username.value,
    email: email.value,
    phone: phone.value,
    message: message.value,
  };

  async function createNewUser(userInfo) {
    try {
      console.log('userInfo :>> ', userInfo);
      const response = await fetch("http://localhost:9090/api/registration", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
       console.log('response :>> ', response.statusText);
        throw new Error(
          `Create NewUser request failed. Error: ${response.status}`
        );
      }
      const data = await response.json();
      console.log('data :>> ', data); //ТУТ НАДО ВЫВЕСТИ You are registered НА САЙТ И ОЧИСТИТЬ ФОРМУ
      form.reset();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  createNewUser(userInfo);
});

function notValid(input, el, errorMessage) {
  input.classList.add("invalid");
  el.innerHTML = errorMessage;
}

function valid(input, el) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  el.innerHTML = "";
}

