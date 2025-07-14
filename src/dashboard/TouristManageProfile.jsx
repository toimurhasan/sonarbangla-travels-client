import { useState } from "react";
import { useNavigate } from "react-router";

const TouristManageProfile = () => {
  // Example user data (replace with real user context later)
  const user = {
    name: "Toimur Hasan",
    email: "toimur@example.com",
    photo: "https://source.unsplash.com/150x150/?portrait",
    role: "Tourist",
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="px-4 py-8 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Welcome, {user.name}!</h2>

      <div className="border rounded-md shadow p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.photo}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="text-center space-y-1">
            <p className="font-medium">Name: {user.name}</p>
            <p className="text-sm text-gray-600">Email: {user.email}</p>
            <p className="text-sm">Role: {user.role}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/tourist/join-tour-guide")}
            className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Apply for Tour Guide
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md space-y-4 relative">
            <h3 className="text-lg font-semibold">Edit Profile</h3>

            <form className="space-y-3">
              <input
                type="text"
                defaultValue={user.name}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                defaultValue={user.photo}
                className="w-full border px-3 py-2 rounded"
              />
              {/* Email and Role - read-only */}
              <input
                type="email"
                value={user.email}
                className="w-full border px-3 py-2 rounded"
                readOnly
              />
              <input
                type="text"
                value={user.role}
                className="w-full border px-3 py-2 rounded "
                readOnly
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristManageProfile;
