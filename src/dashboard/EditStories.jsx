import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const EditStories = () => {
  const { storyId } = useParams();
  //   console.log(storyId);
  const [story, setStory] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`https://sonarbangla-travels.vercel.app/api/stories/${storyId}`)
      .then((res) => res.json())
      .then((data) => setStory(data))
      .catch((err) => console.error("Error loading story:", err));
  }, [storyId]);

  const handleRemoveImage = async (imageUrl) => {
    const res = await fetch(
      `https://sonarbangla-travels.vercel.app/api/stories/remove-image/${storyId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      }
    );

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

  const handleNewImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImageUrls = [];
    setUploading(true);
    for (let file of files) {
      const imgFormData = new FormData();
      imgFormData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: imgFormData,
          }
        );
        const data = await res.json();
        if (data.success) {
          uploadedImageUrls.push(data.data.display_url);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Image upload failed",
          text: "Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    setNewImages(uploadedImageUrls);
    setUploading(false);
  };

  const handleAddImages = async () => {
    const res = await fetch(
      `https://sonarbangla-travels.vercel.app/api/stories/add-images/${storyId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: newImages }), // replace with uploaded URLs
      }
    );

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
          onChange={handleNewImagesChange}
          className="border rounded p-1 cursor-pointer"
        />
        {uploading && (
          <p className="text-sm text-blue-600 font-medium mt-1">
            Creating link with imgbb...please wait
          </p>
        )}
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
