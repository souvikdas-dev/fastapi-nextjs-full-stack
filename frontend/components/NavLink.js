import clsx from "clsx";
import Link from "next/link";

export default function NavLink({ children, active, className, ...props }) {
  const classes =
    active ?? false
      ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out"
      : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out";

  return (
    <Link className={clsx(classes, className)} {...props}>
      {children}
    </Link>
  );
}
