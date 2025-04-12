import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styles
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate()
    // console.log(user.metadata.createdAt);


    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };


    const Links = (
        <>
            <li><NavLink to={'/'} className="nav-link">Home</NavLink></li>
            <li><NavLink to={'/about'} className="nav-link">About</NavLink></li>
            <li><NavLink to={'/allJobs'} className="nav-link">All Jobs</NavLink></li>
            <li><NavLink to={'/allCompanies'} className="nav-link">All Companies</NavLink></li>
            <li><NavLink to={'/dashboard/appliedJobs'} className="nav-link">Dashboard</NavLink></li>
        </>
    );



    return (
        <div className="navbar bg-gray-800 text-white shadow-lg fixed z-10 w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow-lg">
                        {Links}
                    </ul>
                </div>
                <Link to={'/'} className=" text-2xl font-bold">Wellfound</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Links}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <><button onClick={handleSignOut} className="font-semibold text-lg   transition duration-200 hover:text-blue-500 cursor-pointer bg-gray-800  border-none outline-none">Sign Out</button></> : <><Link to={'/login'} className="font-semibold text-lg hover:text-gray-300 transition duration-200">Login</Link></>}
            </div>
        </div>
    );s
}

export default Header;