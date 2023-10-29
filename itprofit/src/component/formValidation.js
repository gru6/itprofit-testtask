function notValid(input, el, errorMessage) {
  input.classList.add("invalid");
  el.innerHTML = errorMessage;
}

function valid(input, el) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  el.innerHTML = "";
}

export function validateForm(
  username,
  email,
  phone,
  message,
  generalError,
  nameError,
  emailError,
  phoneError
) {
  if (
    username.value.trim() === "" ||
    email.value.trim() === "" ||
    phone.inputmask.unmaskedvalue().length < 1 ||
    message.value.trim() === ""
  ) {
    generalError.innerHTML = "Заполните все поля.";
    return false;
  } else {
    generalError.innerHTML = "";
  }

  const usernameRegex = /^.{3,}$/;
  if (!usernameRegex.test(username.value)) {
    notValid(username, nameError, "Имя должно содержать не менее 3 символов.");
    return false;
  } else {
    valid(username, nameError);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    notValid(email, emailError, "Введите корректный email.");
    return false;
  } else {
    valid(email, emailError);
  }

  if (phone.inputmask.unmaskedvalue().length < 9) {
    notValid(phone, phoneError, "Введите корректный номер.");
    return false;
  } else {
    valid(phone, phoneError);
  }

  return true;
}
