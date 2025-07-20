import { use, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristManageProfile = () => {
  // Example user data (replace with real user context later)
  // const user = {
  //   name: "Toimur Hasan",
  //   email: "toimur@example.com",
  //   photo: "https://source.unsplash.com/150x150/?portrait",
  //   role: "Tourist",
  // };

  const { currentUser, updateUserInfo } = use(AuthContext);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    updateUserInfo(name, photo)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Information Update",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditOpen(false);
      })
      .catch(() => {});
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
            <p className="text-sm text-gray-600">Email: {currentUser.email}</p>
            <p className="text-sm">Role: Tourist</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button onClick={() => setIsEditOpen(true)} className="btn btn-primary rounded-sm">
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/dashboard/tourist/join-tour-guide")}
            className="btn btn-primary rounded-sm"
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

            <form onSubmit={handleUpdateUser} className="space-y-3">
              <input
                type="text"
                name="name"
                defaultValue={currentUser.displayName}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                name="photo"
                type="text"
                defaultValue={currentUser.photoURL}
                className="w-full border px-3 py-2 rounded"
              />
              {/* Email and Role - read-only */}
              <input
                type="email"
                value={currentUser.email}
                className="w-full border px-3 py-2 rounded"
                readOnly
              />
              <input
                type="text"
                value="Tourist"
                className="w-full border px-3 py-2 rounded "
                readOnly
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="btn btn-primary "
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
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
