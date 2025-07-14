import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";

const TouristStorySection = () => {
  const navigate = useNavigate();

  // Change this based on your real auth logic
  const isLoggedIn = false;

  const stories = [
    {
      id: 1,
      title: "A Magical Trip to Sajek",
      author: "Tania Akter",
      image: "https://source.unsplash.com/400x250/?sajek,valley,1",
      text: "It was a dreamy experience! The fog, hills, and tribal hospitality made it unforgettable.",
    },
    {
      id: 2,
      title: "Exploring the Roots in Srimangal",
      author: "Rafiul Hasan",
      image: "https://source.unsplash.com/400x250/?tea,garden,bangladesh",
      text: "Srimangal's tea gardens and rainy weather brought peace to my soul.",
    },
    {
      id: 3,
      title: "Mystery of the Sundarbans",
      author: "Asif Chowdhury",
      image: "https://source.unsplash.com/400x250/?sundarbans,forest",
      text: "Creepy yet exciting tour through the mangrove jungle—highly recommended!",
    },
    {
      id: 4,
      title: "The Calm of Kuakata",
      author: "Nusrat Jahan",
      image: "https://source.unsplash.com/400x250/?kuakata,sea",
      text: "Watching both sunrise and sunset from the same beach was surreal.",
    },
  ];

  const handleShare = (url) => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return (
    <section className="py-12  px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tourist Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className=" shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full md:w-1/3 h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{story.title}</h3>
                <p className="text-sm mb-2">by {story.author}</p>
                <p className=" text-sm">{story.text}</p>
              </div>

              <div className="mt-4">
                {isLoggedIn ? (
                  <FacebookShareButton
                    url={`https://your-site.com/story/${story.id}`}
                    quote={story.title}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                ) : (
                  <button
                    onClick={() => handleShare()}
                    className="bg-blue-600  px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Login to Share
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/community")}
          className="bg-emerald-600  px-6 py-2 rounded hover:bg-emerald-700 transition text-lg"
        >
          All Stories
        </button>
      </div>
    </section>
  );
};

export default TouristStorySection;
