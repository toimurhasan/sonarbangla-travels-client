import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";

const TourGuideAssignedTours = () => {
  const { currentUser } = useContext(AuthContext); // guide's email
  const [assignedTours, setAssignedTours] = useState([]);

  useEffect(() => {
    fetch(`https://sonarbangla-travels.vercel.app/api/bookings?guideEmail=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setAssignedTours(data));
  }, [currentUser.email]);

  const handleAccept = async (id) => {
    try {
      const res = await fetch(`https://sonarbangla-travels.vercel.app/api/bookings/${id}/accept`, {
        method: "PATCH",
      });
      const result = await res.json();
      if (result.message === "Booking accepted successfully.") {
        setAssignedTours((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status: "accepted" } : t))
        );
      }
    } catch (err) {
      console.error("Accept failed:", err);
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this tour.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://sonarbangla-travels.vercel.app/api/bookings/${id}/reject`,
          {
            method: "PATCH",
          }
        );
        const result = await res.json();
        if (result.message === "Booking rejected successfully.") {
          setAssignedTours((prev) =>
            prev.map((t) => (t._id === id ? { ...t, status: "rejected" } : t))
          );
        }
      } catch (err) {
        console.error("Reject failed:", err);
      }
    }
  };

  console.log(assignedTours);

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">My Assigned Tours</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="">
            <tr>
              <th className="p-2 border">Package</th>
              <th className="p-2 border">Tourist</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => (
              <tr key={tour._id}>
                <td className="p-2 border">{tour.packageName}</td>
                <td className="p-2 border">{tour.touristName}</td>
                <td className="p-2 border">{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td className="p-2 border">${tour.price}</td>
                <td className="p-2 border capitalize">{tour.status}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleAccept(tour._id)}
                    disabled={tour.status !== "in review"}
                    className={`px-3 py-1 rounded  text-white ${
                      tour.status === "in review"
                        ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    Accept
                  </button>
                  {tour.status === "in review" && (
                    <button
                      onClick={() => handleReject(tour._id)}
                      className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer text-white"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourGuideAssignedTours;
