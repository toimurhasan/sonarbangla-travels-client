// import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import BookingModal from "../components/BookingModal";
import { AuthContext } from "../contexts/AuthContext";

const PackageDetails = () => {
  const { id } = useParams();
  const { currentUser } = use(AuthContext);
  const navigate = useNavigate();

  const { data: trip = {}, isLoading } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/packages/${id}`);
      return res.json();
    },
  });

  const { data: tourGuides = [] } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/users/tour-guides");
      return res.json();
    },
  });

  console.log(tourGuides);

  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  const { title, tourType, description, price, images = [], tourPlan = [], guides = [] } = trip;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center mb-6">{title}</h2>
        <p className="text-center text-lg text-gray-600 mb-2">{tourType}</p>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Trip ${idx + 1}`}
              className="rounded-lg w-full h-64 object-cover shadow"
            />
          ))}
        </div>

        {/* Description */}
        <h3 className="text-2xl font-bold text-center">About the Tour</h3>
        <p className="text-center mb-6">{description}</p>

        {/* Tour Plan */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-primary" /> Tour Plan
          </h3>
          <div className="space-y-4">
            {tourPlan.map((plan, index) => (
              <div key={index} className="bg-base-200 p-4 rounded-lg shadow">
                <h4 className="font-bold">
                  {plan.day}: {plan.title}
                </h4>
                <p className="text-sm  mt-1">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guides */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaUserTie className="text-secondary" /> Tour Guides
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {tourGuides.map((guide) => (
              <li key={guide._id}>
                <Link to={`/tour-guide/${guide._id}`} className="text-blue-600 hover:underline">
                  {guide.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Booking CTA */}
        <div className="mt-10 flex items-center justify-between bg-base-200 p-6 rounded-xl shadow">
          <div>
            <p className="text-xl font-bold text-primary">Price: {price}TK</p>
          </div>
          {currentUser ? (
            <button
              className="btn btn-primary text-white px-6 py-2 rounded-lg"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Book Now
            </button>
          ) : (
            <button
              className="btn btn-primary text-white px-6 py-2 rounded-lg"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login to Book this Package
            </button>
          )}
        </div>
        {showModal && (
          <BookingModal
            packageData={trip}
            guides={tourGuides}
            onClose={() => setShowModal(false)}
            onSubmit={(bookingData) => {
              console.log("Send to server:", bookingData);
              setShowModal(false);
              // Show "Confirm Your Booking" modal or toast
            }}
          />
        )}
      </div>
    </>
  );
};

export default PackageDetails;
