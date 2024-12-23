import { clsx } from "clsx";

export default function InputLabel({ children, value, className, props }) {
  return (
    <label
      className={clsx("block font-medium text-sm text-gray-700", className)}
      {...props}
    >
      {value ?? children}
    </label>
  );
}
