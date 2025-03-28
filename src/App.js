import "./App.css";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Movies from "./pages/Movies";
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
        return "MOVIE TRACKER";
      case "/food":
        return "FOOD";
      case "/games":
        return "GAMES";
      case "/travel":
        return "TRAVEL";
      default:
        return "MOVIE TRACKER";
    }
  };

  return (
    <header className="m-header">
      <div className="m-icon-big m-film-slate"></div>
      <h1 className="m-caveat-brush-title">{getTitle()}</h1>
      <div className="m-icon-big m-popcorn"></div>
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
          </Routes>
        </main>
        
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
