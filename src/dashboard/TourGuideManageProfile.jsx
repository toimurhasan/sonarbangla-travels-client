import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TourGuideManageProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [editedExpertise, setEditedExpertise] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const queryClient = useQueryClient();

  // Fetch extended guide data
  const { data: guideProfile = {}, isLoading } = useQuery({
    queryKey: ["guideProfile", currentUser?.email],
    enabled: !!currentUser?.email,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/api/guides/profile?email=${currentUser.email}`
      );
      if (!res.ok) throw new Error("Failed to fetch guide profile");
      return res.json();
    },
  });

  const { bio, expertise, location } = guideProfile;

  const handleEditClick = () => {
    setEditedBio(bio || "");
    setEditedExpertise(expertise || "");
    setEditedLocation(location || "");
    setIsEditing(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      email: currentUser.email,
      bio: editedBio,
      expertise: editedExpertise,
      location: editedLocation,
    };

    try {
      const res = await fetch("http://localhost:3000/api/guides/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);
        queryClient.invalidateQueries(["guideProfile", currentUser.email]);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

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
            <p className="text-sm font-medium text-blue-600">Tour Guide</p>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center">Loading profile...</div>
        ) : (
          <div className="space-y-2 text-center">
            <p>
              <span className="font-semibold">Expertise:</span> {expertise}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p>
              <span className="font-semibold">Bio:</span> {bio}
            </p>
          </div>
        )}

        <div className="flex justify-center">
          <button onClick={handleEditClick} className="px-4 py-2 rounded border cursor-pointer">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md space-y-4 relative">
            <h3 className="text-lg font-semibold">Edit Profile</h3>
            <form className="space-y-3" onSubmit={handleUpdateProfile}>
              <input
                type="text"
                defaultValue={currentUser.displayName}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
              <input
                type="text"
                defaultValue={currentUser.photoURL}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
              <input
                type="email"
                value={currentUser.email}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
              <input
                type="text"
                value={editedExpertise}
                onChange={(e) => setEditedExpertise(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Expertise"
              />
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                placeholder="Location"
              />
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={3}
                placeholder="Bio"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded border cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded border cursor-pointer bg-blue-500 text-white"
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

export default TourGuideManageProfile;
