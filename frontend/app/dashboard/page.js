import AppLayout from "../_layouts/app";

export default function DashBoardPage() {
  return (
    <AppLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">You&apos;re logged in!</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
