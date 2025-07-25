// import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { FaUserTie, FaCalendarAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import BookingModal from "../components/BookingModal";
import { AuthContext } from "../contexts/AuthContext";
import Confetti from "react-confetti";
import toast, { Toaster } from "react-hot-toast";
import { useWindowSize } from "react-use";

const PackageDetails = () => {
  const { id } = useParams();
  const { currentUser } = use(AuthContext);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const { data: trip = {}, isLoading } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => {
      const res = await fetch(`https://sonarbangla-travels.vercel.app/api/packages/${id}`);
      return res.json();
    },
  });

  const { data: tourGuides = [] } = useQuery({
    queryKey: ["tourGuides"],
    queryFn: async () => {
      const res = await fetch("https://sonarbangla-travels.vercel.app/api/users/tour-guides");
      return res.json();
    },
  });

  // console.log(tourGuides);

  const [showModal, setShowModal] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

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
        <div className="my-8">
          <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
            <FaCalendarAlt className="text-primary" /> Tour Plan
          </h3>
          <div className="space-y-4">
            {tourPlan.map((plan, index) => (
              <div key={index} className="bg-base-200 p-4 rounded-lg shadow">
                <h4 className="font-bold">
                  {plan.day}: {plan.activities}
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
            <p className="text-xl font-bold text-primary">Price: {price}USD</p>
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
            onSubmit={async (bookingData) => {
              try {
                // ✅ Send booking to server
                console.log("Send to server:", bookingData);
                setShowModal(false);

                // ✅ Get booking count for current user
                const res = await fetch(
                  `https://sonarbangla-travels.vercel.app/bookings/count?email=${currentUser.email}`
                );
                const data = await res.json();

                if (data.total >= 3) {
                  // ✅ Scroll to top
                  window.scrollTo({ top: 0, behavior: "smooth" });

                  // ✅ Show confetti
                  setShowCongrats(true);
                  // setTimeout(() => setShowCongrats(false), 6000);

                  // ✅ Show toast
                  toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                      } text-center max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto py-4 px-6`}
                    >
                      <h2 className="text-2xl font-bold text-green-600">🎉 Congratulations!</h2>
                      <p className="mt-4 text-gray-700">
                        You’ve booked more than 3 trips! <br /> You’re a true adventurer!
                      </p>
                    </div>
                  ));
                }
              } catch (error) {
                console.error("Booking or count error:", error);
              }
            }}
          />
        )}
      </div>
      {showCongrats && (
        <>
          <Confetti width={width} height={height} />
        </>
      )}
      <Toaster />
    </>
  );
};

export default PackageDetails;
