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
import RedirectToHome from "../components/RedirectToHome";
import PrivateRoute from "./PrivateRoute";

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
        loader: async ({ params }) => {
          const guideRes = await fetch(
            `https://sonarbangla-travels.vercel.app/api/guides/${params.id}`
          );
          const guide = await guideRes.json();

          const storyRes = await fetch(
            `https://sonarbangla-travels.vercel.app/api/stories/user?email=${encodeURIComponent(
              guide.email
            )}`
          );
          const stories = await storyRes.json();

          return { guide, stories };
        },
        element: <TourGuideProfile></TourGuideProfile>,
      },
      // Stories
      {
        path: "/story/:id",
        loader: ({ params }) => {
          return fetch(`https://sonarbangla-travels.vercel.app/api/story/${params.id}`);
        },
        element: <Story></Story>,
      },
    ],
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      // undefined
      { path: "undefined", element: <RedirectToHome></RedirectToHome> },

      // Tourist
      {
        path: "tourist",
        element: (
          <PrivateRoute>
            <TouristManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "tourist/manage-profile",
        element: (
          <PrivateRoute>
            <TouristManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "tourist/my-bookings",
        element: (
          <PrivateRoute>
            <TouristMyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "add-story",
        element: (
          <PrivateRoute>
            <TouristAddStories />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-stories",
        element: (
          <PrivateRoute>
            <TouristManageStories />
          </PrivateRoute>
        ),
      },
      {
        path: "tourist/stories/edit/:storyId",
        element: (
          <PrivateRoute>
            <EditStories />
          </PrivateRoute>
        ),
      },
      {
        path: "tourist/join-tour-guide",
        element: (
          <PrivateRoute>
            <TouristJoinTourGuide />
          </PrivateRoute>
        ),
      },
      {
        path: "tourist/payment/:bookingId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },

      // Tour Guide
      {
        path: "tourguide",
        element: (
          <PrivateRoute>
            <TourGuideManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "tourguide/manage-profile",
        element: (
          <PrivateRoute>
            <TourGuideManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "tourguide/assigned-tours",
        element: (
          <PrivateRoute>
            <TourGuideAssignedTours />
          </PrivateRoute>
        ),
      },
      {
        path: "add-story",
        element: (
          <PrivateRoute>
            <TouristAddStories />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-stories",
        element: (
          <PrivateRoute>
            <TouristManageStories />
          </PrivateRoute>
        ),
      },

      // Admin
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-profile",
        element: (
          <PrivateRoute>
            <AdminManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/add-package",
        element: (
          <PrivateRoute>
            <AddPackage />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-candidates",
        element: (
          <PrivateRoute>
            <ManageCandidates />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
