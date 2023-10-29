export async function createNewUser(userInfo, form, openModal) {
  setTimeout(async () => {
    // задержка для последовательного отобраения сообщений в модальном окне
    try {
      const response = await fetch("http://localhost:9090/api/registration", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        openModal(response.statusText); // вывод сообщения с сервера об ошибке
        throw new Error(
          `Create NewUser request failed. Error: ${response.status}`
        );
      }
      const data = await response.json();
      openModal(data.message); //вывод сообщения с сервера о регистрации
      form.reset();
      return data;
    } catch (error) {
      console.error(error);
    }
  }, 1000);
}
