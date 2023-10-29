import Inputmask from "inputmask";
import "./style.sass";
import { initializeModal, openModal } from "./component/modal";
import { createNewUser } from "./component/api";
import { validateForm } from "./component/formValidation";

Inputmask({ mask: "+375(99) 999-99-99" }).mask(
  document.getElementById("phone")
);

const form = document.getElementById("myForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Получаем значения полей формы
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const generalError = document.getElementById("generalError");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");

  //валидируем форму
  if (
    validateForm(
      username,
      email,
      phone,
      message,
      generalError,
      nameError,
      emailError,
      phoneError
    )
  ) {
    openModal("Форма успешно отправлена!")

    const userInfoForApi = {
      username: username.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };
    createNewUser(userInfoForApi, form, openModal);
  } 
});

const modalBtn = document.getElementById("myBtn");
initializeModal("Просто текст", modalBtn);
