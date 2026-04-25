function MovieList({ movies, deleteMovie, updateMovie }) {

  const handleEdit = (movie) => {
    const newTitle = prompt("Enter new title:", movie.title);
    const newGenre = prompt("Enter new genre:", movie.genre);

    if (!newTitle || !newGenre) return;

    updateMovie(movie._id, newTitle, newGenre);
  };

  // ✅ DELETE CONFIRMATION (المطلوب)
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmDelete) return;

    deleteMovie(id);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <p>⭐ {movie.averageRating}</p>

          <div className="buttons">
            <button onClick={() => handleEdit(movie)}>Edit</button>

            {/* ✅ بدلنا delete */}
            <button onClick={() => handleDelete(movie._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;