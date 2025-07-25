import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
// import { useLocation } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useQuery } from "@tanstack/react-query";

const TourismTabs = () => {
  // const location = useLocation();
  const navigate = useNavigate();

  // const [packages, setPackages] = useState([]);
  // useEffect(() => {
  //   fetch("https://sonarbangla-travels.vercel.app/random-packages")
  //     .then((res) => res.json())
  //     .then((data) => setPackages(data))
  //     .catch((err) => console.error("Failed to load packages:", err));
  // }, []);

  // const [guides, setGuides] = useState([]);
  // useEffect(() => {
  //   fetch("https://sonarbangla-travels.vercel.app/api/guides/random")
  //     .then((res) => res.json())
  //     .then((data) => setGuides(data));
  // }, []);
  const fetchRandomPackages = async () => {
    const res = await fetch("https://sonarbangla-travels.vercel.app/random-packages");
    if (!res.ok) throw new Error("Failed to fetch packages");
    return res.json();
  };

  const {
    data: packages = [],
    isLoading: loadingPackages,
    error: packagesError,
  } = useQuery({
    queryKey: ["randomPackages"],
    queryFn: fetchRandomPackages,
  });

  const fetchRandomGuides = async () => {
    const res = await fetch("https://sonarbangla-travels.vercel.app/api/guides/random");
    if (!res.ok) throw new Error("Failed to fetch guides");
    return res.json();
  };

  const {
    data: guides = [],
    isLoading: loadingGuides,
    error: guidesError,
  } = useQuery({
    queryKey: ["randomGuides"],
    queryFn: fetchRandomGuides,
  });

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tourism & Travel Guide</h2>

      <Tabs>
        <TabList className="flex gap-6 justify-center pb-2  mb-6 text-lg font-medium">
          <Tab
            className="cursor-pointer px-4 py-2 border-b-2 border-transparent hover:text-primary focus:outline-none"
            selectedClassName="!border-primary text-primary"
          >
            Our Packages
          </Tab>
          <Tab
            className="cursor-pointer px-4 py-2 border-b-2 border-transparent hover:text-primary focus:outline-none"
            selectedClassName="!border-primary text-primary"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Our Packages */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="border border-base-300 rounded-lg shadow-md overflow-hidden"
              >
                <img src={pkg.image} alt={pkg.tripTitle} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-sm text-gray-500">{pkg.type}</p>
                  <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-green-600 font-bold text-lg mb-4">{pkg.price}USD</p>
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
        </TabPanel>

        {/* Tour Guides */}
        <TabPanel>
          <h2 className="text-3xl font-bold text-center mb-6">Meet Our Tour Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div key={guide._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className=" h-56 w-56 rounded-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{guide.name}</h2>
                  <p>Expertise: {guide.expertise}</p>
                  <p>Email: {guide.email}</p>
                  <div className="card-actions mt-4 justify-center">
                    <Link to={`/tour-guide/${guide._id}`} className="btn btn-outline btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismTabs;
