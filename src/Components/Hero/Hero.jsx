import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import './hero.css'; // Assuming you have this CSS file for custom styles like .heroBack
import useLatestJobs from "../Hooks/useLatestJobs"; // Assuming this hook fetches job data correctly
import { useState } from "react";
import JobCard from "./JobCard"; // Assuming this component displays a single job
import { Link } from "react-router-dom";

const Hero = () => {
    // Custom hook to fetch latest job data
    const { latestJobs } = useLatestJobs();

    // State for search inputs
    const [searchKeyword, setSearchKeyword] = useState(""); // Added state for keyword search
    const [searchType, setSearchType] = useState("");
    const [searchLocation, setSearchLocation] = useState("");


    const filterJobs = latestJobs.filter(job =>

        (searchLocation === '' || (job.location && job.location.toLowerCase().includes(searchLocation.toLowerCase()))) &&
        (searchType === '' || (job.type && job.type === searchType)) &&
        (searchKeyword === '' || (job.title && job.title.toLowerCase().includes(searchKeyword.toLowerCase())))
    );



    return (
        <div>
            {/* Hero Section with Background Image and Overlay */}
            <div className="relative bg-cover bg-center h-screen flex items-center justify-center text-white heroBack">
                {/* Gradient Overlay */}
                {/* Note: Tailwind doesn't have a direct bg-linear-to-b/decreasing class. 
                     You might need custom CSS or adjust classes e.g., bg-gradient-to-b */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3570d0] via-[#3570d0]/70 to-teal-400/50 opacity-75"></div>

                <div className="relative text-center px-6 md:px-12 z-10">
                    <h1 className="text-4xl md:text-5xl font-bold">Find & Hire Experts for any Job</h1>
                    <p className="mt-4 text-lg">Find Jobs, Employment & Career Opportunities.</p>

                    {/* Search Form Container */}
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-4xl mx-auto">
                        {/* Keyword Search Input */}
                        <div className="flex items-center border rounded-lg p-2 w-full md:w-1/3 bg-white">
                            <FaSearch className="text-gray-500 mx-2" />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                className="w-full p-1 focus:outline-none text-black"
                                value={searchKeyword} // Control the input value
                                onChange={(e) => setSearchKeyword(e.target.value)} // Update state on change
                            />
                        </div>

                        {/* Location Select Dropdown */}
                        <div className="flex items-center border rounded-lg p-2 w-full md:w-1/4 bg-white">
                            <FaMapMarkerAlt className="text-gray-500 mx-2" /> {/* Added consistent color */}
                            <select
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full p-1 focus:outline-none text-black bg-white appearance-none" // Added appearance-none for better cross-browser styling if needed
                            >
                                <option value="">Select Location</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Australia">Australia</option>
                                <option value="India">India</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Japan">Japan</option>
                                <option value="China">China</option>
                                <option value="Brazil">Brazil</option>
                                {/* Add more locations as needed */}
                            </select>
                        </div>

                        {/* Job Type/Category Select Dropdown */}
                        <div className="flex items-center border rounded-lg p-2 w-full md:w-1/4 bg-white">
                            {/* You could add an icon here too if desired, e.g., FaListAlt */}
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value)}
                                className="w-full p-1 focus:outline-none text-black bg-white appearance-none" // Added appearance-none
                            >
                                <option value="">All Categories</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Internship">Internship</option>
                                <option value="On Site">On Site</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Remote">Remote</option>
                                {/* Add more types as needed */}
                            </select>
                        </div>


                    </div>
                    <p className="mt-4 text-sm text-gray-200">Popular Searches: Designer, Developer, Web, IOS, PHP, Senior Engineer</p>
                </div>
            </div>

            {/* Latest Jobs Section */}
            <section className="py-12 bg-gray-100">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Latest Jobs</h2>
                {/* Job Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Map over the filtered jobs and render JobCard for each */}
                    {/* It's better to use a unique job.id for the key if available */}
                    {filterJobs.length > 0 ? (
                        filterJobs.map((job, index) => (
                            <JobCard key={job.id || index} {...job} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">No jobs found matching your criteria.</p>
                    )}
                </div>

                {/* "See More Jobs" Button/Link */}
                <div className="text-center mt-10">
                    <Link to={'/allJobs'} className="inline-block px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300 ease-in-out">
                        See More Jobs →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Hero;