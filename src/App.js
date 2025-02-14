import { useState } from "react";
import "./App.css";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="m-modal" onClick={onClose}>
      <div className="m-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="m-close-btn" onClick={onClose}>&times;</button>
        <h2 className="m-caveat-brush-list-header">Create Movie 🎬</h2>
        <div className="m-modal-form-container">
          <input type="text" className="m-inputs-filter" placeholder="Movie Name" />
          <select className="m-inputs-filter">
            {[5, 4, 3, 2, 1].map((stars) => (
              <option key={stars} value={stars}>{"⭐".repeat(stars)}</option>
            ))}
          </select>
          <input type="checkbox" className="m-checkbox-filter" /> Seen
          <input type="date" className="m-date-filter-left" />
          <select className="m-inputs-filter">
            <option value="tg">Together 💑</option>
            <option value="tp">Teleparty 🔴</option>
            <option value="cn">Cinema 🎬</option>
          </select>
          <button className="m-apply-button-random">Create</button>
        </div>
      </div>
    </div>
  );
}

function Filters() {
  return (
    <div className="m-filters">
      <h3 className="m-caveat-brush-list-header">Filters</h3>
      <input type="search" className="m-inputs-filter" placeholder="Search" />
      <select className="m-inputs-filter">
        <option value="all">All</option>
        {[5, 4, 3, 2, 1].map((stars) => (
          <option key={stars} value={stars}>{"⭐".repeat(stars)}</option>
        ))}
      </select>
      <input type="checkbox" className="m-checkbox-filter" /> Seen
      <input type="date" className="m-date-filter-left" /> -
      <input type="date" className="m-date-filter-right" />
      <select className="m-inputs-filter">
        <option value="all">All</option>
        <option value="tg">Together 💑</option>
        <option value="tp">Teleparty 🔴</option>
        <option value="cn">Cinema 🎬</option>
      </select>
      <button className="m-apply-button-filter">Reset</button>
      <button className="m-apply-button-filter">Apply</button>
    </div>
  );
}

function MovieList({ onOpenModal }) {
  return (
    <div className="m-table">
      <button className="m-new-movie-button" onClick={onOpenModal}>New Movie</button>
      <div className="m-th">
        <div style={{ width: "30%" }}>Movie Title</div>
        <div style={{ width: "10%" }}>⭐</div>
        <div style={{ width: "20%" }}>Seen</div>
        <div style={{ width: "20%" }}>Date</div>
        <div style={{ width: "20%" }}>Mode</div>
      </div>
      <div className="m-tb">Movie list here</div>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="App">
      <header className="m-header">
        <h1 className="m-caveat-brush-title">MOVIE TRACKER</h1>
      </header>
      <main className="m-body">
        <Filters />
        <MovieList onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
