import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PackageDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tourPlan = [
    {
      day: "Day 01",
      title: "Explore the Hilltop",
      description:
        "Start the journey with a hike up the mountains, enjoy the panoramic view and local culture.",
    },
    {
      day: "Day 02",
      title: "River Cruise & Forest Trail",
      description:
        "Take a peaceful cruise and visit wildlife reserves. Walk along scenic forest paths.",
    },
    {
      day: "Day 03",
      title: "Cultural Village Tour",
      description: "Meet indigenous communities, learn about their lifestyle, food, and crafts.",
    },
  ];

  const tourGuides = [
    { id: 1, name: "Fahim Rahman" },
    { id: 2, name: "Sabina Yasmin" },
    { id: 3, name: "Touhidul Islam" },
  ];

  const isLoggedIn = true; // Toggle this for testing

  const handleBooking = () => {
    if (!isLoggedIn) {
      alert("Please login to book!");
      return;
    }
    alert("Confirm your booking! (You’ll be redirected to My Bookings)");
  };

  return (
    <div className="px-4 md:px-10 py-10 space-y-12">
      {/* === Gallery Section === */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img
          src="https://source.unsplash.com/800x500/?desert"
          className="col-span-2 row-span-2 object-cover w-full h-full rounded-lg"
          alt="Main"
        />
        <img
          src="https://source.unsplash.com/400x300/?beach"
          className="object-cover w-full h-full rounded-lg"
          alt=""
        />
        <img
          src="https://source.unsplash.com/400x300/?city"
          className="object-cover w-full h-full rounded-lg"
          alt=""
        />
        <img
          src="https://source.unsplash.com/400x300/?mountain"
          className="object-cover w-full h-full rounded-lg"
          alt=""
        />
        <img
          src="https://source.unsplash.com/400x300/?temple"
          className="object-cover w-full h-full rounded-lg"
          alt=""
        />
      </section>

      {/* === About Section === */}
      <section>
        <h2 className="text-2xl font-bold mb-4">About the Tour</h2>
        <p>
          Embark on a 3-day unforgettable journey through scenic landscapes, rich culture, and local
          adventures. Perfect for nature lovers and explorers.
        </p>
      </section>

      {/* === Tour Plan Section === */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Tour Plan</h2>
        <div className="space-y-3">
          {tourPlan.map((plan, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <div className=" px-4 py-3 font-semibold flex justify-between items-center">
                <span>
                  📍 {plan.day} – {plan.title}
                </span>
              </div>
              <div className="px-4 py-3 text-sm">{plan.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === Tour Guides List Section === */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Available Tour Guides</h2>
        <div className="flex flex-wrap gap-4">
          {tourGuides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => alert("Go to profile: " + guide.name)}
              className="border rounded-lg px-4 py-2 hover:shadow transition"
            >
              {guide.name}
            </button>
          ))}
        </div>
      </section>

      {/* === Booking Form === */}
      <section className="border p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Book This Tour</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <input
            type="text"
            value="Explore the Hills of Bandarban"
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            value="John Doe"
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            value="john@example.com"
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            value="https://example.com/image.jpg"
            readOnly
            className="w-full border px-3 py-2 rounded"
          />
          <input type="text" value="$180" readOnly className="w-full border px-3 py-2 rounded" />

          {/* === Date Picker === */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full border px-3 py-2 rounded"
          />

          {/* === Tour Guide Dropdown === */}
          <select className="w-full border px-3 py-2 rounded">
            {tourGuides.map((guide) => (
              <option key={guide.id}>{guide.name}</option>
            ))}
          </select>

          {/* === Book Button === */}
          <button
            onClick={handleBooking}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default PackageDetails;
