function MovieList({ movies, deleteMovie, updateMovie }) {
  const handleEdit = (movie) => {
    const newTitle = prompt("Enter new title:", movie.title);
    const newGenre = prompt("Enter new genre:", movie.genre);

    if (!newTitle || !newGenre) return;

    updateMovie(movie._id, newTitle, newGenre);
  };

  return (
    <div>
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