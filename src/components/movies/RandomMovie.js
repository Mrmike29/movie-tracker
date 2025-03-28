import { useState } from "react";

function RandomMovie({ movies }) {
  const [randomMovie, setRandomMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onlyUnwatched, setOnlyUnwatched] = useState(false);

  const handleCheckboxChange = (e) => {
    setOnlyUnwatched(e.target.checked);
  };

  const getRandomMovie = () => {
    setIsLoading(true);
    setRandomMovie(null); // Reset para que se vea la animación de carga

    const filteredMovies = onlyUnwatched
      ? movies.filter((movie) => !movie.watched)
      : movies;

    if (filteredMovies.length === 0) {
      setTimeout(() => {
        setRandomMovie("No movies found 🎥");
        setIsLoading(false);
      }, 3000);
      return;
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredMovies.length);
      setRandomMovie(filteredMovies[randomIndex].name);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="m-random-movie">
      <div className="m-caveat-brush-list-header">Select Random Movie</div>
      <div className="m-filters-random m-caveat-brush-list-item">
        <input
          type="checkbox"
          className="m-checkbox-filter"
          id="get_new_movie"
          checked={onlyUnwatched}
          onChange={handleCheckboxChange}
        />
        Get New Movie
      </div>
      <div id="screen" className="m-screen m-caveat-brush-list-header">
        {isLoading ? "⏳ Choosing..." : randomMovie || "🎲"}
      </div>
      <div className="m-apply-random">
        <button
          className="m-apply-button-random m-apply-button-filter m-caveat-brush-date-filter"
          onClick={getRandomMovie}
          disabled={isLoading}
        >
          {isLoading ? "Picking..." : "Get Movie"}
        </button>
      </div>
      <div className="m-footer-icon">
        <div className="m-icon-huge m-duck"></div>
      </div>
    </div>
  );
}

export default RandomMovie;
