import React from "react";
import { FaAndroid, FaFacebook, FaGoogle, FaLinkedin, FaSpotify } from "react-icons/fa";
import { SiLenovo } from "react-icons/si";

const companies = [
    { name: "Facebook", vacancies: 40, logo: <FaFacebook /> },
    { name: "Google", vacancies: 40, logo: <FaGoogle /> },
    { name: "Android", vacancies: 40, logo: <FaAndroid /> },
    { name: "Lenovo", vacancies: 40, logo: <SiLenovo /> },
    { name: "Spotify", vacancies: 40, logo: <FaSpotify /> },
    { name: "LinkedIn", vacancies: 40, logo: <FaLinkedin /> },
];

const Company = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-6">
            <div className="lg:flex justify-between items-center">
                <div className="mb-10">
                    {/* Left Section - Title & Text */}
                    <div className="text-center lg:text-left mb-10">
                        <h1 className="text-4xl font-bold text-gray-900">Find the Best Companies</h1>
                        <p className="text-gray-600 mt-4">
                            Explore thousands of open positions worldwide. Get personalized salary estimates and company reviews.
                        </p>
                    </div>
                    {/* Grid Section */}
                    <div className="grid grid-cols-2 lg:gap-6 gap-2">
                        {companies.map((company, index) => (
                            <div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4 hover:bg-blue-100 transition-all duration-300"
                            >
                                <div className="bg-blue-100 p-2 rounded-full">{company.logo}</div>
                                <div>
                                    <h2 className="text-lg font-semibold">{company.name}</h2>
                                    <p className="text-gray-500 text-sm">{company.vacancies} Vacancies</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                {/* Right Section - image */}
                <img src="https://i.ibb.co.com/Kpm65CZ7/office.jpg" alt="" className="lg:w-[440px] lg:ml-4 rounded-xl" />
            </div>
            {/* CTA Button */}
            <div className="text-center mt-8">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition">
                    See More Companies →
                </button>
            </div>
        </div>
    );
};

export default Company;
