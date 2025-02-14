import './App.css';

function App() {
  const modal = document.getElementById("my_modal");
const openModalBtn = document.getElementById("open_modal");
const closeModalBtn = document.getElementById("close_modal");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
  return (
    <div className="App">
      <div class="m-main-container">
    <div class="m-header">
      <div class="m-icon-big m-film-slate"></div>
      <h1 class="m-caveat-brush-title">MOVIE TRACKER</h1>
      <div class="m-icon-big m-popcorn"></div>
    </div>
    <div class="m-body">
      <div class="m-filters">
        <div class="m-header-filter m-caveat-brush-list-header">
          Filters
        </div>
        <div class="m-search-filter">
          <input type="search" class="m-inputs-filter m-caveat-brush-date-filter" placeholder="Search" id="search_input" />
        </div>
        <div class="m-stars-filter">
          <select name="" class="m-inputs-filter m-caveat-brush-date-filter" id="stars_input">
            <option value="all">
              All
            </option>
            <option value="5">
              <div class="m-icon-tiny m-star">⭐⭐⭐⭐⭐</div>
            </option>
            <option value="4">
              <div class="m-icon-tiny m-star">⭐⭐⭐⭐</div>
            </option>
            <option value="3">
              <div class="m-icon-tiny m-star">⭐⭐⭐</div>
            </option>
            <option value="2">
              <div class="m-icon-tiny m-star">⭐⭐</div>
            </option>
            <option value="1">
              <div class="m-icon-tiny m-star">⭐</div>
            </option>
          </select>
        </div>
        <div class="m-seen-filter m-caveat-brush-date-filter">
          <input type="checkbox" class="m-checkbox-filter" name="" id="seen_input" /><div class="m-icon-medium m-3d"></div>
        </div>
        <div class="m-date-range-filter">
          <input type="date" class="m-caveat-brush-date-filter m-date-filter-left" id="date_from_input" /> - <input class="m-caveat-brush-date-filter m-date-filter-right" type="date" id="date_till_input" />
        </div>
        <div class="m-mode-filter">
          <select name="" id="mode_input" class="m-inputs-filter m-caveat-brush-date-filter">
            <option value="all">All</option>
            <option value="tg">Together 💑</option>
            <option value="tp">Teleparty 🔴</option>
            <option value="cn">Cinema 🎬</option>
          </select>
        </div>
        <div class="m-apply-filter">
          <button class="m-apply-button-filter m-caveat-brush-date-filter" onclick="resetFilter()">Reset</button>
          <button class="m-apply-button-filter m-caveat-brush-date-filter" onclick="listMovies()">Apply</button>
        </div>
        <div class="m-footer-icon">
          <div class="m-icon-huge m-koala"></div>
        </div>
      </div>
      <div class="m-table">
        <div class="m-new-movie-button-container">
          <button class="m-new-movie-button m-apply-button-filter m-caveat-brush-date-filter" id="open_modal">New Movie</button>
        </div>
        <div class="m-th">
          <div class="m-caveat-brush-list-header" style={{width: "30%;"}}>Movie title</div>
          <div style={{width: '10%;'}}>
            <div class="m-icon-tiny m-star"></div>
          </div>
          <div class="m-caveat-brush-list-header" style={{width: "20%;"}}>Seen</div>
          <div class="m-caveat-brush-list-header" style={{width: "20%;"}}>Date</div>
          <div class="m-caveat-brush-list-header" style={{width: "20%;"}}>Mode</div>
        </div>
        <div class="m-tb" id="list_body">
          
        </div>
        <div class="m-tf"></div>
      </div>
      <div class="m-random-movie">
        <div class="m-caveat-brush-list-header">
          Select Random Movie
        </div>
        <div class="m-filters-random m-caveat-brush-list-item">
          <input type="checkbox" class="m-checkbox-filter" name="" id="get_new_movie" />Get New Movie
        </div>
        <div id="screen" class="m-screen m-caveat-brush-list-header">🎲</div>
        <div class="m-apply-random">
          <button class="m-apply-button-random m-caveat-brush-date-filter" onclick="getRandomMovie()">Get Movie</button>
        </div>
        <div class="m-footer-icon">
          <div class="m-icon-huge m-duck"></div>
        </div>
      </div>
    </div>
    <div id="my_modal" class="m-modal">
      <div class="m-modal-content">
          <button class="m-close-btn" id="close_modal">&times;</button>
          <h2 class="m-caveat-brush-list-header">Create Movie 🎬</h2>
          <div class="m-modal-form-container">
            <div class="m-field-modal-form m-field-modal-form-input">
              <input type="text" class="m-inputs-filter m-caveat-brush-date-filter" placeholder="Movie Name" id="create_movie_name" />
            </div>
            <div class="m-field-modal-form">
              <select name="" class="m-inputs-filter m-caveat-brush-date-filter" id="create_movie_stars">
                <option value="5">
                  <div class="m-icon-tiny m-star">⭐⭐⭐⭐⭐</div>
                </option>
                <option value="4">
                  <div class="m-icon-tiny m-star">⭐⭐⭐⭐</div>
                </option>
                <option value="3">
                  <div class="m-icon-tiny m-star">⭐⭐⭐</div>
                </option>
                <option value="2">
                  <div class="m-icon-tiny m-star">⭐⭐</div>
                </option>
                <option value="1">
                  <div class="m-icon-tiny m-star">⭐</div>
                </option>
              </select>
            </div>
            <div class="m-field-modal-form">
              <input type="checkbox" class="m-checkbox-filter" name="" id="create_movie_seen" /><div class="m-icon-medium m-3d"></div>
            </div>
            <div class="m-field-modal-form m-field-modal-form-input">
              <input type="date" class="m-caveat-brush-date-filter m-date-filter-left m-create_movie_date" id="create_movie_date" />
            </div>
            <div class="m-field-modal-form">
              <select name="" id="create_movie_mode" class="m-inputs-filter m-caveat-brush-date-filter">
                <option value="tg">Together 💑</option>
                <option value="tp">Teleparty 🔴</option>
                <option value="cn">Cinema 🎬</option>
              </select>
            </div>
            <div class="m-field-modal-form">
              <button class="m-apply-button-random m-caveat-brush-date-filter" onclick="createNewMovie()">Create</button>
            </div>
          </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default App;
