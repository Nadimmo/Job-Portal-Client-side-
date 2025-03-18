import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import './hero.css'
const Hero = () => {
    return (
        <div className="relative bg-cover bg-center h-screen flex items-center justify-center text-white heroBack" >
            <div className="absolute inset-0 bg-linear-to-b/decreasing from-[#3570d0] to-teal-400 opacity-50 "></div>
            <div className="relative text-center px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold">Find & Hire Experts for any Job</h1>
                <p className="mt-4 text-lg">Find Jobs, Employment & Career Opportunities.</p>

                <div className="mt-6 bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <div className="flex items-center border rounded-lg p-2 w-full md:w-1/3">
                        <FaSearch className="text-black mx-2" />
                        <input
                            type="text"
                            placeholder="Search your keywords"
                            className="w-full p-2 focus:outline-none text-black"
                        />
                    </div>

                    <div className="flex items-center border rounded-lg p-2 w-full md:w-1/4">
                        <FaMapMarkerAlt className=" mx-2" />
                        <select className="w-full p-2 focus:outline-none text-black">
                            <option>Select Location</option>
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                            <option>India</option>
                            <option>Germany</option>
                            <option>France</option>
                            <option>Japan</option>
                            <option>China</option>
                            <option>Brazil</option>
                        </select>
                    </div>

                    <div className="flex items-center border rounded-lg p-2 w-full md:w-1/4">
                        <select className="w-full p-2 focus:outline-none text-black">
                            <option>Select Category</option>
                            <option>Part-Time</option>
                            <option>Full-Time</option>
                            <option>Remote</option>
                            <option>Hybrid On-Site</option>
                        </select>
                    </div>

                    <button className="bg-[#3a71ce] hover:bg-blue-600  hover:cursor-pointer px-6 py-3 rounded-lg font-bold">
                        SEARCH
                    </button>
                </div>
                <p className="mt-4 text-sm">Popular Searches: Designer, Developer, Web, IOS, PHP Senior Engineer</p>
            </div>
        </div>
    );
};

export default Hero;