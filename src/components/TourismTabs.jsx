import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TourismTabs = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/random-packages") 
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Failed to load packages:", err));
  }, []);

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
                  <p className="text-sm text-gray-500">{pkg.tourType}</p>
                  <h3 className="text-xl font-semibold mb-2">{pkg.tripTitle}</h3>
                  <p className="text-green-600 font-bold text-lg mb-4">{pkg.price}TK</p>
                  <button
                    className="btn-primary btn px-4 py-2 rounded transition"
                    onClick={() => (window.location.href = `/package/${pkg._id}`)}
                  >
                    View Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Tour Guides */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className=" border rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://source.unsplash.com/400x250/?portrait,person,${item}`}
                  alt="Tour Guide"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">Guide Name {item}</h3>
                  <p className="text-sm mb-3">Specialist in eco-cultural tours</p>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">
                    View Details
                  </button>
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
