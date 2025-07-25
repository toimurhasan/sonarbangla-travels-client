import { useState } from "react";
import Swal from "sweetalert2";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    image: "",
    images: [""],
    description: "",
    tourPlan: [{ day: "", activities: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handlePlanChange = (index, field, value) => {
    const updated = [...formData.tourPlan];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, tourPlan: updated }));
  };

  const addPlanField = () => {
    setFormData((prev) => ({
      ...prev,
      tourPlan: [...prev.tourPlan, { day: "", activities: "" }],
    }));
  };

  const removePlanField = (index) => {
    const updated = [...formData.tourPlan];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, tourPlan: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://sonarbangla-travels.vercel.app/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Package added:", result);
        Swal.fire({
          icon: "success",
          title: "Package added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Optionally reset the form
        setFormData({
          title: "",
          type: "",
          price: "",
          image: "",
          images: [""],
          description: "",
          tourPlan: [{ day: "", activities: "" }],
        });
      } else {
        throw new Error("Failed to add package");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Tour Package</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          required
          name="title"
          type="text"
          placeholder="Package Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          required
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Adventure">Adventure</option>
          <option value="Relaxation">Relaxation</option>
          <option value="Eco-tour">Eco-tour</option>
        </select>

        <input
          required
          name="price"
          type="number"
          placeholder="Price (USD)"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          required
          name="image"
          type="text"
          placeholder="Thumbnail Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="space-y-2">
          <label className="block font-medium">Gallery Images</label>
          {formData.images.map((img, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder={`Image ${idx + 1} URL`}
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeImageField(idx)}
                className="border px-3 py-1 cursor-pointer rounded"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="cursor-pointer border px-3 py-1 rounded"
          >
            + Add Image
          </button>
        </div>

        <textarea
          name="description"
          rows="4"
          placeholder="Tour Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="space-y-2">
          <label className="block font-medium">Tour Plan</label>
          {formData.tourPlan.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Day (e.g., Day 1)"
                value={item.day}
                onChange={(e) => handlePlanChange(idx, "day", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Activities"
                value={item.activities}
                onChange={(e) => handlePlanChange(idx, "activities", e.target.value)}
                className="border px-3 py-2 rounded"
              />
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removePlanField(idx)}
                  className="cursor-pointer border px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPlanField}
            className="border cursor-pointer px-3 py-1 rounded"
          >
            + Add Day
          </button>
        </div>

        <button type="submit" className="px-6 cursor-pointer py-2 border rounded">
          Submit Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
