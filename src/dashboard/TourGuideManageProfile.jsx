import { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const TourGuideManageProfile = () => {
  const { currentUser } = use(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="px-4 py-8 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">Welcome, {currentUser.displayName}!</h2>

      <div className="border rounded-md shadow p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div className="text-center space-y-1">
            <p className="font-medium">Name: {currentUser.displayName}</p>
            <p className="text-sm">Email: {currentUser.email}</p>
            <p className="text-sm">Tour Guide</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded cursor-pointer border"
          >
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
                defaultValue={currentUser.displayName}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                defaultValue={currentUser.photoURL}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                value={currentUser.email}
                readOnly
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                value={"Tour Guide"}
                readOnly
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded  cursor-pointer"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded border cursor-pointer">
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
