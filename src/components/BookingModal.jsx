import { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../contexts/AuthContext";
// import { useAuth } from "../hooks/useAuth"; // customize this hook based on your auth context

const BookingModal = ({ packageData, guides, onClose, onSubmit }) => {
  //   const { currentUser } = useAuth(); // Assume user = { name, email, photo }
  const { currentUser } = use(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState(guides?.[0]?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      packageName: packageData.tripTitle,
      touristName: currentUser.name,
      touristEmail: currentUser.email,
      touristImage: currentUser.photo,
      price: packageData.price,
      tourDate: selectedDate,
      guide: selectedGuide,
      status: "pending",
    };
    onSubmit(booking);
  };

  return (
    <dialog id="booking_modal" className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Confirm Your Booking</h3>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Package Name */}
          <div>
            <label className="label">Package Name</label>
            <input
              type="text"
              value={packageData.tripTitle}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Tourist Name */}
          <div>
            <label className="label">Tourist Name</label>
            <input
              type="text"
              value={currentUser.displayName}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Tourist Email */}
          <div>
            <label className="label">Tourist Email</label>
            <input
              type="email"
              value={currentUser.email}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Tourist Image */}
          <div>
            <label className="label">Tourist Image URL</label>
            <input
              type="text"
              value={currentUser.photoURL}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>
            <input
              type="text"
              value={`$${packageData.price}`}
              className="input input-bordered w-full"
              readOnly
            />
          </div>

          {/* Tour Date */}
          <div>
            <label className="label">Tour Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>

          {/* Tour Guide Dropdown */}
          <div>
            <label className="label">Tour Guide</label>
            <select
              className="select select-bordered w-full"
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              required
            >
              {guides.map((guide) => (
                <option key={guide._id} value={guide.name}>
                  {guide.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action flex justify-between items-center">
            <button type="submit" className="btn bg-blue-600 text-white hover:bg-blue-700">
              Book Now
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;
