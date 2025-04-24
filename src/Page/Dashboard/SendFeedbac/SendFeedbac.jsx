import React, { useState } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import axios from "axios";
import Swal from "sweetalert2";

const SendFeedback = () => {
  const axiosPublic = useAxiosPublic()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const role = form.role.value;
    const feedback = form.feedback.value;
    const image = form.image.files[0];
  
    const formData = new FormData()
    formData.append("image", image);
  
    try {
      const res = await axios.post("https://api.imgbb.com/1/upload?key=1b65a8a855445b1b3daf858e85fd4479", formData)
      const imageURL = res.data.data.url;
  
      const info = { name, role, feedback, image: imageURL }
      const response = await axiosPublic.post("/review", info)
  
      if (response.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your feedback has been sent",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send feedback: " + err.message,
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Send Feedback</h2>
          <p className="text-gray-500 mt-2">We appreciate your thoughts!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation / Role</label>
            <input
              type="text"
              name="role"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="UI/UX Designer, Software Engineer, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Feedback</label>
            <textarea
              name="feedback"
              rows="4"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Your feedback here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 cursor-pointer"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendFeedback;
