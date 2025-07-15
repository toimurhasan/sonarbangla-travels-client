import React from "react";
import { NavLink } from "react-router";

const linksByRole = {
  tourist: [
    { to: "/dashboard/tourist/manage-profile", label: "Manage Profile" },
    { to: "/dashboard/tourist/my-bookings", label: "My Bookings" },
    { to: "/dashboard/tourist/manage-stories", label: "Manage Stories" },
    { to: "/dashboard/tourist/add-story", label: "Add Story" },
    { to: "/dashboard/tourist/join-tour-guide", label: "Join as Tour Guide" },
  ],
  tourGuide: [
    { to: "/dashboard/tourguide/manage-profile", label: "Manage Profile" },
    { to: "/dashboard/tourguide/assigned-tours", label: "My Assigned Tours" },
    { to: "/dashboard/tourguide/add-story", label: "Add Story" },
    { to: "/dashboard/tourguide/manage-stories", label: "Manage Stories" },
  ],
 admin: [
  { to: "/dashboard/admin/manage-profile", label: "Manage Profile" },
  { to: "/dashboard/admin/add-package", label: "Add Package" },
  { to: "/dashboard/admin/manage-users", label: "Manage Users" },
  { to: "/dashboard/admin/manage-candidates", label: "Manage Candidates" },
],

  // add more roles as needed
};

const SidebarNav = ({ userRole }) => {
  const links = linksByRole[userRole] || [];

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium transition-colors
    ${isActive ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-200 hover:text-gray-900"}`;

  return (
    <nav className=" min-h-screen p-4">
      <ul className="space-y-3">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} className={linkClass}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
