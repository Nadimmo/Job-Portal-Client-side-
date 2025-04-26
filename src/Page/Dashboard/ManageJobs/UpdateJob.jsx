import React, { useState } from "react";
import axios from "axios";
import { responsivePropType } from "@mui/system";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const UpdateJob = () => {
    const axiosSecure = useAxiosSecure()
    const job = useLoaderData()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value || job.title;
        const companyName = form.companyName.value || job.companyName;
        const location = form.location.value || job.location;
        const salary = form.salary.value || job.salary;
        const type = form.type.value || job.type;
        const experienceLevel = form.experienceLevel.value || job.experienceLevel;
        const education = form.education.value || job.education;
        const deadline = form.deadline.value || job.deadline;
        const requirements = form.requirements.value || job.requirements;
        const responsibilities = form.responsibilities.value || job.responsibilities;
        const shortDescription = form.description.value || job.description;
        const avatarFile = form.avatar.files[0]; // file upload


        try {
            let imageURL = job.avatar // Default to existing image

            if (avatarFile) {
                // 1. Upload Image to ImgBB
                const imageData = new FormData();
                imageData.append("image", avatarFile);

                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=4fc956d34ad8f4a1ce04e663e1606a83`,
                    imageData
                );

                if (imgRes.success) {
                    imageURL = imgRes.data.data.url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // 2. Post Job Data to DB
            const jobData = {
                title,
                companyName,
                location,
                salary,
                type,
                avatar: imageURL,
                experienceLevel,
                education,
                deadline,
                requirements,
                responsibilities,
                shortDescription,
            };

            const res = await axiosSecure.put(`/updateJob/${job._id}`, jobData); // Change "/jobs" to your actual backend route
            // console.log(res.data)
            if (res.data.modifiedCount) {
                Swal.fire({
                    title: 'Job Updated Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/dashboard/manageJobs")
                form.reset();
            } else {
                Swal.fire({
                    title: 'No Changes Made!',
                    icon: 'info',
                    showConfirmButton: true,
                });
            }
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Something went wrong!");
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Update a Job</h2>
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 md:grid-cols-2 gap-6">
                <input defaultValue={job.title} name="title" type="text" placeholder="Job Title" className="input" />
                <input defaultValue={job.companyName} name="companyName" type="text" placeholder="Company Name" className="input" />

                <input defaultValue={job.location} name="location" type="text" placeholder="Location" className="input" />
                <input defaultValue={job.salary} name="salary" type="text" placeholder="Salary" className="input" />


                <select name="type" className="input" >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                </select>

                <input name="avatar" type="file" placeholder="Company Logo URL" className="input" />

                <input defaultValue={job.experienceLevel} name="experienceLevel" type="text" placeholder="Experience Level (e.g. Mid)" className="input" />
                <input defaultValue={job.education} name="education" type="text" placeholder="Education Requirement" className="input" />
                <input name="deadline" type="datetime-local" placeholder="Deadline" className="input" />

                <textarea defaultValue={job.requirements} name="requirements" placeholder="Job Requirements (comma separated)" className="textarea" ></textarea>
                <textarea defaultValue={job.responsibilities} name="responsibilities" placeholder="Job Responsibilities (comma separated)" className="textarea" ></textarea>
                <textarea defaultValue={job.shortDescription} name="description" placeholder="Short Description" className="textarea h-24" ></textarea>

                <div className="flex justify-center lg:justify-start text-center">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all  cursor-pointer">
                        Update Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateJob;

// Tailwind input/textarea styles
const style = `
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.textarea {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
`;
