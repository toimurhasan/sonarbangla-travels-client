import { useState } from "react";

const TourGuideStories = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({
    title: "",
    description: "",
    images: [],
  });
  const [imageInput, setImageInput] = useState("");

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStory.title || !newStory.description || newStory.images.length === 0) return;

    const story = {
      id: Date.now(),
      ...newStory,
    };

    setStories([story, ...stories]);
    setNewStory({ title: "", description: "", images: [] });
    setImageInput("");
  };

  const handleDelete = (id) => {
    const updated = stories.filter((s) => s.id !== id);
    setStories(updated);
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setNewStory({ ...newStory, images: [...newStory.images, imageInput.trim()] });
      setImageInput("");
    }
  };

  const handleRemoveImage = (url) => {
    const filtered = newStory.images.filter((img) => img !== url);
    setNewStory({ ...newStory, images: filtered });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        <button onClick={() => setActiveTab("add")} className="px-4 py-2 border rounded">
          Add Story
        </button>
        <button onClick={() => setActiveTab("manage")} className="px-4 py-2 border rounded">
          Manage Stories
        </button>
      </div>

      {/* Add Story Form */}
      {activeTab === "add" && (
        <form onSubmit={handleAddStory} className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            value={newStory.title}
            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            placeholder="Story Description"
            rows="4"
            value={newStory.description}
            onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Image URL"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <button type="button" onClick={handleAddImage} className="px-4 py-2 border rounded">
              Add Image
            </button>
          </div>

          {newStory.images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {newStory.images.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt="story" className="w-24 h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="absolute top-0 right-0 text-xs p-1 border rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className="px-4 py-2 border rounded">
            Submit Story
          </button>
        </form>
      )}

      {/* Manage Stories */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {stories.length === 0 ? (
            <p>No stories added yet.</p>
          ) : (
            stories.map((story) => (
              <div key={story.id} className="border p-4 rounded space-y-2">
                <h3 className="text-lg font-medium">{story.title}</h3>
                <p>{story.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {story.images.map((img, i) => (
                    <img key={i} src={img} alt="img" className="w-24 h-24 object-cover rounded" />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="px-4 py-2 border rounded mt-2"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TourGuideStories;
