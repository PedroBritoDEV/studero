export default function Input({
  label,
  ...props  
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-body font-medium">{label}</label>
      <input
        {...props}
        className="bg-surface/70 text-body h-10 rounded-3xl px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}