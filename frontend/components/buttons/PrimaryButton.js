import { clsx } from "clsx";

export default function PrimaryButton({
  children,
  type = "submit",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center px-4 py-2 bg-gray-800 disabled:bg-gray-600 disabled:pointer-events-none select-none border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
