import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router";

// Sidebar Navigation for Tour Guide Dashboard
const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium transition-colors ${
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
    }`;

  return (
    <nav className="w-56 bg-gray-100 min-h-screen p-4">
      <ul className="space-y-3">
        <li>
          <NavLink to="/dashboard/tourguide/manage-profile" className={linkClass}>
            Manage Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tourguide/my-assigned-tours" className={linkClass}>
            My Assigned Tours
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tourguide/add-stories" className={linkClass}>
            Add Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tourguide/manage-stories" className={linkClass}>
            Manage Stories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

// Modal for editing profile info
const EditProfileModal = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [picture, setPicture] = useState(user.picture || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, phone, picture });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Picture URL</label>
            <input
              type="url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Manage Profile Page
const ManageProfile = ({ user, setUser }) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (updatedInfo) => {
    // Save updated profile info (call backend or update context)
    setUser((prev) => ({ ...prev, ...updatedInfo }));
    setEditOpen(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>

      <div className="flex items-center space-x-6 mb-6">
        {user.picture ? (
          <img
            src={user.picture}
            alt={`${user.name}'s avatar`}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone || "Not Provided"}
          </p>
        </div>
      </div>

      <button onClick={() => setEditOpen(true)} className="px-4 py-2 rounded border font-medium">
        Edit Profile
      </button>

      {editOpen && (
        <EditProfileModal user={user} onClose={() => setEditOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
};

// Placeholder components for other routes
const MyAssignedTours = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">My Assigned Tours</h2>
    <p>Show assigned tours here...</p>
  </div>
);

const AddStories = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">Add Stories</h2>
    <p>Add story form goes here...</p>
  </div>
);

const ManageStories = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">Manage Stories</h2>
    <p>Manage stories list goes here...</p>
  </div>
);

// Main Dashboard Component
const TourGuideDashboard = () => {
  // Simulate logged-in user data - replace with your auth context or API
  const [user, setUser] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Tour Guide",
    phone: "123-456-7890",
    picture: "https://randomuser.me/api/portraits/women/68.jpg",
  });
};

export default TourGuideDashboard;
