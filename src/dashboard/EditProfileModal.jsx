import { useState } from "react";
import { updateProfile } from "firebase/auth";

const EditProfileModal = ({ currentUser, onClose }) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await updateProfile(currentUser, { displayName, photoURL });
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setLoading(false);
        onClose(); // close modal
      }, 1000);
    } catch (error) {
      setMessage("Error updating profile: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white bg-opacity-50 flex items-center justify-center z-50">
      <div className=" rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email (read-only)</label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role (read-only)</label>
            <input type="text" value="Admin" disabled className="w-full border rounded p-2" />
          </div>

          {message && <p className="text-sm text-green-600">{message}</p>}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 text-black"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
