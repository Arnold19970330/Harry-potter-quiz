import { useEffect, useState } from "react";

type PlayQuestion = { id: string; text: string; options: [string, string, string, string] };
const API = (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000";

export function PlayPage() {
  const [q, setQ] = useState<PlayQuestion | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ correct: boolean; correctIndex: number } | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadRandom() {
    setLoading(true);
    setSelected(null);
    setResult(null);
    try {
      const res = await fetch(`${API}/questions/random`);
      const data = await res.json();
      setQ(data);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!q || selected === null) return;
    setChecking(true);
    try {
      const res = await fetch(`${API}/questions/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: q.id, answerIndex: selected }),
      });
      const data = await res.json();
      setResult(data); // { correct, correctIndex }
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    loadRandom();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl p-6 space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Harry Potter kvíz</h1>
          <a href="/admin/new" className="text-sm text-indigo-700 hover:underline">+ Új kérdés</a>
        </header>

        <div className="bg-white rounded-xl shadow p-6">
          {loading && <p>Betöltés…</p>}
          {!loading && q && (
            <>
              <p className="text-lg font-medium mb-4">{q.text}</p>
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((o, i) => {
                  const isSel = selected === i;
                  const isCorrect = result && result.correctIndex === i;
                  const isWrong = result && isSel && !result.correct;

                  return (
                    <button
                      key={i}
                      onClick={() => result ? null : setSelected(i)}
                      className={[
                        "text-left rounded border px-4 py-3",
                        isSel ? "border-indigo-600 ring-2 ring-indigo-200" : "border-slate-300",
                        isCorrect ? "bg-green-100 border-green-600" : "",
                        isWrong ? "bg-red-100 border-red-600" : "",
                      ].join(" ")}
                    >
                      <span className="mr-2 font-mono text-slate-500">{i}.</span>
                      {o}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center gap-3">
                {!result ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selected === null || checking}
                    className="rounded bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {checking ? "Ellenőrzés…" : "Válasz elküldése"}
                  </button>
                ) : (
                  <>
                    <span className={result.correct ? "text-green-700" : "text-red-700"}>
                      {result.correct ? "Helyes! 🎉" : `Helytelen. A helyes válasz indexe: ${result.correctIndex}.`}
                    </span>
                    <button
                      onClick={loadRandom}
                      className="rounded border border-slate-300 px-3 py-2 hover:bg-slate-100"
                    >
                      Következő kérdés
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
