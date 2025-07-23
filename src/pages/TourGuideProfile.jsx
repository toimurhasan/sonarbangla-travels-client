import React from "react";
import { useLoaderData } from "react-router";
const TourGuideProfile = () => {
  // Example guide info (replace with API data later)
  // const guide = {
  //   name: "Arafat Hossain",
  //   photo: "https://source.unsplash.com/200x200/?portrait,man",
  //   bio: "I'm a certified local guide with 5+ years of experience showing travelers the beauty of Bangladesh. I specialize in offbeat locations and authentic cultural experiences.",
  //   location: "Sylhet, Bangladesh",
  //   contact: "arafat@example.com",
  // };

  const data = useLoaderData();
  const { name, email, photo, bio, expertise, location } = data;

  // Example stories by the guide
  const stories = [
    {
      id: 1,
      title: "Guided Hike to Nilgiri",
      image: "https://source.unsplash.com/500x300/?hiking,mountains",
      summary: "Shared an amazing trek with a group to the Nilgiri hills. Nature was breathtaking.",
    },
    {
      id: 2,
      title: "Night Safari in Sundarbans",
      image: "https://source.unsplash.com/500x300/?forest,night",
      summary: "We spotted crocodiles and fireflies. Everyone was thrilled!",
    },
  ];

  return (
    <div className="px-4 md:px-10 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Tour Guide Profile</h2>

      {/* Guide Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <img src={photo} alt={name} className="w-36 h-36 rounded-full object-cover border" />
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
          {stories.map((story) => (
            <div
              key={story.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-medium mb-2">{story.title}</h4>
                <p className="text-sm text-gray-600">{story.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfile;
