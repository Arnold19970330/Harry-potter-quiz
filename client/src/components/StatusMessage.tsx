type Props = {
  type: "ok" | "err";
  message: string;
};

export function StatusMessage({ type, message }: Props) {
  const color = type === "ok" ? "text-green-700" : "text-red-700";
  return <p className={`${color} whitespace-pre-wrap font-bold`}>{message}</p>;
}
