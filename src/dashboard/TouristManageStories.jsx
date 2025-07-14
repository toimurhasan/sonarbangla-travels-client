import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TouristManageStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all stories from API on mount
    async function fetchStories() {
      try {
        const res = await fetch("/api/stories");
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      }
    }
    fetchStories();
  }, []);

  const handleDelete = async (storyId) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      await fetch(`/api/stories/${storyId}`, { method: "DELETE" });
      setStories((prev) => prev.filter((story) => story._id !== storyId));
    } catch (error) {
      console.error("Failed to delete story", error);
    }
  };

  const handleEdit = (storyId) => {
    navigate(`/dashboard/tourist/edit-story/${storyId}`);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.length === 0 && <p className="col-span-full text-center">No stories found.</p>}

      {stories.map((story) => (
        <div key={story._id} className="border rounded shadow p-4 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
          <p className="flex-grow whitespace-pre-line mb-4">{story.content}</p>
          {story.images && story.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {story.images.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`story-img-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button onClick={() => handleEdit(story._id)} className="px-3 py-1 border rounded">
              Edit
            </button>
            <button onClick={() => handleDelete(story._id)} className="px-3 py-1 border rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TouristManageStories;
