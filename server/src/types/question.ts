export interface Question {
  _id?: string; // Mongo automatikusan ad egy _id-t
  text: string;
  options: [string, string, string, string]; // pontosan 4 opció
  correctIndex: 0 | 1 | 2 | 3; // 0–3 közötti szám
  explanation?: string;
  createdAt?: Date;
}

export type NewQuestion = Omit<Question, "_id" | "createdAt">;
