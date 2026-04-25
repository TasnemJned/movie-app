import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("");

  // ===== Fetch Movies =====
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

  // ===== Auto Refresh =====
  useEffect(() => {
    fetchMovies();

    const interval = setInterval(() => {
      fetchMovies();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ===== ADD =====
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

  // ===== DELETE =====
  const deleteMovie = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch(() => setError("Failed to delete movie"));
  };

  // ===== UPDATE =====
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

  // ===== FILTER =====
  const filteredMovies = movies.filter((movie) =>
    movie.genre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="title">Movie App</h1>

      <input
        type="text"
        placeholder="Filter by genre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="filter-input"
      />

      {loading && <p>Loading movies...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <MovieForm addMovie={addMovie} />
          <MovieList
            movies={filteredMovies}
            deleteMovie={deleteMovie}
            updateMovie={updateMovie}
          />
        </>
      )}
    </div>
  );
}

export default App;