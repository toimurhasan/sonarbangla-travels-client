import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const TouristJoinTourGuide = () => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [cvLink, setCvLink] = useState("");
  const { currentUser } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          reason,
          cv: cvLink,
          name: currentUser.displayName,
          email: currentUser.email,
        }),
      });

      if (response.ok) {
        // Success alert
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your tour guide application was submitted successfully.",
          confirmButtonText: "OK",
        });

        // Clear form
        setTitle("");
        setReason("");
        setCvLink("");
      } else if (response.status === 409) {
        // Duplicate application alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You have already applied to become a tour guide.",
          confirmButtonText: "Try again",
        });
      } else {
        // General error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit application. Please try again later.",
          confirmButtonText: "Try again",
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "Try again",
      });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Join as Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="title">
            Application Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter application title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="reason">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            id="reason"
            rows={5}
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Write your reason here"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="cvLink">
            CV Link
          </label>
          <input
            id="cvLink"
            type="url"
            required
            value={cvLink}
            onChange={(e) => setCvLink(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Provide link to your CV"
          />
        </div>

        <button type="submit" className="px-4 py-2 cursor-pointer rounded border font-medium">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default TouristJoinTourGuide;
