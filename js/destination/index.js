const planetContainer = document.getElementById("planet");
const cargarAnimacion = () => {
  console.log(document.querySelectorAll(".transition"));
  document.querySelectorAll(".transition").forEach((element, index) => {
    element.setAttribute("data-aos-delay", index * 300);
    console.log();
  });

  AOS.init({
    duration: 1000, // Duración en milisegundos
    offset: 0, // Desplazamiento del scroll para activar
    once: true, // Si es true, la animación se ejecuta solo una vez
  });
};

const cargarPlanet = async (planet = "moon") => {
  try {
    const data = await fetch("./data.json");
    const datajson = await data.json();
    datajson.destinations.forEach((planetJson) => {
      if (planetJson.name.toLowerCase() === planet.toLowerCase()) {
        // document.getElementById("img").src = planet.images.webp;
        // document.getElementById("name").innerHTML = planet.name;
        // document.getElementById("paragraph").innerHTML = planet.description;
        // document.getElementById("distance").innerHTML = planet.distance;
        // document.getElementById("travel").innerHTML = planet.travel;
        const plantilla = `<img
            src="${planetJson.images.webp}"
            alt="MOON"
            class="planet__img transition"
            data-aos="fade-right"
            id="img"
          />

          <div class="planet__content">
            <div class="planet__links transition fade-down">
              <button
                class="planet__link"
                data-planet="moon"
              >
                MOON
              </button>
              <button class="planet__link" data-planet="mars">MARS</button>
              <button class="planet__link" data-planet="europa">EUROPA</button>
              <button class="planet__link" data-planet="titan">TITAN</button>
            </div>
            <h1 class="planet__title transition" id="name" data-aos="fade-left">
              ${planetJson.name}
            </h1>
            <p
              class="planet__paragraph transition"
              id="paragraph"
              data-aos="zoom"
            >
              ${planetJson.description}
            </p>
            <hr class="hr" />
            <div class="planet__details transition" data-aos="fade-up">
              <p class="planet__detail">
                <span>AVG. DISTANCE</span> <span id="distance">${planetJson.distance}</span>
              </p>
              <p class="planet__detail">
                <span>EST. TRAVEL TIME</span> <span id="travel">${planetJson.travel}</span>
              </p>
            </div>
          </div>`;

        document.getElementById("planet").innerHTML = plantilla;
        planetContainer.dataset.planet = planet;
        if (planet === "moon") {
          document
            .querySelector(".planet__link[data-planet='moon']")
            .classList.add("planet__link--active");
        }
        cargarAnimacion();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

cargarPlanet();

planetContainer.addEventListener("click", async (e) => {
  if (e.target.closest("button")) {
    await cargarPlanet(e.target.dataset.planet);
    const planetACargar = planetContainer.dataset.planet;

    document
      .querySelector(`.planet__link[data-planet="${planetACargar}"]`)
      .classList.add("planet__link--active");
  }
});
