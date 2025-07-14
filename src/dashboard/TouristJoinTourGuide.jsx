import React, { useState } from "react";

const TouristJoinTourGuide = () => {
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Send application data to backend here

    setModalOpen(true);
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

        <button type="submit" className="px-4 py-2 rounded border font-medium">
          Submit Application
        </button>
      </form>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Application Successful</h3>
            <p>Your tour guide application has been submitted successfully.</p>
            <button onClick={() => setModalOpen(false)} className="mt-6 px-4 py-2 border rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristJoinTourGuide;
