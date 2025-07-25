import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchRandomStories = async () => {
  const res = await fetch("https://sonarbangla-travels.vercel.app/api/stories/random");
  if (!res.ok) throw new Error("Failed to fetch stories");
  return res.json();
};

const TouristStorySection = () => {
  const navigate = useNavigate();

  // Change this based on your real auth logic
  // const isLoggedIn = false;

  const { currentUser } = use(AuthContext);

  // const stories = [
  //   {
  //     id: 1,
  //     title: "A Magical Trip to Sajek",
  //     author: "Tania Akter",
  //     image: "https://source.unsplash.com/400x250/?sajek,valley,1",
  //     text: "It was a dreamy experience! The fog, hills, and tribal hospitality made it unforgettable.",
  //   },
  //   {
  //     id: 2,
  //     title: "Exploring the Roots in Srimangal",
  //     author: "Rafiul Hasan",
  //     image: "https://source.unsplash.com/400x250/?tea,garden,bangladesh",
  //     text: "Srimangal's tea gardens and rainy weather brought peace to my soul.",
  //   },
  //   {
  //     id: 3,
  //     title: "Mystery of the Sundarbans",
  //     author: "Asif Chowdhury",
  //     image: "https://source.unsplash.com/400x250/?sundarbans,forest",
  //     text: "Creepy yet exciting tour through the mangrove jungle—highly recommended!",
  //   },
  //   {
  //     id: 4,
  //     title: "The Calm of Kuakata",
  //     author: "Nusrat Jahan",
  //     image: "https://source.unsplash.com/400x250/?kuakata,sea",
  //     text: "Watching both sunrise and sunset from the same beach was surreal.",
  //   },
  // ];

  // const [stories, setStories] = useState();
  // useEffect(() => {
  //   fetch("https://sonarbangla-travels.vercel.app/api/stories/random")
  //     .then((res) => res.json())
  //     .then((data) => setStories(data));
  // }, []);

  const {
    data: stories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["randomStories"],
    queryFn: fetchRandomStories,
  });

  const handleShare = (url) => {
    if (!currentUser) {
      navigate("/login");
    }
  };

  return (
    <section className="py-12  px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Tourist Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
        {stories?.map((story) => (
          <div
            key={story._id}
            className=" shadow-md px-6 rounded-2xl overflow-hidden flex flex-col items-center md:flex-row"
          >
            <img
              src={story.images[0]}
              alt={story.title}
              className="w-full rounded-2xl md:w-1/3 h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{story.title}</h3>
                <p className="text-sm mb-2">by {story.userName}</p>
                <p className=" text-sm">{story.description}</p>
              </div>

              <div className="mt-4">
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
        ))}
      </div>

      <div className="text-center">
        <button onClick={() => navigate("/community")} className="btn btn-primary">
          All Stories
        </button>
      </div>
    </section>
  );
};

export default TouristStorySection;
