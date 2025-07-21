import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/api/bookings?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Filtered bookings: ", data);
        setBookings(data);
      });
  }, [currentUser.email]);

  const handlePay = (bookingId) => {
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
        Swal.fire("Failed", "Failed to cancel booking: " + errorData.error, "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network error while canceling booking.", "error");
    }
  };

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

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
          {currentBookings.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No bookings found.
              </td>
            </tr>
          ) : (
            currentBookings.map((booking) => (
              <tr key={booking._id}>
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
                      <button onClick={() => handlePay(booking._id)} className="btn">
                        Pay
                      </button>
                      <button onClick={() => handleCancel(booking._id)} className="btn">
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

      {/* Pagination Footer with Info */}
      {bookings.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
          <div className="text-gray-700">
            Showing{" "}
            <span className="font-semibold">
              {indexOfFirstBooking + 1}–{Math.min(indexOfLastBooking, bookings.length)}
            </span>{" "}
            of <span className="font-semibold">{bookings.length}</span> bookings
          </div>

          {/* Page Buttons */}
          <div className="flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristMyBookings;
