import { useState } from "react";

const initialApplications = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "tourist",
    cv: "https://example.com/john_cv.pdf",
    reason: "I love guiding and know my city deeply.",
  },
  {
    id: "2",
    name: "Sarah Khan",
    email: "sarah@example.com",
    role: "tourist",
    cv: "https://example.com/sarah_cv.pdf",
    reason: "I'm a certified guide with 3 years of experience.",
  },
];

const ManageCandidates = () => {
  const [applications, setApplications] = useState(initialApplications);

  const handleAccept = (id) => {
    const accepted = applications.find((app) => app.id === id);
    if (accepted) {
      console.log("Promoted to tour-guide:", {
        ...accepted,
        role: "tour-guide",
      });
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  const handleReject = (id) => {
    const confirmed = confirm("Are you sure you want to reject this application?");
    if (confirmed) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
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
                <tr key={app.id}>
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
                      onClick={() => handleAccept(app.id)}
                      className="px-3 py-1 border rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3 py-1 border rounded"
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
