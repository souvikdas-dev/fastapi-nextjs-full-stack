import { getAuthUser } from "../_actions/auth";
import Navigation from "../_layouts/navigation";

export default async function AppLayout({ children }) {
  // console.log("inside applayout");
  const user = await getAuthUser();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />
      <main>{children}</main>
    </div>
  );
}
