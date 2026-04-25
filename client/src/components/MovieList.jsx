function MovieList({ movies, deleteMovie, updateMovie }) {
  const handleEdit = (movie) => {
    const newTitle = prompt("Enter new title:", movie.title);
    const newGenre = prompt("Enter new genre:", movie.genre);

    if (!newTitle || !newGenre) return;

    updateMovie(movie._id, newTitle, newGenre);
  };

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-card">
          <h3>{movie.title}</h3>
          <p>{movie.genre}</p>
          <p>⭐ {movie.averageRating}</p>

          <button onClick={() => handleEdit(movie)}>Edit</button>
          <button onClick={() => deleteMovie(movie._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;