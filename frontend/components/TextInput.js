import clsx from "clsx";

export default function TextInput({ type = "text", className, ...props }) {
  return (
    <input
      type={type}
      className={clsx(
        "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
        className
      )}
      {...props}
    />
  );
}
