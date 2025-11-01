import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000";

export function StartPage() {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState<{ _id: number; title: string; year: number }[]>([]);
  const [movieId, setMovieId] = useState<number | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/movies`)
      .then((r) => r.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  function startGame(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) {
      alert("Adj meg egy legalább 2 karakteres nevet!");
      return;
    }
    if (!movieId) {
      alert("Válassz egy filmet!");
      return;
    }

    localStorage.setItem("playerName", name.trim());
    localStorage.setItem("movieId", String(movieId));
    navigate("/play");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Harry Potter Kvíz</h1>

        <form onSubmit={startGame} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Add meg a neved:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-slate-300 p-2"
              placeholder="pl. Hermione"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Válassz egy részt:</label>
            <select
              value={movieId}
              onChange={(e) => setMovieId(Number(e.target.value))}
              className="w-full rounded border border-slate-300 p-2"
              required
            >
              <option value="">-- Válassz --</option>
              {movies.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.title} ({m.year})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700"
          >
            Játék indítása ✨
          </button>
        </form>
      </div>
    </div>
  );
}
