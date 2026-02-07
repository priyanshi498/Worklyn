export const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { className = "", ...rest } = props;

  return (
    <input
      className={`w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
      {...rest}
    />
  );
};
