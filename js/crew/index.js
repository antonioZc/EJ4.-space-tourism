const crewContainer = document.getElementById("crew");

const cargarCrew = async (person = "Douglas Hurley") => {
  try {
    const fetchData = await fetch("./data.json");
    const dataJson = await fetchData.json();
    dataJson.crew.forEach((personJson) => {
      if (personJson.name.toLowerCase() === person.toLowerCase()) {
        const plantilla = `<div class="crew__content" data-aos="fade-right">
          <div class="crew__texts">
            <h3 class="role">${personJson.role}</h3>
            <h1 class="crew__name">${personJson.name}</h1>
            <p class="crew__paragraph">
              ${personJson.bio}
            </p>
          </div>
          <div class="crew__btns">
            <button class="crew__btn" data-person="Douglas Hurley"></button>
            <button class="crew__btn" data-person="Mark Shuttleworth"></button>
            <button class="crew__btn" data-person="Victor Glover"></button>
            <button class="crew__btn" data-person="Anousheh Ansari"></button>
          </div>
        </div>
        <div class="crew__picture" data-aos="fade-left">
          <img
            class="crew__img"
            src="${personJson.images.webp}"
            alt=""
          />
        </div>`;

        crewContainer.innerHTML = plantilla;

        crewContainer
          .querySelector(`.crew__btn[data-person="${person}"]`)
          .classList.add("crew__btn--active");
        crewContainer.dataset.crew = personJson.name;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

cargarCrew();
AOS.init({ duration: 1300 });
crewContainer.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const objetivo = e.target;
    cargarCrew(objetivo.dataset.person);
  }
});
