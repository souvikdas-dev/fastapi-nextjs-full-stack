import clsx from "clsx";

export default function InputError({ messages, className, ...props }) {
  return (
    messages && (
      <ul className={clsx("space-y-1 text-sm text-red-600", className)} {...props}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    )
  );
}
