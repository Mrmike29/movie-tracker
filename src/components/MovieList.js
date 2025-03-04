import { useState, useEffect } from "react";

const getModeElement = (mode) => {
  switch (mode) {
    case "tp":
      return <div className="m-icon-medium m-teleparty"></div>;
    case "tg":
      return <div className="m-icon-medium m-together"></div>;
    case "cn":
      return <div className="m-icon-medium m-cine"></div>;
    default:
      return null;
  }
};

function MovieList({ movies, onOpenModal, openEditModal }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [movies]);

  return (
    <div className="m-table">
      <div className="m-new-movie-button-container">
        <button
          className="m-new-movie-button m-apply-button-filter m-caveat-brush-list-item"
          onClick={onOpenModal}
        >
          New Movie
        </button>
      </div>
      <div className="m-th">
        <div className="m-caveat-brush-list-header" style={{ width: "30%" }}>
          Movie Title
        </div>
        <div className="m-caveat-brush-list-header" style={{ width: "10%" }}>
          <div className="m-icon-tiny m-star"></div>
        </div>
        <div className="m-caveat-brush-list-header" style={{ width: "10%" }}>
          Seen
        </div>
        <div className="m-caveat-brush-list-header" style={{ width: "20%" }}>
          Date
        </div>
        <div className="m-caveat-brush-list-header" style={{ width: "20%" }}>
          Mode
        </div>
        <div className="m-caveat-brush-list-header" style={{ width: "10%" }}>
          Actions
        </div>
      </div>
      <div className="m-tb">
        {loading ? (
          <div
            className="m-caveat-brush-list-item"
            style={{ textAlign: "center" }}
          >
            ⏳ Loading movies...
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="m-table-item">
              <div
                className="m-caveat-brush-list-item"
                style={{ width: "30%" }}
              >
                {movie.name}
              </div>
              <div style={{ width: "10%" }}>
                {Array.from({ length: movie.stars }, (_, index) => (
                  <div key={index} className="m-icon-tiny m-star"></div>
                ))}
              </div>
              <div
                className="m-caveat-brush-list-item"
                style={{ width: "10%" }}
              >
                {movie.watched ? (
                  <div className="m-icon-medium m-3d"></div>
                ) : (
                  ""
                )}
              </div>
              <div
                className="m-caveat-brush-list-item"
                style={{ width: "20%" }}
              >
                {movie.watched_date}
              </div>
              <div
                className="m-caveat-brush-list-item"
                style={{ width: "20%" }}
              >
                {getModeElement(movie.mode)}
              </div>
              <div
                className="m-caveat-brush-list-item"
                style={{ width: "10%" }}
              >
                <button
                  className="m-edit-movie-button m-caveat-brush-date-filter"
                  onClick={() => openEditModal(movie)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div
            className="m-caveat-brush-list-item"
            style={{ textAlign: "center" }}
          >
            No movies found
          </div>
        )}
      </div>
      <div className="m-tf"></div>
    </div>
  );
}

export default MovieList;
