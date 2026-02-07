interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "sm" | "icon";
}

export const Button = ({
  children,
  variant = "default",
  size,
  className = "",
  ...props
}: ButtonProps) => {
  const base = "rounded-md font-medium transition";

  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    icon: "p-1",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size || "sm"]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
