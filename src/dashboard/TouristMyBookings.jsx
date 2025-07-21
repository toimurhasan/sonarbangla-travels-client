import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = use(AuthContext);
  useEffect(() => {
    // TODO: Fetch bookings from API here
    fetch(`http://localhost:3000/api/bookings?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Filtered bookings: ", data);
        setBookings(data);
      });
    // Example static data for now:
  }, []);

  const handlePay = (bookingId) => {
    // Redirect to payment page for this booking
    navigate(`/dashboard/tourist/payment/${bookingId}`);
  };

  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: "cancelled" } : b))
        );
      } else {
        const errorData = await res.json();
        console.error("Cancel failed:", errorData.error);
        Swal.fire("Failed", "Failed to cancel booking: " + errorData.error, "error");
      }
    } catch (err) {
      console.error("Network error:", err);
      Swal.fire("Error", "Network error while canceling booking.", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Package Name</th>
            <th className="border p-2">Tour Guide</th>
            <th className="border p-2">Tour Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="border p-2">{booking.packageName}</td>
                <td className="border p-2">{booking.guide}</td>
                <td className="border p-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                <td className="border p-2">${booking.price}</td>
                <td className="border p-2">
                  {booking.status === "pending"
                    ? "In Review"
                    : booking.status === "cancelled"
                    ? "Cancelled"
                    : "Accepted"}
                </td>
                <td className="border p-2 space-x-2">
                  {booking.status === "pending" && (
                    <>
                      <button onClick={() => handlePay(booking.id)} type="button" className="btn">
                        Pay
                      </button>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        type="button"
                        className="btn"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TouristMyBookings;
