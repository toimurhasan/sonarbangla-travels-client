const WhyTravelWithUs = () => {
  const features = [
    {
      title: "Expert Local Guides",
      desc: "Every tour is led by passionate locals who know every hidden gem and story.",
      icon: "🌍",
    },
    {
      title: "Customizable Packages",
      desc: "We tailor your trip based on your interest, time, and budget.",
      icon: "🎒",
    },
    {
      title: "24/7 Support",
      desc: "Our travel support team is always ready to help before and during your journey.",
      icon: "📞",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why Travel With Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, i) => (
          <div key={i} className="p-6 border rounded-lg shadow">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyTravelWithUs;
