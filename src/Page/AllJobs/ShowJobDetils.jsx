import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';
import axios from 'axios';

const ShowJobDetails = () => {
  const job = useLoaderData();
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const CLOUDINARY_UPLOAD_PRESET = "job portal";
    const CLOUDINARY_NAME = "dbjqzpbze";

  const handleShowModal = (id) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'You must be logged in to apply any job',
        showConfirmButton: false,
        timer: 1500
      })
      return navigate("/login")
    } else {
      return document.getElementById(`apply_modal_${id}`).showModal()
    }


  }


  const handleApply = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const education = form.education.value;
    const experience = form.experience.value;
    const skills = form.skills.value;
    const address = form.address.value;
    const date = form.date.value;
    const title = form.title.value || form.title.defaultValue; // use defaultValue if title is not in the form
    const email = form.email.value;
    const portfolio = form.portfolio.value;
    const linkedin = form.linkedin.value;
    const gitHub = form.gitHub.value;
    const resumeFile = form.resume.files[0]; // rename for clarity

    // Prepare FormData for Cloudinary
    const formData = new FormData();
    formData.append("file", resumeFile); //  use "file" instead of "image"
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_NAME);

    try {
      // Upload resume to Cloudinary (raw endpoint for PDFs)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/raw/upload`,
        formData
      );

      const resumeUrl = res.data.secure_url;

      // Now create the final job application object
      const applyInfo = {
        name,
        email,
        address,
        date,
        title,
        education,
        experience,
        portfolio,
        linkedin,
        gitHub,
        resume: resumeUrl, //  use URL, not file object
        skills,
      };

      // Post application data to your database
      const response = await axiosPublic.post("/appliedJobs", applyInfo);

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Applied successfully!",
        });
        form.reset(); // reset form if needed
      }
    } catch (error) {
      console.error("Error applying:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to apply!",
        text: error.message,
      });
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-16">
      {/* Image */}
      <div className="w-full h-64 overflow-hidden rounded-xl mb-6">
        <img
          src={job?.avatar}
          alt={job?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Job Title & Company */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{job?.title}</h1>
      <p className="text-xl font-semibold text-blue-700 mb-6">{job?.companyName}</p>

      {/* Job Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-600"><span className="font-semibold">Location:</span> {job?.location}</p>
          <p className="text-gray-600"><span className="font-semibold">Type:</span> {job?.type}</p>
          <p className="text-gray-600"><span className="font-semibold">Salary:</span> {job?.salary}</p>
        </div>
        <div>
          <p className="text-gray-600"><span className="font-semibold">Deadline:</span> {job?.deadline}</p>
          <p className="text-gray-600"><span className="font-semibold">Experience:</span> {job?.experienceLevel}</p>
          <p className="text-gray-600"><span className="font-semibold">Education:</span> {job?.education}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Job Overview</h2>
        <p className="text-gray-700 leading-relaxed">{job?.shortDescription}</p>
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Responsibilities</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job?.responsibilities}</p>
      </div>

      {/* Requirements */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">Requirements</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job?.requirements}</p>
      </div>

      {/* Apply Button */}
      <button onClick={() => handleShowModal(job._id)}
        className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition"
      >
        Apply Now
      </button>

      {/* Modal */}
      <dialog id={`apply_modal_${job._id}`} className="modal">
        <div className="modal-box w-full max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-xl mb-4 text-center">Apply for {job.title}</h3>

          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name='name' type="text" placeholder="First Name" className="input input-bordered w-full" required />
              <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
              <input name='address' type="text" placeholder="Address" className="input input-bordered w-full" />
              <input name='date' type="datetime-local" placeholder="Date" className="input input-bordered w-full" />
              <input name='title' type="text" placeholder="Job Title" className="input input-bordered w-full" defaultValue={job.title} />
              <input name='skills' type="text" placeholder="Skills" className="input input-bordered w-full" />
              <input name='education' type="text" placeholder="Education" className="input input-bordered w-full" />
              <input name='experience' type="text" placeholder="Experience" className="input input-bordered w-full" />
              <input name='portfolio' type="url" placeholder="Portfolio URL" className="input input-bordered w-full" />
              <input name='gitHub' type="url" placeholder="GitHub URL" className="input input-bordered w-full" />
              <input name='linkedin' type="url" placeholder="LinkedIn URL" className="input input-bordered w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
              <input name='resume' type="file" className="file-input file-input-bordered w-full" required />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600 hover:cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </dialog>

    </div>
  );
};

export default ShowJobDetails;
