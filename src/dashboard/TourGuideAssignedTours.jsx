import { useState } from "react";

const sampleAssignedTours = [
  {
    id: 1,
    packageName: "Sundarbans Adventure",
    touristName: "Toimur Hasan",
    tourDate: "2025-08-10",
    price: 200,
    status: "in-review", // pending | in-review | accepted | rejected
  },
  {
    id: 2,
    packageName: "Cox’s Bazar Retreat",
    touristName: "Anika Sultana",
    tourDate: "2025-08-22",
    price: 180,
    status: "pending",
  },
];

const TourGuideAssignedTours = () => {
  const [tours, setTours] = useState(sampleAssignedTours);
  const [rejectId, setRejectId] = useState(null);

  const handleAccept = (id) => {
    setTours((prev) =>
      prev.map((tour) => (tour.id === id ? { ...tour, status: "accepted" } : tour))
    );
  };

  const handleRejectConfirm = () => {
    setTours((prev) =>
      prev.map((tour) => (tour.id === rejectId ? { ...tour, status: "rejected" } : tour))
    );
    setRejectId(null);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">My Assigned Tours</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-3 py-2">Package</th>
              <th className="border px-3 py-2">Tourist</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="border px-3 py-2">{tour.packageName}</td>
                <td className="border px-3 py-2">{tour.touristName}</td>
                <td className="border px-3 py-2">{tour.tourDate}</td>
                <td className="border px-3 py-2">${tour.price}</td>
                <td className="border px-3 py-2 capitalize">{tour.status}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    disabled={tour.status !== "in-review"}
                    onClick={() => handleAccept(tour.id)}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    disabled={tour.status !== "in-review"}
                    onClick={() => setRejectId(tour.id)}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reject Confirmation Modal */}
      {rejectId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg bg-white space-y-4 max-w-sm w-full">
            <h3 className="text-lg font-medium">Confirm Rejection</h3>
            <p>Are you sure you want to reject this booking?</p>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setRejectId(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleRejectConfirm} className="px-4 py-2 border rounded">
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGuideAssignedTours;
