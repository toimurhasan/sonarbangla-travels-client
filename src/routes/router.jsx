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
import TourGuideAssignedTours from "../dashboard/TourGuideAssignedTours";
// import TourGuideStories from "../dashboard/TourGuideStories";
import AdminManageProfile from "../dashboard/AdminManageProfile";
import AddPackage from "../dashboard/AddPackage";
import ManageUsers from "../dashboard/ManageUsers";
import ManageCandidates from "../dashboard/ManageCandidates";
import ForgetPassword from "../pages/ForgetPassword";
import Story from "../pages/Story";
import EditStories from "../dashboard/EditStories";
import Payment from "../pages/Payment";

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
      { path: "forget-password", element: <ForgetPassword></ForgetPassword> },
      // Package Details & Tour Guide Profile
      { path: "/package/:id", element: <PackageDetails></PackageDetails> },
      {
        path: "/tour-guide/:id",
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/api/guides/${params.id}`);
        },
        element: <TourGuideProfile></TourGuideProfile>,
      },
      // Stories
      {
        path: "/story/:id",
        loader: ({ params }) => {
          return fetch(`http://localhost:3000/api/story/${params.id}`);
        },
        element: <Story></Story>,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // Tourist
      { path: "tourist", element: <TouristManageProfile></TouristManageProfile> },
      { path: "tourist/manage-profile", element: <TouristManageProfile></TouristManageProfile> },
      { path: "tourist/my-bookings", element: <TouristMyBookings /> },
      { path: "add-story", element: <TouristAddStories></TouristAddStories> },
      { path: "manage-stories", element: <TouristManageStories></TouristManageStories> },
      { path: "tourist/stories/edit/:storyId", element: <EditStories></EditStories> },
      { path: "tourist/join-tour-guide", element: <TouristJoinTourGuide></TouristJoinTourGuide> },
      { path: "tourist/payment/:bookingId", element: <Payment></Payment> },

      // Tour Guide
      { path: "tourguide", element: <TourGuideManageProfile /> },
      { path: "tourguide/manage-profile", element: <TourGuideManageProfile /> },
      { path: "tourguide/assigned-tours", element: <TourGuideAssignedTours /> },
      { path: "add-story", element: <TouristAddStories></TouristAddStories> },
      { path: "manage-stories", element: <TouristManageStories /> },

      // Admin
      { path: "admin", element: <AdminManageProfile /> },
      { path: "admin/manage-profile", element: <AdminManageProfile /> },
      { path: "admin/add-package", element: <AddPackage></AddPackage> },
      { path: "admin/manage-users", element: <ManageUsers></ManageUsers> },
      { path: "admin/manage-candidates", element: <ManageCandidates /> },
    ],
  },
]);

export default router;
