import { FacebookShareButton, FacebookIcon } from "react-share";

const CommunityPage = () => {
  // Example stories — replace with actual data later
  const stories = [
    {
      id: 1,
      title: "Adventures in Bandarban",
      description: "Had an unforgettable trek to Nilgiri hills. The view was beyond imagination!",
      image: "https://source.unsplash.com/500x300/?bandarban",
      author: "Fahim Rahman",
    },
    {
      id: 2,
      title: "Beach Life at Cox’s Bazar",
      description: "Enjoyed fresh seafood, long beach walks, and breathtaking sunsets.",
      image: "https://source.unsplash.com/500x300/?coxsbazar",
      author: "Sabina Yasmin",
    },
    {
      id: 3,
      title: "Sundarbans River Safari",
      description: "Saw crocodiles, birds, and maybe a glimpse of the Royal Bengal Tiger!",
      image: "https://source.unsplash.com/500x300/?sundarbans",
      author: "Touhidul Islam",
    },
    {
      id: 4,
      title: "Tea Garden Magic",
      description: "Srimangal’s tea gardens are peaceful and green—it was a refreshing escape.",
      image: "https://source.unsplash.com/500x300/?tea,garden",
      author: "Anika Zaman",
    },
  ];

  const currentPageURL = window.location.href;

  return (
    <div className="px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Community Stories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-sm text-gray-600">{story.description}</p>
              <p className="text-xs text-gray-500">— {story.author}</p>

              <div className="mt-3">
                <FacebookShareButton url={currentPageURL} quote={story.title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
