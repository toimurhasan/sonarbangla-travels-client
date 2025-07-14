import { Link } from "react-router";

const AllTrips = () => {
  // Sample static data (replace with API later)
  const packages = [
    {
      _id: "1",
      title: "Explore the Hills of Bandarban",
      type: "Adventure",
      price: 180,
      image: "https://source.unsplash.com/600x400/?bandarban",
    },
    {
      _id: "2",
      title: "Cox’s Bazar Beach Retreat",
      type: "Relaxation",
      price: 150,
      image: "https://source.unsplash.com/600x400/?coxsbazar",
    },
    {
      _id: "3",
      title: "Mystical Sundarbans Wildlife Tour",
      type: "Eco-tour",
      price: 220,
      image: "https://source.unsplash.com/600x400/?sundarbans",
    },
    // Add more packages if needed
  ];

  return (
    <div className="px-4 md:px-10 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">All Trips</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            <img src={pkg.image} alt={pkg.title} className="w-full h-52 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <p className="text-sm ">Type: {pkg.type}</p>
              <p className="font-medium">Price: ${pkg.price}</p>

              <Link
                to={`/package/${pkg._id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrips;
