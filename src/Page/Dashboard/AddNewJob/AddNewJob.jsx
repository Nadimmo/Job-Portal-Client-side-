import React, { useState } from "react";
import useAxiosPublic from "../../../Components/Hooks/useAxiosPublic";
import axios from "axios";
import { responsivePropType } from "@mui/system";

const AddNewJob = () => {
  const  axiosPublic  =  useAxiosPublic()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const title = form.title.value;
    const companyName = form.companyName.value;
    const location = form.location.value;
    const salary = form.salary.value;
    const type = form.type.value;
    const avatarFile = form.avatar.files[0]; // file upload
    const experienceLevel = form.experienceLevel.value;
    const education = form.education.value;
    const deadline = form.deadline.value;
    const requirements = form.requirements.value;
    const responsibilities = form.responsibilities.value;
    const shortDescription = form.description.value;
  
    if (!avatarFile) {
      alert("Please upload a company logo");
      return;
    }
  
    try {
      // 1. Upload Image to ImgBB
      const imageData = new FormData();
      imageData.append("image", avatarFile);
  
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4fc956d34ad8f4a1ce04e663e1606a83`,
        imageData
      );
  
      const avatar = imgRes.data.data.url;
  
      // 2. Post Job Data to DB
      const jobData = {
        title,
        companyName,
        location,
        salary,
        type,
        avatar,
        experienceLevel,
        education,
        deadline,
        requirements,
        responsibilities,
        shortDescription,
      };
  
      const res = await axiosPublic.post("/newJobs", jobData); // Change "/jobs" to your actual backend route
  
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your new job has been poste",
          showConfirmButton: false,
          timer: 1500
        });
        form.reset();
      } else {
        alert("Failed to post job.");
      }
  
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Something went wrong!");
    }
  };
  
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">
        <input name="title" type="text" placeholder="Job Title" className="input" required />
        <input name="companyName" type="text" placeholder="Company Name" className="input"  required />

        <input name="location" type="text" placeholder="Location" className="input" required />
        <input name="salary" type="text" placeholder="Salary" className="input" required />
       

        <select name="type" className="input" >
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>

        <input name="avatar" type="file" placeholder="Company Logo URL" className="input"  />

        <input name="experienceLevel" type="text" placeholder="Experience Level (e.g. Mid)" className="input"  />
        <input name="education" type="text" placeholder="Education Requirement" className="input" />
        <input name="deadline" type="datetime-local" placeholder="Deadline" className="input"  required />

        <textarea name="requirements" placeholder="Job Requirements (comma separated)" className="textarea" ></textarea>
        <textarea name="responsibilities" placeholder="Job Responsibilities (comma separated)" className="textarea" ></textarea>
        <textarea name="description" placeholder="Short Description" className="textarea h-24" ></textarea>

        <div className="flex justify-center lg:justify-start text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all  cursor-pointer">
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewJob;

// Tailwind input/textarea styles
const style = `
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.textarea {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
`;
