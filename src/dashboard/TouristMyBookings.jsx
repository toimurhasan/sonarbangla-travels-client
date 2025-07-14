import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TouristMyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Fetch bookings from API here
    // Example static data for now:
    setBookings([
      {
        id: 1,
        packageName: "Beach Adventure",
        tourGuideName: "John Doe",
        tourDate: "2025-08-01",
        price: 250,
        status: "Pending",
      },
      {
        id: 2,
        packageName: "Mountain Hike",
        tourGuideName: "Jane Smith",
        tourDate: "2025-09-15",
        price: 350,
        status: "Accepted",
      },
    ]);
  }, []);

  const handlePay = (bookingId) => {
    // Redirect to payment page for this booking
    navigate(`/dashboard/tourist/payment/${bookingId}`);
  };

  const handleCancel = (bookingId) => {
    // TODO: Implement cancel booking logic
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
    );
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
                <td className="border p-2">{booking.tourGuideName}</td>
                <td className="border p-2">{booking.tourDate}</td>
                <td className="border p-2">${booking.price}</td>
                <td className="border p-2">{booking.status}</td>
                <td className="border p-2 space-x-2">
                  {booking.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handlePay(booking.id)}
                        type="button"
                        className="px-3 py-1 border rounded"
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        type="button"
                        className="px-3 py-1 border rounded"
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
