import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaPen, FaHome, FaUser, FaList, FaComment, FaCog, FaAd, FaUsers, FaUserCircle, FaNewspaper } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className='min-h-screen ]'>
            {/* Mobile Menu Button */}
            <button className='md:hidden p-3 bg-[#EFDCAB] text-white  hover:bg-gray-700 transition duration-300' onClick={() => setIsOpen(!isOpen)}>
                <FaBars size={24} />
            </button>
            <div className='flex min-h-screen'>
                {/* Sidebar */}
                <div className={`bg-[#EFDCAB]  p-5 w-64 space-y-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className='space-y-2'>
                        {/* Admin Route */}
                      
                        <li><NavLink to='/dashboard/newCompany' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><IoMdAddCircle /> Post New Company</NavLink></li>
                        <li><NavLink to='/dashboard/newJob' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><IoMdAddCircle /> Post New Job</NavLink></li>
                        <li><NavLink to='/dashboard/newBlogs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><IoMdAddCircle /> Post Latest Blogs</NavLink></li>
                        <li><NavLink to='/dashboard/manageJobs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaList /> Manage Jobs</NavLink></li>
                        <li><NavLink to='/dashboard/manageAuthors' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaNewspaper
                        /> Manage Latest Blogs</NavLink></li>
                        <li><NavLink to='/dashboard/manageUsers' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaUsers /> Manage Users</NavLink></li>
                        <li><NavLink to='/' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#EFDCAB] text-gray-900 hover:text-black transition duration-300'><FaHome /> Home</NavLink></li>
                        <div className='divider'></div>
                        <li><NavLink to='/dashboard/profile' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaUserCircle className='text-xl' /> Profile</NavLink></li>
                        <li><NavLink to='/dashboard/appliedJobs' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaPen /> Applied Jobs</NavLink></li>
                        <li><NavLink to='/dashboard/feedback' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFB22C] text-gray-900 hover:text-black transition duration-300'><FaComment /> Send Feedback</NavLink></li>
                        <li><NavLink to='/' className='flex items-center gap-2 p-2 rounded-lg hover:bg-[#EFDCAB] text-gray-900 hover:text-black transition duration-300'><FaHome /> Home</NavLink></li>
                    </ul>
                </div>

                {/* Dashboard Content */}
                <div className='w-3/4 mx-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;