import React from "react";
import { useLoaderData } from "react-router";
const TourGuideProfile = () => {
  const { guide, stories } = useLoaderData();
  const { name, email, image, bio, expertise, location } = guide;
  // console.log(image);
  return (
    <div className="px-4 md:px-10 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Tour Guide Profile</h2>

      {/* Guide Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <img src={image} alt={name} className="w-36 h-36 rounded-full object-cover border" />
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-2xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 italic">{location}</p>
          <p>{bio}</p>
          <p className="text-sm text-gray-500">Expertise: {expertise || "N/A"}</p>
          <p className="text-sm text-gray-500">Contact: {email}</p>
        </div>
      </div>

      {/* Stories Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Stories by {name}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div
                key={story._id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <img
                  src={story.images?.[0] || "/placeholder.jpg"}
                  alt={story.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-medium mb-2">{story.title}</h4>
                  <p className="text-sm text-gray-600">{story.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No stories shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
