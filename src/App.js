import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

import Filters from "./components/Filters";
import MovieList from "./components/MovieList";
import RandomMovie from "./components/RandomMovie";
import EditMovieModal from "./components/EditMovieModal";

const firebaseConfig = {
  apiKey: "AIzaSyAZcX8VYM08ww8jDLC7YJcMER0Ri0L5CBs",
  authDomain: "movie-tracker030333.firebaseapp.com",
  projectId: "movie-tracker030333",
  storageBucket: "movie-tracker030333.firebasestorage.app",
  messagingSenderId: "865442648252",
  appId: "1:865442648252:web:43f270d3f6c03a773600b9",
  measurementId: "G-3WDM37Q4XV",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

// const auth = firebase.auth();
// const firestore = firebase.firestore();

function Modal({ isOpen, onClose, refreshMovies }) {
  const [movieData, setMovieData] = useState({
    name: "",
    stars: 5,
    watched: false,
    watched_date: "",
    mode: "nn",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovieData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
        watched: false,
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

// const loginConGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     await signInWithPopup(auth, provider);
//     console.log("Usuario autenticado");
//   } catch (error) {
//     console.error("Error al autenticar:", error);
//   }
// };

const getMovies = async (filters) => {
  try {
    let peliculasRef = collection(db, "movies");
    let q = query(peliculasRef, orderBy("watched_date", "asc"));
    let snapshot = await getDocs(q);
    let peliculas = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (filters.search) {
      peliculas = peliculas.filter((p) =>
        p.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.rating !== "all") {
      peliculas = peliculas.filter((p) => p.stars === Number(filters.rating));
    }

    if (filters.seen) {
      peliculas = peliculas.filter((p) => p.watched === true);
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

function App() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    rating: "all",
    seen: false,
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
    <div className="App">
      {/* <button onClick={loginConGoogle}>Iniciar sesión con Google</button> */}
      <header className="m-header">
        <div className="m-icon-big m-film-slate"></div>
        <h1 className="m-caveat-brush-title">MOVIE TRACKER</h1>
        <div className="m-icon-big m-popcorn"></div>
      </header>
      <main className="m-body">
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
              prevMovies.map((m) =>
                m.id === updatedMovie.id ? updatedMovie : m
              )
            );
          }}
        />
        <RandomMovie movies={movies} />
      </main>
    </div>
  );
}

export default App;
