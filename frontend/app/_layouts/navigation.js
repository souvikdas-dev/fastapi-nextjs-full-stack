"use client";
import DropDown from "@/components/DropDown";
import DropDownLink from "@/components/DropDownLink";
import NavLink from "@/components/NavLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logout } from "../_actions/auth";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100">
      {/* <!-- Primary Navigation Menu --> */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* <!-- Logo --> */}
            <div className="flex items-center shrink-0">
              <a href="{{ route('dashboard') }}">
                {/* <x-application-logo className="block w-auto text-gray-800 fill-current h-9" /> */}
                <Image
                  // className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                />
              </a>
            </div>

            {/* <!-- Navigation Links --> */}
            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
              <NavLink href="/dashboard" active={pathname === "/dashboard"}>
                Dashboard
              </NavLink>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
              <NavLink href="/users" active={pathname === "/users"}>
                User
              </NavLink>
            </div>
          </div>

          {/* <!-- Settings Dropdown --> */}
          <div className="hidden sm:flex sm:items-center sm:ms-6">
            <DropDown
              align="right"
              width="48"
              trigger={
                <button className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none">
                  <div>User Name</div>

                  <div className="ms-1">
                    <svg
                      className="w-4 h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              }
            >
              <DropDownLink href="/profile">Profile</DropDownLink>
              <button
                type="button"
                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out text-start hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                Button
              </button>
              {/* Authentication */}
              <form action={logout}>
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out text-start hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                >
                  Log Out
                </button>
              </form>
            </DropDown>
          </div>

          {/* <!-- Hamburger --> */}
          <div className="flex items-center -me-2 sm:hidden">
            <button className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500">
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className="inline-flex"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                {/* <path :className="{'hidden': ! open, 'inline-flex': open }" className="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /> */}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Responsive Navigation Menu --> */}
      {/* 
      //......
      */}
    </nav>
  );
}
