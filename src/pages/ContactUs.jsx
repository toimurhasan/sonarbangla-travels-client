import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend or an email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold  mb-4 text-center">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-center">
          We'd love to hear from you! Fill out the form below or reach us directly.
        </p>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold mb-6">
            Thank you for contacting us! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        )}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold  mb-2">Contact Details</h3>
          <p className=" mb-1">
            Email:{" "}
            <a href="mailto:info@sonarbanglatravels.com" className=" hover:underline">
              info@sonarbanglatravels.com
            </a>
          </p>
          <p className=" mb-1">
            Phone:{" "}
            <a href="tel:+880123456789" className=" hover:underline">
              +880 1234 56789
            </a>
          </p>
          <p className="">Address: 123, Sonar Bangla Road, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
