import { useState, useEffect } from "react";

function EditMovieModal({ isOpen, onClose, movie, onSave }) {
  const [movieData, setMovieData] = useState({
    name: "",
    stars: 5,
    watched: false,
    watched_date: "",
    mode: "nn",
  });

  useEffect(() => {
    if (movie) {
      setMovieData(movie);
    }
  }, [movie]);

  if (!isOpen || !movie) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = () => {
    onSave(movieData);
    onClose();
  };

  return (
    <div className="m-modal" onClick={onClose}>
      <div className="m-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="m-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="m-caveat-brush-list-header">Edit Movie 🎬</h2>
        <div className="m-modal-form-container">
          <div className="m-field-modal-form m-field-modal-form-input">
            <input
              type="text"
              name="name"
              className="m-inputs-filter m-caveat-brush-date-filter"
              value={movieData.name}
              onChange={handleChange}
              placeholder="Movie Name"
              required
            />
          </div>

          <div className="m-field-modal-form">
            <select
              name="stars"
              value={movieData.stars}
              onChange={handleChange}
              className="m-inputs-filter m-caveat-brush-date-filter"
            >
              {[5, 4, 3, 2, 1].map((stars) => (
                <option key={stars} value={stars}>
                  {"⭐".repeat(stars)}
                </option>
              ))}
            </select>
          </div>

          <div className="m-field-modal-form">
            <input
              type="checkbox"
              name="watched"
              checked={movieData.watched}
              onChange={handleChange}
              className="m-checkbox-filter"
            />{" "}
            <div className="m-icon-medium m-3d"></div>
          </div>

          <div className="m-field-modal-form m-field-modal-form-input">
            <input
              type="date"
              name="watched_date"
              className="m-caveat-brush-date-filter m-date-filter-left m-create-movie-date"
              value={movieData.watched_date}
              onChange={handleChange}
              disabled={!movieData.watched}

            />
          </div>

          <div className="m-field-modal-form">
            <select
              name="mode"
              className="m-inputs-filter m-caveat-brush-date-filter"
              value={movieData.mode}
              onChange={handleChange}
            >
              <option value="nn">Unseen</option>
              <option value="tg">Together 💑</option>
              <option value="tp">Teleparty 🔴</option>
              <option value="cn">Cinema 🎬</option>
            </select>
          </div>

          <div className="m-field-modal-form">
            <button 
              onClick={handleSubmit} 
              className="m-apply-button-random m-caveat-brush-date-filter"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMovieModal;
