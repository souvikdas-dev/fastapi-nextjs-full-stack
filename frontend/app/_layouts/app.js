import Navigation from "./navigation";

export default function AppLayout({ children, header = false }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      {/* Page Heading */}
      {header && (
        <header className="bg-white shadow">
          <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      )}
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
