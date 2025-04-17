import React, { useState } from 'react';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';
import axios from 'axios';
import Swal from 'sweetalert2';

const PostCompany = () => {
  const axiosPublic = useAxiosPublic()


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.companyName.value;
    const title = form.title.value;
    const location = form.location.value;
    const jobs = form.vacancy.value;
    const jobLink = form.jobLink.value;
    const icon = form.logo.files[0];

    const imageData = new FormData()
    imageData.append("image", icon)
    ///send image in  imagebb and if response image  url then send all data in database///
    axios.post(
      `https://api.imgbb.com/1/upload?key=4fc956d34ad8f4a1ce04e663e1606a83`,
      imageData
    )
      .then(res => {
        const imageURL = res.data.data.url
        const companiesData = {
          name,
          title,
          location,
          jobLink,
          jobs,
          icon: imageURL
        }

        axiosPublic.post("/newCompany", companiesData)
        .then((res)=>{
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your new company has been poste",
              showConfirmButton: false,
              timer: 1500
            });
            form.reset();
          } else {
            alert("Failed to post job.");
          }
        })
      })
      .catch(err =>{
        console.log(err.message)
      })
    // console.log('Company submitted:', companiesData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Post a New Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Job Title</label>
            <input
              type="text"
              name="title"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter title name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Logo / Image URL</label>
            <input
              type="file"
              name="logo"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter logo or image URL"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Vacancy</label>
            <input
              type="number"
              name="vacancy"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter number of job vacancies"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Job Link</label>
            <input
              type="url"
              name="jobLink"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job application link"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Post Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCompany;
