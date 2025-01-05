const launchContainer = document.getElementById("launch");

function updateImage() {
  const imageElement = document.getElementById("launch-img"); // Reemplaza con el ID de tu imagen
  const isLandscape = window.matchMedia("(orientation: landscape)").matches;
  const isMinWidth768 = window.innerWidth;
  let rutaActualizada = "";
  if (imageElement) {
    if (isMinWidth768 >= 768 && isMinWidth768 < 1100) {
      rutaActualizada = imageElement.src.replace("portrait", "landscape");
      imageElement.src = rutaActualizada; // Cambiar imagen
    } else {
      rutaActualizada = imageElement.src.replace("landscape", "portrait");
      imageElement.src = rutaActualizada; // Cambiar a otra imagen
    }
  }
}

const cargarLaunch = async (launch = "Launch vehicle") => {
  try {
    const dataFetch = await fetch("./data.json");
    const dataJson = await dataFetch.json();
    dataJson.technology.forEach((launchJson) => {
      if (launchJson.name.toLowerCase() === launch.toLowerCase()) {
        const isMinWidth768 = window.innerWidth;
        let img;
        if (isMinWidth768 >= 768 && isMinWidth768 < 1100) {
          img = launchJson.images.landscape;
        } else {
          img = launchJson.images.portrait;
        }
        const plantilla = `
        <img
          src="${img}"
          alt=""
          class="launch__img"
          data-aos="fade-down"
          id="launch-img"
        />

        <div class="launch__content container">
          <div class="launch__btns">
            <button class="launch__btn" data-launch="Launch vehicle">1</button>
            <button class="launch__btn" data-launch="Spaceport">2</button>
            <button class="launch__btn" data-launch="Space capsule">3</button>
          </div>

          <div class="launch__texts" data-aos="fade-up">
            <h3 class="role">The terminology...</h3>
            <h1 class="launch__title">${launchJson.name}</h1>
            <p class="launch__paragraph">
              ${launchJson.description}
            </p>
          </div>
        </div>`;

        launchContainer.innerHTML = plantilla;
        console.log(
          launchContainer.querySelector(`.launch__btn[data-launch="${launch}"]`)
        );
        launchContainer
          .querySelector(`.launch__btn[data-launch="${launch}"]`)
          .classList.add("launch__btn--active");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
cargarLaunch();

AOS.init({ duration: 1300 });

launchContainer.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const objetivo = e.target.closest("button");
    cargarLaunch(objetivo.dataset.launch);
  }
});

window.addEventListener("resize", updateImage);
