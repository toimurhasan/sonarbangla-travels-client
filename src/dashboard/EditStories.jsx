import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const EditStories = () => {
  const { storyId } = useParams();
  //   console.log(storyId);
  const [story, setStory] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/stories/${storyId}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Error loading story:", err));
  }, [storyId]);

  const handleRemoveImage = async (imageUrl) => {
    const res = await fetch(`http://localhost:3000/api/stories/remove-image/${storyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await res.json();

    if (res.ok) {
      setStory((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));
      Swal.fire("Removed!", "Image removed from story.", "success");
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewImages(urls); // for preview only
    // You should upload to an image host here and get actual URLs before submitting
  };

  const handleAddImages = async () => {
    const res = await fetch(`http://localhost:3000/api/stories/add-images/${storyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: newImages }), // replace with uploaded URLs
    });

    const data = await res.json();

    if (res.ok) {
      setStory((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      setNewImages([]);
      Swal.fire("Success", "New images added.", "success");
    } else {
      Swal.fire("Error", data.message, "error");
    }
  };

  if (!story) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Edit Story: {story.title}</h2>

      <div>
        <h3 className="font-medium">Existing Images:</h3>
        <div className="grid grid-cols-2 gap-2">
          {story.images.map((img, index) => (
            <div key={index} className="relative">
              <img src={img} alt={`img-${index}`} className="w-full h-32 object-cover rounded" />
              <button
                onClick={() => handleRemoveImage(img)}
                className="absolute top-1 right-1 bg-red-500 cursor-pointer text-white px-2 py-1 text-xs rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mt-4">Add New Images:</h3>
        <input
          type="file"
          multiple
          onChange={handleNewImagesChange}
          className="border rounded p-1 cursor-pointer"
        />
        {newImages.length > 0 && (
          <div className="mt-2">
            <button
              onClick={handleAddImages}
              className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded"
            >
              Upload New Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStories;
