import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";

const Story = () => {
  const data = useLoaderData();
  const [story] = useState(data);
  const { title, description, images, userName, userEmail, userPhoto, date } = story;

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <figure>
          {images && images.length > 0 ? (
            <img src={images[0]} alt="Story Image" className="w-full h-64 object-cover" />
          ) : (
            <img
              src="https://via.placeholder.com/600x400"
              alt="Placeholder"
              className="w-full h-64 object-cover"
            />
          )}
        </figure>
        <div className="card-body">
          <div className="flex items-center mb-4">
            {userPhoto ? (
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={userPhoto} alt={userName} />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder-placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-xl">{userName.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            )}
            <div className="ml-4">
              <h2 className="font-bold text-xl">{userName}</h2>
              <p className="text-sm text-gray-500">{userEmail}</p>
            </div>
          </div>
          <h2 className="font-bold text-xl mb-2">{title}</h2>
          <p>{description}</p>

          <div className="mt-4 text-sm text-gray-500">
            Posted on {new Date(date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
