import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import EditProfileModal from "./EditProfileModal"; // Create a simple modal component
import { AuthContext } from "../contexts/AuthContext";

const AdminManageProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const { displayName, email, photoURL } = currentUser;

  const [stats, setStats] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Welcome, {displayName}!</h2>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Payment" value={`$${stats.totalPayment || 0}`} />
        <StatCard title="Total Tour Guides" value={stats.totalGuides || 0} />
        <StatCard title="Total Packages" value={stats.totalPackages || 0} />
        <StatCard title="Total Clients" value={stats.totalClients || 0} />
        <StatCard title="Total Stories" value={stats.totalStories || 0} />
      </div>

      {/* Admin Info */}
      <div className="bg-white shadow-md p-4 rounded-md w-full md:w-2/3">
        <div className="flex items-center gap-4">
          <img src={photoURL} alt="Admin" className="w-24 h-24 rounded-full" />
          <div>
            <p className="font-bold">Name: {displayName}</p>
            <p>Email: {email}</p>
            <p>Role: Admin</p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditProfileModal currentUser={currentUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-blue-100 text-blue-800 p-4 rounded shadow text-center">
    <p className="text-xl font-semibold">{value}</p>
    <p className="text-sm">{title}</p>
  </div>
);

export default AdminManageProfile;
