import React from 'react';
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


const AllCompanies = () => {
  const companies = [
    { name: 'Facebook', icon: <FaFacebook />, location: 'Australia', jobs: 40 },
    { name: 'Google', icon: <FaGoogle />, location: 'Russia', jobs: 70 },
    { name: 'Android', icon: <FaAndroid />, location: 'Germany', jobs: 98 },
    { name: 'Lenovo', icon: <SiLenovo />, location: 'Italy', jobs: 86 },
    { name: 'Spotify', icon: <FaSpotify />, location: 'France', jobs: 45 },
    { name: 'Linkedin', icon: <FaLinkedin />, location: 'Greece', jobs: 60 },
    { name: 'Circle CI', icon: <SiCircleci />, location: 'China', jobs: 80 },
    { name: 'Skype', icon: <FaSkype />, location: 'Japan', jobs: 65 },
    { name: 'Snapchat', icon: <FaSnapchat />, location: 'Singapore', jobs: 43 },
    { name: 'Nvidia', icon: <SiNvidia />, location: 'United States', jobs: 76 },
    { name: 'Telegram', icon: <FaTelegram />, location: 'Spain', jobs: 93 },
    { name: 'Whatsapp', icon: <FaWhatsapp />, location: 'Jordan', jobs: 76 },
  ];

  return (
    <div className="container mx-auto py-8 pt-28">
      <h1 className="text-4xl font-bold text-center mb-10">Discover our latest digital marketing companies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-10">
        {companies.map((company, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4 text-blue-500 flex justify-center items-center">{company.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{company.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Digital Marketing Solutions for Tomorrow</p>
            <hr className='border border-gray-50 my-2' />
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500 flex "> <FaLocationArrow className='mx-2 my-1' /> {company.location}</span>
              <span className="text-blue-500">{company.jobs} Jobs</span>
            </div>
          </div>
        ))}
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
