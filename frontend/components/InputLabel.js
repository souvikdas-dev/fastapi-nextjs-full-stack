import { clsx } from "clsx";

export default function InputLabel({
  children,
  htmlFor,
  value,
  className,
  props,
}) {
  return (
    <label
      className={clsx("block font-medium text-sm text-gray-700", className)}
      htmlFor={htmlFor}
      {...props}
    >
      {value ?? children}
    </label>
  );
}
