import { useState } from "react";

function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = () => {
    // ✅ منع الإضافة إذا الحقول فاضية
    if (!title.trim() || !genre.trim()) {
      alert("Please fill all fields");
      return;
    }

    addMovie(title, genre);

    // ✅ تفريغ الحقول بعد الإضافة
    setTitle("");
    setGenre("");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "5px" }}
      />

      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        style={{ marginRight: "5px" }}
      />

      <button onClick={handleSubmit}>Add Movie</button>
    </div>
  );
}

export default MovieForm;