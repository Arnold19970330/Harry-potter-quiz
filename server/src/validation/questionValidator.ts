import { NewQuestion } from "../types/question";

export type Validation = { ok: true } | { ok: false; errors: string[] };

export function validateNewQuestion(body: any): Validation {
  const errors: string[] = [];

  // alap forma
  if (typeof body !== "object" || body === null) {
    return { ok: false, errors: ["Body must be an object"] };
  }

  // text
  if (typeof body.text !== "string" || body.text.trim().length < 5) {
    errors.push("Text must be a string with at least 5 characters.");
  }

  // options
  if (!Array.isArray(body.options) || body.options.length !== 4) {
    errors.push("Options must be an array of exactly 4 strings.");
  } else if (!body.options.every((o: unknown) => typeof o === "string" && o.trim() !== "")) {
    errors.push("Each option must be a non-empty string.");
  }

  // correctIndex
  if (!Number.isInteger(body.correctIndex) || body.correctIndex < 0 || body.correctIndex > 3) {
    errors.push("correctIndex must be an integer between 0 and 3.");
  }

  // explanation (opcionális)
  if (body.explanation !== undefined && typeof body.explanation !== "string") {
    errors.push("explanation must be a string if provided.");
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}

/** kis segéd: limit normalizálás */
export function parseLimit(q: unknown, def = 10, min = 1, max = 50): number {
  const n = Number(q ?? def);
  if (!Number.isFinite(n)) return def;
  return Math.max(min, Math.min(max, Math.trunc(n)));
}
