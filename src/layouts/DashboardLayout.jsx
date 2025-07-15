// import { Outlet } from "react-router";

import { Outlet } from "react-router";
import SidebarNav from "../components/SidebarNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <div className="text-2xl font-bold mb-6">Dashboard</div>
        {/* Add navigation links here based on role (optional) */}
        {/* Example: <Link to="/dashboard/tourist/my-bookings">My Bookings</Link> */}
        <SidebarNav userRole={"admin"} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-grow p-6 ">
          <Outlet />
        </main>

        {/* Optional footer for dashboard */}
        <footer className="text-center py-4 shadow-inner">
          <p>© 2025 Tourist Guide Dashboard</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
