import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BasicLayout from "../layouts/BasicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import PackageDetails from "../pages/PackageDetails";
import CommunityPage from "../pages/CommunityPage";
import AboutUs from "../pages/AboutUs";
import AllTrips from "../pages/AllTrips";
import TourGuideProfile from "../pages/TourGuideProfile";
import TouristManageProfile from "../dashboard/TouristManageProfile";
import TouristMyBookings from "../dashboard/TouristMyBookings";
import TouristAddStories from "../dashboard/TouristAddStories";
import TouristManageStories from "../dashboard/TouristManageStories";
import TouristJoinTourGuide from "../dashboard/TouristJoinTourGuide";
// import TourGuideDashboard from "../dashboard/TourGuideDashboard";
import TourGuideManageProfile from "../dashboard/TourGuideManageProfile";

const router = createBrowserRouter([
  // Basic Layout Routes
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "community", element: <CommunityPage></CommunityPage> },
      { path: "about-us", element: <AboutUs></AboutUs> },
      { path: "trips", element: <AllTrips></AllTrips> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
      { path: "forgot-password", element: <div>Forgot Password Page</div> },
      // Package Details & Tour Guide Profile
      { path: "/package/:packageId", element: <PackageDetails></PackageDetails> },
      { path: "/tour-guide/:guideId", element: <TourGuideProfile></TourGuideProfile> },
    ],
  },

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
      { path: "tourist", element: <TouristManageProfile></TouristManageProfile> },
      { path: "tourist/manage-profile", element: <TouristManageProfile></TouristManageProfile> },
      { path: "tourist/my-bookings", element: <TouristMyBookings /> },
      { path: "tourist/add-story", element: <TouristAddStories></TouristAddStories> },
      { path: "tourist/manage-stories", element: <TouristManageStories></TouristManageStories> },
      { path: "tourist/join-tour-guide", element: <TouristJoinTourGuide></TouristJoinTourGuide> },

      // Tour Guide
      { path: "tourguide", element: <TourGuideManageProfile /> },
      { path: "tourguide/manage-profile", element: <TourGuideManageProfile /> },
      { path: "tourguide/assigned-tours", element: <div>Tour Guide Assigned Tours</div> },
      { path: "tourguide/add-story", element: <div>Tour Guide Add Story</div> },
      { path: "tourguide/manage-stories", element: <div>Tour Guide Manage Stories</div> },

      // Admin
      { path: "admin/manage-profile", element: <div>Admin Manage Profile</div> },
      { path: "admin/add-package", element: <div>Admin Add Package</div> },
      { path: "admin/manage-users", element: <div>Admin Manage Users</div> },
      { path: "admin/manage-candidates", element: <div>Admin Manage Candidates</div> },
    ],
  },
]);

export default router;
