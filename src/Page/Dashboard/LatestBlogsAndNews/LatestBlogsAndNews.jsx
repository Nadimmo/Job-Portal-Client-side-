import React, { useState } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import axios from "axios";
import Swal from "sweetalert2";

const LatestBlogsAndNews = () => {
  const axiosPublic = useAxiosPublic()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target
    const title = form.title.value;
    const date = form.date.value;
    const image = form.image.files[0];
    const category = form.category.value;

    const imageData = new FormData()
    imageData.append("image", image)

    axios.post(
      `https://api.imgbb.com/1/upload?key=4fc956d34ad8f4a1ce04e663e1606a83`,
      imageData
    )
      .then((res) => {
        const imageURL = res.data.data.url
        const info = {
          title,
          date,
          image: imageURL,
          category
        }
        axiosPublic.post('/latestBlogs', info)
          .then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your new job has been poste",
                showConfirmButton: false,
                timer: 1500
              });
              form.reset();
            }
          })
      })
      .catch(err => {
        console.log(err.message)
      })

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
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
          <input
            type="file"
            name="image"
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
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a short summary of the blog or news"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Submit Blog / News
        </button>
      </form>
    </div>
  );
};

export default LatestBlogsAndNews;
