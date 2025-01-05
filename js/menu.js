document.getElementById("btn-links--open").addEventListener("click", () => {
  document
    .querySelector(".nav__links__container")
    .classList.add("nav__links--active");
});

document.getElementById("btn-links--close").addEventListener("click", () => {
  document
    .querySelector(".nav__links__container")
    .classList.remove("nav__links--active");
});
