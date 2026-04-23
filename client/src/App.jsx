import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ fetch function (مهم لنعيد استخدامه)
  const fetchMovies = () => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movies");
        setLoading(false);
      });
  };

  // ✅ useEffect + auto refresh
  useEffect(() => {
    fetchMovies();

    const interval = setInterval(() => {
      fetchMovies();
    }, 5000); // كل 5 ثواني

    return () => clearInterval(interval);
  }, []);

  // ✅ ADD
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

  // ✅ DELETE
  const deleteMovie = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch(() => setError("Failed to delete movie"));
  };

  // ✅ UPDATE (الجديد 🔥)
  const updateMovie = (id, title, genre) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genre,
      }),
    })
      .then((res) => res.json())
      .then((updatedMovie) => {
        setMovies(
          movies.map((movie) =>
            movie._id === id ? updatedMovie : movie
          )
        );
      })
      .catch(() => setError("Failed to update movie"));
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
          <MovieList
            movies={movies}
            deleteMovie={deleteMovie}
            updateMovie={updateMovie}
          />
        </>
      )}
    </div>
  );
}

export default App;