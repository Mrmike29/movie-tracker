import "./App.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Movies from "./pages/Movies";
import Food from "./pages/Food";
import Games from "./pages/Games";
import Travel from "./pages/Travel";
import Navbar from "./components/Navbar";

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// const auth = getAuth(app);

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const loginConGoogle = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     await signInWithPopup(auth, provider);
//     console.log("Usuario autenticado");
//   } catch (error) {
//     console.error("Error al autenticar:", error);
//   }
// };

function Header() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/movie-tracker":
        return (
          <>
            <div className="m-icon-big m-film-slate"></div>
              <h1 className="m-caveat-brush-title">MOVIE TRACKER</h1>
            <div className="m-icon-big m-popcorn"></div>
          </>
        )
      case "/food":
        return (
          <>
            <div className="m-icon-big m-pizza"></div>
              <h1 className="m-caveat-brush-title">FOOD</h1>
            <div className="m-icon-big m-cheesecake"></div>
          </>
        )
      case "/games":
        return (
          <>
            <div className="m-icon-big m-puzzle"></div>
              <h1 className="m-caveat-brush-title">GAMES</h1>
            <div className="m-icon-big m-console"></div>
          </>
        )
      case "/travel":
        return (
          <>
            <div className="m-icon-big m-travel"></div>
              <h1 className="m-caveat-brush-title">TRAVEL</h1>
            <div className="m-icon-big m-luggage"></div>
          </>
        )
      default:
        return (
          <>
            <div className="m-icon-big m-film-slate"></div>
              <h1 className="m-caveat-brush-title">MOVIE TRACKER</h1>
            <div className="m-icon-big m-popcorn"></div>
          </>
        )
    }
  };

  return (
    <header className="m-header">
      {getTitle()}
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* <button onClick={loginConGoogle}>Iniciar sesión con Google</button> */}
        <Header />

        <main className="m-body">
          <Routes>
            <Route path="/movie-tracker" element={<Movies />} />
            <Route path="/food" element={<Food />} />
            <Route path="/games" element={<Games />} />
            <Route path="/travel" element={<Travel />} />
          </Routes>
        </main>
        
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
