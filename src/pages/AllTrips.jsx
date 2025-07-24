import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const AllTrips = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState();
  useEffect(() => {
    fetch("https://sonarbangla-travels.vercel.app/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data));
  }, []);

  return (
    <div className="px-4 md:px-10 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">All Trips</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages?.map((pkg, index) => (
          <div key={index} className="border border-base-300 rounded-lg shadow-md overflow-hidden">
            <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500">{pkg.tourType}</p>
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
              <p className="text-green-600 font-bold text-lg mb-4">{pkg.price}TK</p>
              <button
                className="btn-primary btn px-4 py-2 rounded transition"
                onClick={() => {
                  navigate(`/package/${pkg._id}`);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
