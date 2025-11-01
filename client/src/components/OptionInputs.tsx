type Props = {
  options: string[];
  onChange: (index: number, value: string) => void;
};

export function OptionInputs({ options, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt, i) => (
        <div key={i}>
          <label className="block text-sm font-medium mb-1">Opció {i + 1}</label>
          <input
            className="w-full rounded border border-slate-300 p-2"
            value={opt}
            onChange={(e) => onChange(i, e.target.value)}
            required
          />
        </div>
      ))}
    </div>
  );
}
