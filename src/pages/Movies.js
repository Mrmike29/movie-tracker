import { useCallback, useEffect, useState } from "react";

import Filters from "../components/movies/Filters";
import MovieList from "../components/movies/MovieList";
import RandomMovie from "../components/movies/RandomMovie";
import EditMovieModal from "../components/movies/EditMovieModal";
import "../css/Movies.css";

import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

function Modal({ isOpen, onClose, refreshMovies }) {
  const [movieData, setMovieData] = useState({
    name: "",
    stars: 5,
    watched: "unseen",
    watched_date: "",
    mode: "nn",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovieData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "seen" : "unseen") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "movies"), {
        ...movieData,
        watched_date: movieData.watched_date ? movieData.watched_date : null,
      });
      alert("Movie added successfully!");
      setMovieData({
        name: "",
        stars: 5,
        watched: "unseen",
        watched_date: "",
        mode: "nn",
      });

      refreshMovies();
      onClose();
    } catch (error) {
      console.error("Error adding movie: ", error);
    }
  };

  return (
    <div className="m-modal" onClick={onClose}>
      <div className="m-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="m-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="m-caveat-brush-list-header">Create Movie 🎬</h2>
        <form className="m-modal-form-container" onSubmit={handleSubmit}>
          <div className="m-field-modal-form m-field-modal-form-input">
            <input
              type="text"
              name="name"
              className="m-inputs-filter m-caveat-brush-date-filter"
              placeholder="Movie Name"
              value={movieData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="m-field-modal-form">
            <select
              name="stars"
              className="m-inputs-filter m-caveat-brush-date-filter"
              value={movieData.stars}
              onChange={handleChange}
            >
              {[5, 4, 3, 2, 1].map((stars) => (
                <option key={stars} value={stars}>
                  {"⭐".repeat(stars)}
                </option>
              ))}
            </select>
          </div>

          <div className="m-field-modal-form m-caveat-brush-date-filter">
            <input
              type="checkbox"
              name="watched"
              checked={movieData.watched === "seen"}
              onChange={handleChange}
              className="m-checkbox-filter"
            />{" "}
            Seen
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
              type="submit"
              className="m-apply-button-random m-caveat-brush-date-filter"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const getMovies = async (filters) => {
  try {
    // 1. Obtener las películas desde Firestore
    const peliculasRef = collection(db, "movies");
    const q = query(peliculasRef, orderBy("watched_date", "asc"));
    const snapshot = await getDocs(q);

    // 2. Transformar datos
    let peliculas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (filters.search) {
      peliculas = peliculas.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.rating !== "all") {
      peliculas = peliculas.filter((p) => p.stars === Number(filters.rating));
    }

    if (filters.seen !== "all") {
      peliculas = peliculas.filter((p) => p.watched === filters.seen);
    }

    if (filters.startDate && filters.endDate) {
      peliculas = peliculas.filter((p) => {
        const fechaPelicula = p.watched_date;
        return (
          fechaPelicula >= filters.startDate && fechaPelicula <= filters.endDate
        );
      });
    }

    if (filters.mode !== "all") {
      peliculas = peliculas.filter((p) => p.mode === filters.mode);
    }

    return peliculas;
  } catch (error) {
    console.error("Error al obtener películas:", error);
    return [];
  }
};

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    rating: "all",
    seen: "all",
    startDate: "",
    endDate: "",
    mode: "all",
  });

  const refreshMovies = useCallback(async () => {
    const data = await getMovies(filters);
    setMovies(data);
  }, [filters]);

  useEffect(() => {
    refreshMovies();
  }, [refreshMovies]); // Ahora no habrá advertencias

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openEditModal = (movie) => {
    setSelectedMovie(movie);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMovie(null);
  };
  return (
    <>
      <Filters setFilters={setFilters} />
      <MovieList
        movies={movies}
        onOpenModal={() => setIsModalOpen(true)}
        openEditModal={openEditModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refreshMovies={refreshMovies}
      />
      <EditMovieModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        movie={selectedMovie}
        onSave={async (updatedMovie) => {
          const movieRef = doc(db, "movies", updatedMovie.id);

          await updateDoc(movieRef, {
            name: updatedMovie.name,
            stars: updatedMovie.stars,
            watched: updatedMovie.watched,
            watched_date: updatedMovie.watched_date
              ? updatedMovie.watched_date
              : null,
            mode: updatedMovie.mode,
          });
          setMovies((prevMovies) =>
            prevMovies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
          );
        }}
      />
      <RandomMovie movies={movies} />
    </>
  );
}

export default Movies;
