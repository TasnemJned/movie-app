import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const addMovie = () => {
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
        setTitle("");
        setGenre("");
      });
  };

  // 🔥 DELETE
  const deleteMovie = (id) => {
    fetch(`http://localhost:5000/api/movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      setMovies(movies.filter((movie) => movie._id !== id));
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Movie App 🎬</h1>

      {/* ➕ Add Movie */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      {/* 🎬 Movies */}
      {movies.map((movie) => (
        <div
          key={movie._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px auto",
            padding: "10px",
            width: "300px",
            borderRadius: "10px",
          }}
        >
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <p>⭐ {movie.averageRating}</p>

          {/* ❌ Delete Button */}
          <button onClick={() => deleteMovie(movie._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;