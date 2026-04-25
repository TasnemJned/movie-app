function MovieList({ movies, deleteMovie, updateMovie }) {

  const handleEdit = (movie) => {
    const newTitle = prompt("Enter new title:", movie.title);
    const newGenre = prompt("Enter new genre:", movie.genre);

    if (!newTitle || !newGenre) return;

    updateMovie(movie._id, newTitle, newGenre);
  };

  // ✅ DELETE CONFIRMATION
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (!confirmDelete) return;

    deleteMovie(id);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">

          {/* 🎬 Title */}
          <h3>{movie.title}</h3>

          {/* 🎭 Genre */}
          <p className="genre">{movie.genre}</p>

          {/* 🎥 Director (NEW 🔥) */}
          <p className="director">
            🎬 {movie.director || "Unknown"}
          </p>

          {/* ⭐ Rating */}
          <p className="rating">⭐ {movie.averageRating}</p>

          {/* 🔘 Buttons */}
          <div className="buttons">
            <button
              className="edit-btn"
              onClick={() => handleEdit(movie)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(movie._id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default MovieList;