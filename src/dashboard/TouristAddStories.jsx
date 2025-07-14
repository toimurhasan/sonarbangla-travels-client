import React, { useState } from "react";
import { useNavigate } from "react-router";

const TouristAddStories = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Convert FileList to array and append to images state
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for images + other fields
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((img, i) => formData.append("images", img));

    // TODO: Replace with actual API call to save story
    try {
      await fetch("/api/stories", {
        method: "POST",
        body: formData,
      });
      // After save, navigate to manage stories route
      navigate("/dashboard/tourist/manage-stories");
    } catch (error) {
      console.error("Failed to save story", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
            placeholder="Enter story title"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1 font-medium">
            Story Content
          </label>
          <textarea
            id="content"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full border p-2 rounded"
            placeholder="Write your story here"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((img, index) => {
                const url = URL.createObjectURL(img);
                return (
                  <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                    <img
                      src={url}
                      alt={`preview-${index}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-gray-200 rounded-full p-1 text-sm"
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button type="submit" className="px-4 py-2 rounded border font-medium">
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default TouristAddStories;
