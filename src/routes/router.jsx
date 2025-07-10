import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import BasicLayout from "../layouts/BasicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  // Basic Layout Routes
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "community", element: <div>Community Page</div> },
      { path: "about-us", element: <div>About Us Page</div> },
      { path: "trips", element: <div>All Trips Page</div> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <div>Register Page</div> },
      { path: "forgot-password", element: <div>Forgot Password Page</div> },
    ],
  },

  // Package Details & Tour Guide Profile
  { path: "/package/:packageId", element: <div>Package Details Page</div> },
  { path: "/tour-guide/:guideId", element: <div>Tour Guide Profile Page</div> },

  // Stories
  { path: "/stories", element: <div>All Stories Page</div> },
  { path: "/stories/add", element: <div>Add Story Page</div> },
  { path: "/stories/manage", element: <div>Manage Stories Page</div> },
  { path: "/stories/edit/:storyId", element: <div>Edit Story Page</div> },

  // Booking & Payment
  { path: "/payment/:bookingId", element: <div>Payment Page</div> },
  { path: "/my-bookings", element: <div>My Bookings Page</div> },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // Tourist
      { path: "tourist/manage-profile", element: <div>Tourist Manage Profile</div> },
      { path: "tourist/my-bookings", element: <div>Tourist My Bookings</div> },
      { path: "tourist/add-story", element: <div>Tourist Add Story</div> },
      { path: "tourist/manage-stories", element: <div>Tourist Manage Stories</div> },
      { path: "tourist/join-tour-guide", element: <div>Tourist Join as Tour Guide</div> },

      // Tour Guide
      { path: "tour-guide/manage-profile", element: <div>Tour Guide Manage Profile</div> },
      { path: "tour-guide/assigned-tours", element: <div>Tour Guide Assigned Tours</div> },
      { path: "tour-guide/add-story", element: <div>Tour Guide Add Story</div> },
      { path: "tour-guide/manage-stories", element: <div>Tour Guide Manage Stories</div> },

      // Admin
      { path: "admin/manage-profile", element: <div>Admin Manage Profile</div> },
      { path: "admin/add-package", element: <div>Admin Add Package</div> },
      { path: "admin/manage-users", element: <div>Admin Manage Users</div> },
      { path: "admin/manage-candidates", element: <div>Admin Manage Candidates</div> },
    ],
  },
]);

export default router;
