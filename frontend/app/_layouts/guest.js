import Image from "next/image";
import Link from "next/link";

export default function GuestLayout({ children }) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0">
      <div>
        <Link href="/">
          {/* <x-application-logo class="w-20 h-20 fill-current text-gray-500" /> */}

          <Image
            // className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
