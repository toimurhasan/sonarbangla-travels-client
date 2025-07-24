import { use, useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

const CommunityPage = () => {
  const [stories, setStories] = useState([]);
  const currentPageURL = window.location.href;

  useEffect(() => {
    fetch("https://sonarbangla-travels.vercel.app/api/stories/all-stories")
      .then((res) => res.json())
      .then((data) => setStories(data));
  }, []);

  const { currentUser } = use(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">Community Stories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story._id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Image Display */}
            {story.images?.length > 1 ? (
              <div className="grid grid-cols-2 grid-rows-2 gap-1 h-48 overflow-hidden">
                {story.images.slice(0, 4).map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`Story Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ))}
              </div>
            ) : (
              <img src={story.images?.[0]} alt={story.title} className="w-full h-48 object-cover" />
            )}

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{story.title}</h3>
              <p className="text-sm text-gray-600">{story.description}</p>

              {/* show in a line */}
              <div className="flex justify-between items-center">
                {/* User Info */}
                <div className="flex items-center gap-3 mt-3">
                  {story.userPhoto && (
                    <img
                      src={story.userPhoto}
                      alt={story.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div className="text-xs text-gray-500">
                    <p>{story.userName}</p>
                    <p>{story.userEmail}</p>
                    <p>{new Date(story.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Share Button */}
                <div className="mt-3">
                  {currentUser ? (
                    <FacebookShareButton
                      url={`https://sonarbangla-travels.web.app/story/${story._id}`}
                      quote={story.title}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  ) : (
                    <button
                      onClick={() => handleShare()}
                      className="btn-secondary rounded-sm btn-sm btn"
                    >
                      Login to Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
