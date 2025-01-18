import { fetchItems } from "@/app/_actions/items";
import Pagination from "@/components/Pagination";

export default async function ItemsPage({ searchParams }) {
  const { page, limit } = await searchParams;
  const items = await fetchItems({ page, limit });

  return (
    <>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              You&apos;re in &quot;Items Page&quot;!
            </div>
          </div>
        </div>
      </div>

      {/* <button type="button" onClick={() => SetShowModal(true)}>
        Show Modal
      </button> */}

      <div className="py-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">Items</h2>

          <ul
            role="list"
            className="p-4 bg-white divide-y divide-gray-100 rounded-lg shadow-sm"
          >
            {items?.data.map((item) => (
              <li key={item.id} className="flex justify-between py-5 gap-x-6">
                <div className="flex min-w-0 gap-x-4">
                  <div className="flex-auto min-w-0">
                    <p className="font-semibold text-gray-900 text-sm/6">
                      {`{id: ${item.id}} `}
                      {item.name}
                    </p>
                    <p className="mt-1 text-gray-500 truncate text-xs/5">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="px-2 text-gray-900 bg-green-300 rounded text-sm/6">
                    ₹ {item.price}
                  </p>

                  <p className="mt-1 text-gray-500 text-xs/5">
                    &#x1F550;
                    <time dateTime={item.updated_at}> {item.last_updated}</time>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            total={items.total}
            perPage={items.per_page}
            currentPage={items.current_page}
            lastPage={items.last_page}
            from={items.from_}
            to={items.to_}
            items={items.data}
            path="/items"
            className="mt-2"
          />
        </div>
      </div>
    </>
  );
}
