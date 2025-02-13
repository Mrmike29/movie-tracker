const listMovies = async () => {
  let items = "";
  const movies = await getMovies({});

  const listBody = document.getElementById("list_body");

  movies.forEach((movie) => {
    let starsElement = '';
    let modeElement = '';

    for (let index = 0; index < movie.stars; index++) {
      starsElement += '<div class="m-icon-tiny m-star"></div>';
    }

    switch (movie.mode) {
      case 'tp':
        modeElement = '<div class="m-icon-medium m-teleparty"></div>';
        break;
      case 'tg':
        modeElement = '<div class="m-icon-medium m-together"></div>';
        break;
      case 'cn':
        modeElement = '<div class="m-icon-medium m-cine"></div>';
        break;
      default:
        break;
    }

    items += 
      `<div class="m-table-item">
        <div class="m-caveat-brush-list-item" style="width: 30%;">${movie.name}</div>
        <div style="width: 10%;">
          ${ starsElement }
        </div>
        <div class="m-caveat-brush-list-item" style="width: 20%;">
          ${ (movie.watched)? '<div class="m-icon-medium m-3d"></div>' : '' }
        </div>
        <div class="m-caveat-brush-list-item" style="width: 20%;">${movie.watched_date}</div>
        <div class="m-caveat-brush-list-item" style="width: 20%;">${modeElement}</div>
      </div>`;
    console.log(movie);
  });

  listBody.innerHTML = items;
};

listMovies();
