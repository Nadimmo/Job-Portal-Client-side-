import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaBookmark } from "react-icons/fa";

const JobCard = ({ title, location, type, index, _id }) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()



  const handleSave = async () => {
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
        title,
        location,
        type,
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
    <div>
      <div key={index} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative">
        <span className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold rounded ${type === "Full Time" ? "bg-green-100 text-green-700" :
          type === "Part Time" ? "bg-yellow-100 text-yellow-700" : "bg-pink-100 text-pink-700"
          }`}>
          {type}
        </span>
        {/* save job button */}
        <button onClick={handleSave} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition cursor-pointer">
          <FaBookmark className="w-5 h-5" />
        </button>


        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-500 text-sm">{location}</p>
          {/* show details button */}
          <Link to={`/showJobDetails/${_id}`}
            className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition"
          >
            Show Details
          </Link>
        </div>
      </div>

    </div>
  );
};

export default JobCard