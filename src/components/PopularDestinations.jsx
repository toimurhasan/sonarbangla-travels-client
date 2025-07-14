const PopularDestinations = () => {
  const destinations = [
    {
      name: "Sundarbans",
      img: "https://source.unsplash.com/400x250/?sundarbans,bangladesh",
    },
    {
      name: "Cox's Bazar",
      img: "https://source.unsplash.com/400x250/?coxsbazar,beach",
    },
    {
      name: "Sajek Valley",
      img: "https://source.unsplash.com/400x250/?sajek,valley",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Popular Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {destinations.map((place, index) => (
          <div key={index} className="rounded-lg overflow-hidden border shadow">
            <img src={place.img} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
