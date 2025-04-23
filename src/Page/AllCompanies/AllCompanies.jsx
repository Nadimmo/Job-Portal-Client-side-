import React, { useState } from 'react';
import {
  FaFacebook,
  FaGoogle,
  FaAndroid,
  FaLinkedin,
  FaSpotify,
  FaTelegram,
  FaSnapchat,
  FaWhatsapp,
  FaSkype,
  FaLocationArrow,
} from 'react-icons/fa';
import { SiCircleci, SiLenovo, SiNvidia } from 'react-icons/si';
import useAllCompany from '../../Components/Hooks/useAllCompany';
import { Link } from 'react-router-dom';


const AllCompanies = () => {
  const iconMap = {
    FaFacebook: <FaFacebook />,
    FaGoogle: <FaGoogle />,
    FaAndroid: <FaAndroid />,
    SiLenovo: <SiLenovo />,
    FaSpotify: <FaSpotify />,
    FaLinkedin: <FaLinkedin />,
    SiCircleci: <SiCircleci />,
    FaSkype: <FaSkype />,
    FaSnapchat: <FaSnapchat />,
    SiNvidia: <SiNvidia />,
    FaTelegram: <FaTelegram />,
    FaWhatsapp: <FaWhatsapp />
  };

  const { companies } = useAllCompany()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6;
  // pagination
  const totalPages = Math.ceil(companies.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = companies.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  }

  return (
    <div className="container mx-auto py-8 pt-28">
      <h1 className="text-4xl font-bold text-center mb-10">Discover our latest digital marketing companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
        {currentPosts.map((company, index) => (
          <Link to={`/showDetails/${company._id}`} key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <img src={company.icon} alt="" className="w-20 h-20 rounded-[50%] mx-auto" />
            <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{company.title || "Digital Marketing Solutions for Tomorrow"}</p>
            <hr className='border border-gray-50 my-2' />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex "> <FaLocationArrow className='mx-2 my-1' /> {company.location}</span>
              <span className="text-blue-500">{company.jobs} Jobs</span>
            </div>
          </Link>
        ))}
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
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400  cursor-pointer"
        >
          Next
        </button>
      </div>
      <div className='lg:flex justify-around items-center mx-10 mt-10 gap-6 '>
        {/* left side accordion */}
        <div className='lg:mt-0 mt-4'>
          <h2 className='text-2xl font-bold py-3 lg:text-left text-center'>Frequently Asked Questions</h2>
          <p className='text-md text-gray-400 py-3 lg:text-left text-center'>Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">How do I create an account?</div>
            <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
            <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">How do I update my profile information?</div>
            <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
          </div>
        </div>
        <img src="https://i.ibb.co.com/Kpm65CZ7/office.jpg" alt="" className="lg:w-[440px]  rounded-xl lg:mt-0 mt-5" />
      </div>

    </div>

  );
};

export default AllCompanies;
