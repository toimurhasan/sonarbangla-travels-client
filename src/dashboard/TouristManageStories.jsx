import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristManageStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = use(AuthContext);

  useEffect(() => {
    // Fetch all stories from API on mount
    async function fetchStories() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/stories/user?email=${currentUser.email}`
        );
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error("Failed to fetch stories", error);
      }
    }
    fetchStories();
  }, []);

  const handleDelete = async (storyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/api/stories/${storyId}`, {
            method: "DELETE",
          });

          const data = await res.json();

          if (res.ok && data.message === "Story deleted successfully") {
            Swal.fire({
              title: "Deleted!",
              text: "Your story has been deleted.",
              icon: "success",
            });
            // Remove the deleted story from state
            setStories((prev) => prev.filter((story) => story._id !== storyId));
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message || "Failed to delete story.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Failed to delete story", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting the story.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEdit = (storyId) => {
    navigate(`/dashboard/tourist/stories/edit/${storyId}`);
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
          <div className="flex  space-x-2">
            <button onClick={() => handleEdit(story._id)} className="btn btn-secondary btn-sm ">
              Edit
            </button>
            <button onClick={() => handleDelete(story._id)} className="btn btn-secondary btn-sm ">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TouristManageStories;
