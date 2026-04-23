function MovieList({ movies, deleteMovie }) {
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

          <button onClick={() => deleteMovie(movie._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default MovieList;