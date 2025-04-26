import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const UpdateBlog = () => {
    const blog = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const title = form.title.value || blog.title;
        const summary = form.summary.value || blog.summary;
        const date = form.date.value || blog.data;
        const image = form.image.files[0];
        const category = form.category.value || blog.category

        try {
            let imageURL = blog.image // default image

            if (image) {
                const imageData = new FormData()
                imageData.append("image", image)

                const imageRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=4fc956d34ad8f4a1ce04e663e1606a83`,
                    imageData
                )
                if (imageRes.success) {
                    imageURL = imageRes.data.data.url
                } else {
                    throw new Error("Image upload failed");

                }
            }
            const info = {
                title,
                summary,
                date,
                image: imageURL,
                category
            }
            const res = await axiosSecure.put(`/updateBlog/${blog._id}`, info)
            if (res.data.modifiedCount) {
                Swal.fire({
                    title: 'Job Updated Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/dashboard/manageBlogs")
                form.reset();
            } else {
                Swal.fire({
                    title: 'No Changes Made!',
                    icon: 'info',
                    showConfirmButton: true,
                });
            }
        }
        catch (error) {
            console.error("Error posting job:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 bg-white shadow-2xl rounded-2xl mt-20">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Update Latest Blog or News</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Title</label>
                    <input
                        defaultValue={blog.title}
                        type="text"
                        name="title"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter blog/news title"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Date & Time</label>
                    <input
                        defaultValue={blog.data}
                        type="datetime-local"
                        name="date"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Image URL</label>
                    <input

                        type="file"
                        name="image"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter image URL"
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
                        defaultValue={blog.summary}
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
                    Update Blog / News
                </button>
            </form>
        </div>
    );
};

export default UpdateBlog;
