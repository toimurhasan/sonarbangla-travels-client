import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageCandidates = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/applications");
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/applications/accept/${id}`, {
        method: "PATCH",
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));

        Swal.fire({
          icon: "success",
          title: "Accepted",
          text: "Application has been accepted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to accept application.",
        });
      }
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/api/applications/reject/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));

        Swal.fire({
          icon: "success",
          title: "Rejected",
          text: "Application has been rejected.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to reject application.",
        });
      }
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Manage Tour Guide Candidates</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">CV</th>
              <th className="border px-4 py-2">Reason</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id}>
                  <td className="border px-4 py-2">{app.name}</td>
                  <td className="border px-4 py-2">{app.email}</td>
                  <td className="border px-4 py-2">
                    <a href={app.cv} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  </td>
                  <td className="border px-4 py-2">{app.reason}</td>
                  <td className="border px-4 py-2 capitalize">{app.role}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleAccept(app._id)}
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="px-3 py-1 border cursor-pointer rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center border px-4 py-4">
                  No applications pending.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCandidates;
