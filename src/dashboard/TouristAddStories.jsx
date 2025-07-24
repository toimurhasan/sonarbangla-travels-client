import axios from "axios";
import React, { use, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristAddStories = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = use(AuthContext);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    const uploadedImageUrls = [];

    for (let file of files) {
      const imgFormData = new FormData();
      imgFormData.append("image", file);

      try {
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          imgFormData
        );
        uploadedImageUrls.push(data.data.display_url);
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

    setImages((prev) => [...prev, ...uploadedImageUrls]);
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.email) {
      return Swal.fire({
        icon: "error",
        title: "User not authenticated",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const storyData = {
      title,
      description: content,
      images,
      userName: currentUser.displayName || "Anonymous",
      userEmail: currentUser.email,
      userPhoto: currentUser.photoURL || "",
    };

    try {
      await axios.post("https://sonarbangla-travels.vercel.app/api/stories/add-stories", storyData);
      Swal.fire({
        icon: "success",
        title: "Your story has been saved!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/manage-stories");
    } catch (error) {
      console.error("Failed to save story", error);
      Swal.fire({
        icon: "error",
        title: "Failed to save story",
        text: "Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Upload images</legend>
            <input
              type="file"
              className="file-input"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
            />
            <label className="label">Max size 2MB</label>
          </fieldset>
          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((imgUrl, index) => (
                <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`uploaded-${index}`}
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
              ))}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default TouristAddStories;
