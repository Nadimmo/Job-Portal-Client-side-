import React, { useState } from "react";

const LatestBlogsAndNews = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add form submission logic here
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Submit Latest Blog or News</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter blog/news title"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Additional Topics for Job Portal */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            <option value="Job Tips">Job Tips</option>
            <option value="Industry News">Industry News</option>
            <option value="Interview Advice">Interview Advice</option>
            <option value="Resume Tips">Resume Tips</option>
            <option value="Career Growth">Career Growth</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Summary</label>
          <textarea
            name="summary"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a short summary of the blog or news"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Blog / News
        </button>
      </form>
    </div>
  );
};

export default LatestBlogsAndNews;
