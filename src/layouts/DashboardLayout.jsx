// import { Outlet } from "react-router";

import { Outlet } from "react-router";
import SidebarNav from "../components/SidebarNav";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const DashboardLayout = () => {
  const { currentUser } = use(AuthContext);
  const [role, setRole] = useState();

  useEffect(() => {
    fetch(`https://sonarbangla-travels.vercel.app/api/user-role?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setRole(data.role));
  }, []);
  return (
    // <div className="min-h-screen flex">
    //   {/* Sidebar */}
    //   <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
    //     <div className="text-2xl font-bold mb-6">Dashboard</div>
    //     {/* Add navigation links here based on role (optional) */}
    //     {/* Example: <Link to="/dashboard/tourist/my-bookings">My Bookings</Link> */}
    //     <SidebarNav userRole={"admin"} />
    //   </aside>

    //   {/* Main Content */}
    //   <div className="flex-1 flex flex-col">
    //     <main className="flex-grow p-6 ">
    //       <Outlet />
    //     </main>

    //     {/* Optional footer for dashboard */}
    //     <footer className="text-center py-4 shadow-inner">
    //       <p>© 2025 Tourist Guide Dashboard</p>
    //     </footer>
    //   </div>
    // </div>
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar sm:hidden bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">SBT Dashboard</div>
        </div>
        {/* Page content here */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 fixed bg-gray-800 text-white  p-4 hidden sm:block">
            <div className="text-2xl flex items-center gap-2 font-bold mb-6">
              <img src="/nav-logo.png" alt="logo" />
              <p>Dashboard</p>
            </div>
            {/* Add navigation links here based on role (optional) */}
            {/* Example: <Link to="/dashboard/tourist/my-bookings">My Bookings</Link> */}
            <SidebarNav userRole={role} />
          </aside>
          <div className="flex-1 sm:ml-64 ">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <SidebarNav userRole={"admin"} />
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
