"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function DropDown({
  children,
  trigger,
  align = "right",
  width = "48",
  contentClasses = "py-1 bg-white",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside of the component
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close if clicked outside
      }
      //   event.stopPropagation();
    };

    // Adding event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // align == "right"(default)
  let alignment_classes = "ltr:origin-top-right rtl:origin-top-left end-0";
  if (align == "left")
    alignment_classes = "ltr:origin-top-left rtl:origin-top-right start-0";
  else if (align == "top") alignment_classes = "origin-top";

  if (width == "48") width = "w-48";

  const toggleIsOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* @click.outside="open = false" @close.stop="open = false" */}
      <div onClick={toggleIsOpen}>{trigger}</div>
      {/* x-transition:enter="transition ease-out duration-200"
      x-transition:enter-start="opacity-0 scale-95"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-75"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-95" */}
      <div
        className={clsx(
          "absolute z-50 mt-2 rounded-md shadow-lg",
          alignment_classes,
          width,
          isOpen ? "!block" : "hidden"
        )}
        onClick={toggleIsOpen}
      >
        <div
          className={clsx(
            "rounded-md ring-1 ring-black ring-opacity-5",
            contentClasses,
            isOpen ? "block" : "hidden"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
