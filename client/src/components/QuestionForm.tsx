import { useState, useEffect } from "react";
import type { NewQuestion } from "../../../server/src/types/question";
import { OptionInputs } from "./OptionInputs.tsx";
import { StatusMessage } from "./StatusMessage.tsx";

const API = (import.meta.env.VITE_API_URL as string) ?? "http://localhost:4000";

export function QuestionForm() {
  const [text, setText] = useState("");
  const [chapter, setChapter] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState<0 | 1 | 2 | 3>(0);
  const [explanation, setExplanation] = useState("");
  const [movies, setMovies] = useState<
    { _id: number; title: string; year: number }[]
  >([]);
  const [movieId, setMovieId] = useState<number | "">("");
  const [status, setStatus] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  function updateOption(i: number, val: string) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? val : o)));
  }

  function validate(q: NewQuestion): string[] {
    const errs: string[] = [];
    if (q.text.trim().length < 5)
      errs.push("A kérdés legalább 5 karakter legyen.");
    if (q.options.length !== 4) errs.push("Pontosan 4 opció kell.");
    if (q.options.some((o) => o.trim() === ""))
      errs.push("Minden opciót tölts ki.");
    if (q.correctIndex < 0 || q.correctIndex > 3)
      errs.push("Helyes index 0–3.");
    return errs;
  }

  useEffect(() => {
    fetch(`${API}/movies`)
      .then((r) => r.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    const payload: NewQuestion = {
      text: text.trim(),
      options: [options[0], options[1], options[2], options[3]] as [
        string,
        string,
        string,
        string
      ],
      correctIndex,
      movieId: Number(movieId),
      explanation: explanation.trim() || undefined,
    };

    const errs = validate(payload);
    if (errs.length) {
      setStatus({ type: "err", msg: errs.join("\n") });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: "err", msg: `Hiba: ${data?.error ?? res.status}` });
        return;
      }
      setStatus({
        type: "ok",
        msg: `Kérdés sikeresen hozzáadva![ id = ${data.insertedId} ]`,
      });
      setText("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
      setExplanation("");
    } catch (err: any) {
      setStatus({ type: "err", msg: `Hálózati hiba: ${String(err)}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Kérdés szövege</label>
        <textarea
          className="w-full rounded border border-slate-300 p-2"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pl.: Melyik házba kerül Harry?"
          required
          minLength={5}
        />
      </div>

      <OptionInputs options={options} onChange={updateOption} />

      <div>
        <label className="block text-sm font-medium mb-1">
          Helyes válasz indexe
        </label>
        <select
          className="w-full rounded border border-slate-300 p-2"
          value={correctIndex}
          onChange={(e) =>
            setCorrectIndex(Number(e.target.value) as 0 | 1 | 2 | 3)
          }
        >
          {[0, 1, 2, 3].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Fejezet</label>
        <input
          className="w-full rounded border border-slate-300 p-2"
          placeholder="pl. 1. fejezet – A fiú, aki túlélte"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Válaszd ki a filmet:
        </label>
        <select
          className="w-full rounded border border-slate-300 p-2"
          value={movieId}
          onChange={(e) => setMovieId(Number(e.target.value))}
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

      <div>
        <label className="block text-sm font-medium mb-1">
          Magyarázat (opcionális)
        </label>
        <textarea
          className="w-full rounded border border-slate-300 p-2"
          rows={2}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Küldés…" : "Felvétel"}
      </button>

      {status && <StatusMessage type={status.type} message={status.msg} />}
    </form>
  );
}
