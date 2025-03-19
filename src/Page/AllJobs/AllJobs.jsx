import React, { useState } from 'react';

const jobs = [
    {
        title: "Product Redesign",
        location: "2708 Scenic Way, IL 62373",
        type: "Full Time"
    },
    {
        title: "New Product Mockup",
        location: "2708 Scenic Way, IL 62373",
        type: "Full Time"
    },
    {
        title: "Custom Php Developer",
        location: "3765 C Street, Worcester",
        type: "Part Time"
    },
    {
        title: "Wordpress Developer",
        location: "2719 Duff Avenue, Winooski",
        type: "Part Time"
    },
    {
        title: "Web Maintenance",
        location: "2708 Scenic Way, IL 62373",
        type: "Internship"
    },
    {
        title: "Photoshop Designer",
        location: "2865 Emma Street, Lubbock",
        type: "Part Time"
    },
    {
        title: "HTML5 & CSS3 Coder",
        location: "2719 Burnside Avenue, Logan",
        type: "Full Time"
    },
    {
        title: ".Net Developer",
        location: "3815 Forest Drive, Alexandria",
        type: "Part Time"
    },
    {
        "title": "Senior Software Engineer (.NET)",
        "location": "Dhaka, Bangladesh",
        "type": "Hybrid"
    },
    {
        "title": ".NET Developer",
        "location": "New York City, USA",
        "type": "Remote"
    },
    {
        "title": "Junior .NET Programmer",
        "location": "Sylhet, Bangladesh",
        "type": "On Site"
    },
    {
        "title": "Lead .NET Architect",
        "location": "London, UK",
        "type": "Hybrid"
    },
    {
        "title": ".NET Web Application Developer",
        "location": "California, USA",
        "type": "Remote"
    },
    {
        "title": ".NET Support Specialist",
        "location": "Chittagong, Bangladesh",
        "type": "On Site"
    }
];

const AllJobs = () => {
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('');
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6;
    
    const filteredJobs = jobs.filter(job =>
        (searchLocation === '' || job.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
        (searchType === '' || job.type === searchType));

    // pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = filteredJobs.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);



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
                            <button className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:text-white hover:bg-green-500 transition">
                                APPLY NOW
                            </button>
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
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllJobs;
