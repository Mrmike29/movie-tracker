import { Link } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  return (
    <footer className="m-footer">
      <nav className="m-footer-nav">
        <Link to="/movie-tracker" className="m-footer-link m-caveat-brush-list-item">🎬 Movie Tracker</Link>
        <Link to="/movie-tracker" className="m-footer-link-mobile m-caveat-brush-list-item">🎬</Link>
        <Link to="/food" className="m-footer-link m-caveat-brush-list-item">🍽️ Food</Link>
        <Link to="/food" className="m-footer-link-mobile m-caveat-brush-list-item">🍽️</Link>
        <Link to="/games" className="m-footer-link m-caveat-brush-list-item">🕹️ Games</Link>
        <Link to="/games" className="m-footer-link-mobile m-caveat-brush-list-item">🕹️</Link>
        <Link to="/travel" className="m-footer-link m-caveat-brush-list-item m-no-border">🗺️ Travel</Link>
        <Link to="/travel" className="m-footer-link-mobile m-caveat-brush-list-item m-no-border">🗺️</Link>
      </nav>
    </footer>
  );
}

export default Navbar;
