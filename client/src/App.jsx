import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);

  // ✅ حالات loading + error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies");
        setLoading(false);
  }, 2000); // ⬅️ تأخير 2 ثانية
  }, []);

  const addMovie = (title, genre) => {
    fetch("http://localhost:5000/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genre,
        releaseYear: 2024,
        averageRating: 5,
      }),
    })
      .then((res) => res.json())
      .then((newMovie) => {
        setMovies([...movies, newMovie]);
      })
      .catch(() => setError("Failed to add movie"));
  };

  const deleteMovie = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch(() => setError("Failed to delete movie"));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Movie App 🎬</h1>

      {/* ⏳ Loading */}
      {loading && <p>Loading movies...</p>}

      {/* ❌ Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ✅ Main UI */}
      {!loading && !error && (
        <>
          <MovieForm addMovie={addMovie} />
          <MovieList movies={movies} deleteMovie={deleteMovie} />
        </>
      )}
    </div>
  );
}

export default App;