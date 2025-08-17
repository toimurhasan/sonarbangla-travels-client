import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    text: "Sonar Bangla Travels made my trip unforgettable! The guides were friendly and everything was perfectly organized.",
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Imran Hossain",
    text: "Excellent service and great value. Highly recommended for anyone looking to explore Bangladesh.",
    location: "Chittagong, Bangladesh",
  },
  {
    name: "Farhana Akter",
    text: "Loved the experience! The team was very supportive and the destinations were breathtaking.",
    location: "Sylhet, Bangladesh",
  },
];

const TestimonialSection = () => {
  return (
    <section className=" py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">What Our Travelers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
              <div className="text-lg italic text-gray-700 mb-4">"{t.text}"</div>
              <div className="font-semibold text-blue-600">{t.name}</div>
              <div className="text-sm text-gray-500">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
