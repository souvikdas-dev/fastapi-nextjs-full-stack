import clsx from "clsx";

export default function Modal({
  children,
  name,
  show = true,
  maxWidth = "2xl",
  openModal,
  closeModal,
  ...props
}) {
  const max_width = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  }[maxWidth];

  return (
    <div
      style={{
        display: show ? "block" : "none",
      }}
      className="fixed inset-0 z-50 px-4 py-6 overflow-y-auto sm:px-0"
    >
      <div
        style={{
          display: show ? "block" : "none",
        }}
        className="fixed inset-0 transition-all transform"
      >
        <div
          onClick={closeModal}
          className="absolute inset-0 bg-gray-500 opacity-75"
        ></div>
      </div>

      <div
        style={{
          display: show ? "block" : "none",
        }}
        className={clsx(
          "mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto",
          max_width
        )}
      >
        {children}
      </div>
    </div>
  );
}
