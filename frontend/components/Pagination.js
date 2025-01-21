"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Pagination({
  total,
  perPage,
  lastPage,
  items = [],
  from = 0,
  to = 0,
  onEachSide = 2,
  className,
  ...props
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //   console.log("pathname=", pathname);
  //   console.log("searchParams=", searchParams.toString());

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const getPaginateUrl = (page) => {
    return page ? pathname + "?" + createQueryString("page", page) : null;
  };

  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  //   console.log("currentPage=", currentPage);

  // Get the number of items for the current page.
  const count = items?.length;
  //   console.log("count=", count);

  function paginate(totalPages, currentPage, onEachSide, ellipsis = "...") {
    totalPages = parseInt(totalPages);
    currentPage = parseInt(currentPage);
    onEachSide = parseInt(onEachSide);
    // Input validation
    if (
      typeof totalPages !== "number" ||
      typeof currentPage !== "number" ||
      typeof onEachSide !== "number"
    ) {
      throw new Error(
        "totalPages, currentPage, and onEachSide must be numbers"
      );
    }

    // if (
    //   totalPages < 1 ||
    //   currentPage < 1 ||
    //   currentPage > totalPages ||
    //   onEachSide < 0
    // ) {
    //   throw new Error("Invalid input values");
    // }

    const pages = [];
    const startPage = Math.max(1, currentPage - onEachSide);
    const endPage = Math.min(totalPages, currentPage + onEachSide);

    // Add the first page if necessary
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push(ellipsis); // Indicate skipped pages
      }
    }

    // Add the pages in the range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add the last page if necessary
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(ellipsis); // Indicate skipped pages
      }
      pages.push(totalPages);
    }

    // Previous and Next page links
    const _previous_page = currentPage > 1 ? currentPage - 1 : null;
    const prev_page_url = getPaginateUrl(_previous_page);
    const _next_page = currentPage < lastPage ? currentPage + 1 : null;
    const next_page_url = getPaginateUrl(_next_page);

    return {
      pages,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
      previousPageUrl: prev_page_url,
      nextPageUrl: next_page_url,
    };
  }

  const { pages, hasPrevious, hasNext, previousPageUrl, nextPageUrl } =
    paginate(lastPage, currentPage, onEachSide);
  //   console.log("pages=", pages);

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={clsx(
        "sm:flex-1 sm:flex sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="hidden sm:block">
        <p className="text-sm leading-5 text-gray-700 ">
          Showing
          {from ? (
            <>
              <span className="font-medium"> {from} </span>to
              <span className="font-medium"> {to} </span>
            </>
          ) : (
            count
          )}
          of
          <span className="font-medium text-blue-700"> {total} </span>
          results
        </p>
      </div>

      <div className="relative z-0 flex sm:inline-flex justify-between rounded-md gap-x-1.5 rtl:flex-row-reverse">
        {/* {{-- Previous Page Link --}} */}
        {hasPrevious ? (
          <Link
            href={previousPageUrl}
            rel="prev"
            className="relative inline-flex items-center justify-center py-2 pl-2 pr-3 text-xs font-medium leading-5 text-black transition duration-150 ease-in-out bg-white border rounded-md sm:border-transparent sm:bg-transparent hover:border-gray-300 hover:bg-gray-200 focus:outline-none"
            aria-label="previous"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            PREV
          </Link>
        ) : (
          <span aria-disabled="true" aria-label="previous">
            <span
              className="relative inline-flex items-center py-2 pl-2 pr-3 text-xs font-medium leading-5 text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              aria-hidden="true"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              PREV
            </span>
          </span>
        )}

        {/* -- Pagination Elements -- */}
        {pages.map((page, index) => {
          if (typeof page === "string") {
            // -- "Three Dots" Separator --
            return (
              <span aria-disabled="true" key={"..." + index}>
                <span className="relative items-center hidden px-4 py-2 -ml-px text-xs font-medium leading-5 text-gray-700 bg-transparent cursor-default sm:inline-flex">
                  {page}
                </span>
              </span>
            );
          } else {
            return page == currentPage ? (
              <span aria-current="page" key={`${page}-${index}`}>
                <span className="relative items-center hidden px-4 py-2 -ml-px text-xs font-medium leading-5 text-black bg-white border border-gray-500 rounded-md shadow-sm cursor-default sm:inline-flex">
                  {page}
                </span>
              </span>
            ) : (
              <Link
                href={pathname + "?" + createQueryString("page", page)}
                className="relative items-center hidden px-4 py-2 -ml-px text-xs font-medium leading-5 text-black transition duration-150 ease-in-out bg-transparent rounded-md sm:inline-flex hover:bg-gray-200 focus:outline-none"
                aria-label="{{ __('Go to page :page', ['page' => $page]) }}"
                key={`${page}-${index}`}
              >
                {page}
              </Link>
            );
          }
        })}

        {/* {{-- Next Page Link --}} */}
        {hasNext ? (
          <Link
            href={nextPageUrl}
            rel="next"
            className="relative inline-flex items-center justify-center py-2 pl-3 pr-2 text-xs font-medium leading-5 text-black transition duration-150 ease-in-out bg-white border rounded-md sm:bg-transparent sm:border-transparent hover:border-gray-300 hover:bg-gray-200 focus:outline-none"
            aria-label="next"
          >
            NEXT
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <span aria-disabled="true" aria-label="next">
            <span
              className="relative inline-flex items-center py-2 pl-3 pr-2 text-xs font-medium leading-5 text-gray-500 bg-gray-200 border border-gray-300 rounded-md cursor-not-allowed"
              aria-hidden="true"
            >
              NEXT
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </span>
        )}
      </div>
    </nav>
  );
}
