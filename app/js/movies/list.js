const listMovies = async () => {
  const searchInput = document.getElementById("search_input");
  const starsInput = document.getElementById("stars_input");
  const seenInput = document.getElementById("seen_input");
  const dateFromInput = document.getElementById("date_from_input");
  const dateTillInput = document.getElementById("date_till_input");
  const modeInput = document.getElementById("mode_input");

  try {
    let where = {};

    if (searchInput.value.trim() !== "") {
      where["name"] = searchInput.value.trim();
    }

    if (starsInput.value.trim() !== "all") {
      where["stars"] = starsInput.value;
    }

    if (seenInput.checked) {
      where["watched"] = seenInput.checked;
    }

    let dateFrom = dateFromInput.value.trim();
    let dateTill = dateTillInput.value.trim();

    if (dateFrom || dateTill) {
      where["watched_date_range"] = { from: dateFrom + 'T00:00:00', to: dateTill + 'T00:00:00' };
    }

    if (modeInput.value.trim() !== "all") {
      where["mode"] = modeInput.value;
    }
    
    const movies = await getMovies({}, where);
    let items = "";

    const listBody = document.getElementById("list_body");

    movies.forEach((movie) => {
      let starsElement = "";
      let modeElement = "";

      for (let index = 0; index < movie.stars; index++) {
        starsElement += '<div class="m-icon-tiny m-star"></div>';
      }

      switch (movie.mode) {
        case "tp":
          modeElement = '<div class="m-icon-medium m-teleparty"></div>';
          break;
        case "tg":
          modeElement = '<div class="m-icon-medium m-together"></div>';
          break;
        case "cn":
          modeElement = '<div class="m-icon-medium m-cine"></div>';
          break;
        default:
          break;
      }

      items += `<div class="m-table-item">
          <div class="m-caveat-brush-list-item" style="width: 30%;">${
            movie.name
          }</div>
          <div style="width: 10%;">
            ${starsElement}
          </div>
          <div class="m-caveat-brush-list-item" style="width: 20%;">
            ${movie.watched ? '<div class="m-icon-medium m-3d"></div>' : ""}
          </div>
          <div class="m-caveat-brush-list-item" style="width: 20%;">${
            movie.watched_date
          }</div>
          <div class="m-caveat-brush-list-item" style="width: 20%;">${modeElement}</div>
        </div>`;
    });

    setTimeout(() => {
      listBody.innerHTML = items;
    }, 1500);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    screen.classList.remove("m-spin");
    screen.innerHTML = "❌ Error";
  }
};

async function getFilterMovies() {
  const searchInput = document.getElementById("search_input");
  const starsInput = document.getElementById("stars_input");
  const seenInput = document.getElementById("seen_input");
  const dateFromInput = document.getElementById("date_from_input");
  const dateTillInput = document.getElementById("date_till_input");
  const modeInput = document.getElementById("mode_input");

  // if (searchInput.value.trim().length < 3) {
  //   return
  // }

  try {
    let where = {};

    if (searchInput.value.trim() !== "") {
      where["name"] = searchInput.value.trim();
    }

    if (starsInput.value.trim() !== "all") {
      where["stars"] = starsInput.value;
    }

    if (seenInput.checked) {
      where["watched"] = seenInput.checked;
    }

    let dateFrom = dateFromInput.value.trim();
    let dateTill = dateTillInput.value.trim();

    if (dateFrom || dateTill) {
      where["watched_date_range"] = { from: dateFrom + 'T00:00:00', to: dateTill + 'T00:00:00' };
    }

    if (modeInput.value.trim() !== "all") {
      where["mode"] = modeInput.value;
    }
    
    const movies = await getMovies({}, where);

    setTimeout(() => {
      console.log(movies);
    }, 1500);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    screen.classList.remove("m-spin");
    screen.innerHTML = "❌ Error";
  }
}

async function getRandomMovie() {
  const screen = document.getElementById("screen");
  const newMovie = document.getElementById("get_new_movie");

  screen.classList.add("m-spin");
  screen.innerHTML = "⏳";

  try {
    const where = newMovie.checked ? { watched: false } : null;
    const movies = await getMovies({}, where);
    const randomItem = movies[Math.floor(Math.random() * movies.length)];

    setTimeout(() => {
      screen.classList.remove("m-spin");
      screen.innerHTML = randomItem.name;
    }, 1500);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    screen.classList.remove("m-spin");
    screen.innerHTML = "❌ Error";
  }
}

listMovies();
