export default async function UsersPage() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await data.json();

  return (
    <>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              You&apos;re in &quot;users page&quot;!
            </div>
          </div>
        </div>
      </div>

      <main className="py-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-semibold text-gray-800">Users</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-6 transition-shadow bg-white rounded-lg shadow-lg hover:shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {user.name}
                </h3>
                <p className="text-gray-500">Email: {user.email}</p>
                <p className="text-gray-500">Phone: {user.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
