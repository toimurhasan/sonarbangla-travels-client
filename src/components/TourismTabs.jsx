import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TourismTabs = () => {
  return (
    <section className="py-12px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tourism & Travel Guide</h2>

      <Tabs>
        {/* Tab headers */}
        <TabList className="flex gap-6 justify-center border-b-2 pb-2 mb-6 text-lg font-medium">
          <Tab
            className="cursor-pointer px-4 py-2 border-b-2 border-transparent hover:text-blue-600 focus:outline-none"
            selectedClassName="!border-blue-600 text-blue-600"
          >
            Our Packages
          </Tab>
          <Tab
            className="cursor-pointer px-4 py-2 border-b-2 border-transparent hover:text-blue-600 focus:outline-none"
            selectedClassName="!border-blue-600 text-blue-600"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Our Packages Tab */}
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://source.unsplash.com/400x250/?travel,landscape,${item}`}
                  alt="Package"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm ">Adventure</p>
                  <h3 className="text-xl font-semibold mb-2">Trip to Destination {item}</h3>
                  <p className="text-green-600 font-bold text-lg mb-4">$199</p>
                  <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">
                    View Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Tour Guides Tab */}
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
