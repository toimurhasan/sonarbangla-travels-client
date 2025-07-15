import { useState } from "react";

const AdminManageProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    image: "https://source.unsplash.com/100x100/?portrait",
    role: "admin",
  });

  const [stats, setStats] = useState({
    totalPayment: 12450,
    totalGuides: 12,
    totalPackages: 28,
    totalClients: 143,
    totalStories: 55,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: admin.name,
    image: admin.image,
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setAdmin((prev) => ({ ...prev, ...editForm }));
    setEditModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-semibold">Welcome, {admin.name}</h2>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <p className="font-semibold">Total Payment</p>
          <p>${stats.totalPayment}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-semibold">Tour Guides</p>
          <p>{stats.totalGuides}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-semibold">Packages</p>
          <p>{stats.totalPackages}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-semibold">Clients</p>
          <p>{stats.totalClients}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-semibold">Stories</p>
          <p>{stats.totalStories}</p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="border rounded p-6 space-y-3">
        <img src={admin.image} alt="Admin" className="w-20 h-20 rounded-full" />
        <p>
          <span className="font-semibold">Name:</span> {admin.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {admin.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {admin.role}
        </p>
        <button onClick={() => setEditModalOpen(true)} className="px-4 py-2 border rounded">
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
          <div className="bg-white border rounded p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-medium">Edit Profile</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Name"
              />
              <input
                type="text"
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                placeholder="Image URL"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border rounded">
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

export default AdminManageProfile;
