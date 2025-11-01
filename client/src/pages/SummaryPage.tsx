import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function SummaryPage() {
  const [summary, setSummary] = useState<{
    total: number;
    correct: number;
    percent: number;
  } | null>(null);

  const navigate = useNavigate();
  const gameId = localStorage.getItem("gameId");
  const playerName = localStorage.getItem("playerName");

  useEffect(() => {
    if (!gameId) {
      navigate("/");
      return;
    }
    loadSummary();
  }, []);

  async function loadSummary() {
    const res = await fetch(`${API}/game/summary/${gameId}`);
    const data = await res.json();
    setSummary(data);
  }

  function restartGame() {
    localStorage.removeItem("gameId");
    navigate("/"); // visszavisz a játékhoz
  }

  if (!summary)
    return <p className="text-center mt-10 text-slate-500">Eredmény betöltése...</p>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-700">
          🎉 Kvíz vége, {playerName}!
        </h1>

        <p className="text-lg text-slate-700 mb-4">
          Összesen <strong>{summary.total}</strong> kérdésre válaszoltál.
        </p>
        <p className="text-lg text-slate-700 mb-6">
          Helyes válaszok:{" "}
          <span className="font-semibold text-green-600">
            {summary.correct}/{summary.total}
          </span>
        </p>

        <div className="w-full bg-slate-200 rounded-full h-5 mb-4 overflow-hidden">
          <div
            className={`h-5 ${
              summary.percent >= 80
                ? "bg-green-500"
                : summary.percent >= 50
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${summary.percent}%` }}
          ></div>
        </div>

        <p className="text-xl font-semibold mb-6">
          🎯 {summary.percent}% pontosság
        </p>

        <button
          onClick={restartGame}
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition"
        >
          Új játék indítása
        </button>
      </div>
    </div>
  );
}
