import React, { useContext, useState } from 'react';
import useAllJobs from '../../Components/Hooks/useAllJobs';

import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Components/Hooks/useAxiosPublic';
import { FaBookmark } from 'react-icons/fa';

const AllJobs = () => {

    const { allJobs } = useAllJobs()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

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

    const handleSave = async (job) => {
        if (!user) {
          Swal.fire({
            icon: 'error',
            title: 'You must be logged in to save any job',
            showConfirmButton: false,
            timer: 1500
          })
          return navigate("/login")
        } else {
          const jobInfo = {
            title: job.title,
            location: job.location,
            type: job.type,
            email: user?.email
          }
          try {
            const response = await axiosPublic.post("/savedJobs", jobInfo);
            if (response.data) {
              Swal.fire({
                icon: "success",
                title: "Saved job successfully!",
              });
            }
          } catch (error) {
            console.error("Error saving job:", error.message);
          }
        }
      }



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
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative cursor-pointer">
                        <span className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold rounded ${job.type === "Full Time" ? "bg-green-100 text-green-700" :
                            job.type === "Part Time" ? "bg-yellow-100 text-yellow-700" : "bg-pink-100 text-pink-700"
                            }`}>
                            {job.type}
                        </span>
                        {/* save job button */}
                        <button onClick={()=>handleSave(job)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition cursor-pointer">
                            <FaBookmark className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-gray-500 text-sm">{job.location}</p>
                            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                            {/* Apply Button */}
                            <Link to={`/showJobDetails/${job._id}`}
                                className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition"
                            >
                                Show Details
                            </Link>
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
