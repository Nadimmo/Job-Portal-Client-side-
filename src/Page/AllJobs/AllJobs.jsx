import React, { useState } from 'react';
import useAllJobs from '../../Components/Hooks/useAllJobs';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import axios from 'axios';

const AllJobs = () => {
    const axiosPublic = useAxiosPublic()
    // const  CLOUDINARY_URL='cloudinary://456383677727458:LBWQ3vOV51tSbjZkIVCVOlPjdhs@dbjqzpbze'
    const CLOUDINARY_UPLOAD_PRESET = "job portal";
    const CLOUDINARY_NAME = "dbjqzpbze";


    const { allJobs } = useAllJobs()
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6;

    const filteredJobs = allJobs.filter(job =>
        (searchLocation === '' || job.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
        (searchType === '' || job.type === searchType));

    // pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = filteredJobs.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
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
        formData.append("file", resumeFile); // ✅ use "file" instead of "image"
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
            resume: resumeUrl, // ✅ use URL, not file object
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
        <div className="bg-gray-100 pt-28 pb-12">
            <h2 className="text-3xl font-bold text-center mb-6">Our All Jobs</h2>

            {/* Search Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by Location"
                    className="px-4 py-2 border border-gray-300 rounded shadow-sm"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />
                <select
                    className="px-4 py-2 border border-gray-300 rounded shadow-sm"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Internship">Internship</option>
                    <option value="On Site">On Site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-10">
                {currentPosts.length > 0 ? currentPosts.map((job, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative">
                        <span className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold rounded ${job.type === "Full Time" ? "bg-green-100 text-green-700" :
                            job.type === "Part Time" ? "bg-yellow-100 text-yellow-700" : "bg-pink-100 text-pink-700"
                            }`}>
                            {job.type}
                        </span>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-gray-500 text-sm">{job.location}</p>
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            {/* Apply Button */}
                            <button
                               className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition" onClick={() => document.getElementById(`apply_modal_${index}`).showModal()}
                            >
                                Apply Now
                            </button>

                            {/* Modal */}
                            <dialog id={`apply_modal_${index}`} className="modal">
                                <div className="modal-box w-full max-w-2xl">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <h3 className="font-bold text-xl mb-4 text-center">Apply for {job.title}</h3>

                                    <form onSubmit={handleApply} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input name='name' type="text" placeholder="First Name" className="input input-bordered w-full" required />
                                            <input name = "email" type="email" placeholder="Email" className="input input-bordered w-full" required />
                                            <input name='address' type="text" placeholder="Address" className="input input-bordered w-full" />
                                            <input name='date' type="datetime-local" placeholder="Date" className="input input-bordered w-full" />
                                            <input name='title' type="text" placeholder="Job Title" className="input input-bordered w-full" defaultValue={job.title}/>
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
                    </div>
                )) : (
                    <p className="text-center text-gray-500">No jobs found</p>
                )}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllJobs;
