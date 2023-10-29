const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalText = document.getElementById("modalText");

export function initializeModal(text, btn) {
  btn.onclick = function () {
    openModal(text);
  };
}

export function openModal(text) {
  modal.style.display = "block";
  modal.style.top = "0";
  modalText.innerHTML = text;

  span.onclick = function () {
    modal.style.top = "-100%";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.top = "-100%";
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    }
  };
}
