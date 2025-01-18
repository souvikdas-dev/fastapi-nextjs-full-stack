export const formatErrors = (errors) => {
  if (errors instanceof Array)
    return errors.reduce((acc, obj) => {
      const key = obj.loc[1] ?? "server_errors";
      // Initialize object attribute if not present
      if (!acc[key]) acc[key] = [];
      acc[key].push(obj.msg);
      return acc;
    }, {});
  else
    return {
      server_errors: [errors],
    };
};

export const extractFormFields = (formData, fields = []) => {
  // Input validation
  if (typeof formData !== "object" || formData === null) {
    throw new TypeError("formData must be an object");
  }

  // Use reduce to build the result object
  return fields.reduce((acc, field) => {
    if (formData.has(field)) {
      acc[field] = formData.get(field);
    }
    return acc;
  }, {});
};

export function wait(seconds = 1.5) {
  // default wait for 1.5 seconds
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

class Paginator {
  constructor(currentPage, totalPages, perPage, items = []) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.perPage = perPage;
    this.items = items;
  }

  // Get the number of items for the current page.
  count() {
    return this.items.length;
  }

  // Get the result number of the first item in the results.
  firstItem() {
    return this.items.length > 0
      ? this.currentPage - 1 * this.perPage + 1
      : null;
  }

  // Determine if there are enough items to split into multiple pages.
  hasPages() {}

  // Determine if there are more items in the data store.
  hasMorePages() {
    return currentPage < totalPages;
  }

  // Get the result number of the last item in the results.
  lastItem() {
    return this.items.length > 0
      ? this.firstItem() + this.items.length - 1
      : null;
  }

  // Determine if the paginator is on the first page.
  onFirstPage() {
    return currentPage === 1;
  }

  // Determine the total number of matching items in the data store.
  total() {
    return 50;
  }

  links() {
    return {
      current_page: this.currentPage(),
      data: this.items.toArray(),
      first_page_url: this.url(1),
      from: this.firstItem(),
      next_page_url: this.nextPageUrl(),
      path: this.path(),
      per_page: this.perPage(),
      prev_page_url: this.previousPageUrl(),
      to: this.lastItem(),
    };
  }
}

export function paginate(
  totalPages,
  currentPage,
  onEachSide,
  ellipsis = "..."
) {
  // Input validation
  if (
    typeof totalPages !== "number" ||
    typeof currentPage !== "number" ||
    typeof onEachSide !== "number"
  ) {
    //   throw new Error(
    //     "totalPages, currentPage, and onEachSide must be numbers"
    //   );

    totalPages = parseInt(totalPages);
    currentPage = parseInt(currentPage);
    onEachSide = parseInt(onEachSide);
  }
  if (
    totalPages < 1 ||
    currentPage < 1 ||
    currentPage > totalPages ||
    onEachSide < 0
  ) {
    throw new Error("Invalid input values");
  }

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

  return {
    pages: pages,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
  };
}
