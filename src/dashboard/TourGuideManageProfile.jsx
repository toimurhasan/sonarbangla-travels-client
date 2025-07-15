import { useState } from "react";

const TourGuideManageProfile = () => {
  const user = {
    name: "Shafayet Rahman",
    email: "shafayet@example.com",
    photo: "https://source.unsplash.com/150x150/?portrait,man",
    role: "Tour Guide",
  };

  const [isEditing, setIsEditing] = useState(false);

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
            <p className="text-sm">{user.email}</p>
            <p className="text-sm">{user.role}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded border">
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
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
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={user.role}
                readOnly
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded border">
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

export default TourGuideManageProfile;
