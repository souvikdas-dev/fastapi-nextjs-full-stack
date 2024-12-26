import Link from "next/link";

export default function DropDownLink({ children, ...props }) {
  return (
    <Link
      className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out text-start hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
      {...props}
    >
      {children}
    </Link>
  );
}
