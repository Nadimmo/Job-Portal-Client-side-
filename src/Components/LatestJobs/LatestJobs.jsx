import { Link, useNavigate } from "react-router-dom";
import useLatestJobs from "../Hooks/useLatestJobs";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";
import { FaBookmark } from "react-icons/fa";



const JobCard = ({ title, location, type, index }) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const CLOUDINARY_UPLOAD_PRESET = "job portal";
  const CLOUDINARY_NAME = "dbjqzpbze";



  const handleShowModal = (index) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'You must be logged in to apply any job',
        showConfirmButton: false,
        timer: 1500
      })
      return navigate("/login")
    } else {
      return document.getElementById(`apply_modal_${index}`).showModal()
    }


  }


  const handleApply = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const education = form.education.value;
    const experience = form.experience.value;
    const skills = form.skills.value;
    const address = form.address.value;
    const date = form.date.value;
    const title = form.title.value || form.title.defaultValue; // use defaultValue if title is not in the form
    const email = form.email.value;
    const portfolio = form.portfolio.value;
    const linkedin = form.linkedin.value;
    const gitHub = form.gitHub.value;
    const resumeFile = form.resume.files[0]; // rename for clarity

    // Prepare FormData for Cloudinary
    const formData = new FormData();
    formData.append("file", resumeFile); //  use "file" instead of "image"
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_NAME);

    try {
      // Upload resume to Cloudinary (raw endpoint for PDFs)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/raw/upload`,
        formData
      );

      const resumeUrl = res.data.secure_url;

      // Now create the final job application object
      const applyInfo = {
        name,
        email,
        address,
        date,
        title,
        education,
        experience,
        portfolio,
        linkedin,
        gitHub,
        resume: resumeUrl, //  use URL, not file object
        skills,
      };

      // Post application data to your database
      const response = await axiosPublic.post("/appliedJobs", applyInfo);

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Applied successfully!",
        });
        form.reset(); // reset form if needed
      }
    } catch (error) {
      console.error("Error applying:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to apply!",
        text: error.message,
      });
    }
  };


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
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          {/* Apply Button */}
          <button onClick={() => handleShowModal(index)}
            className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition"
          >
            Apply Now
          </button>

          {/* Modal */}
          <dialog id={`apply_modal_${index}`} className="modal">
            <div className="modal-box w-full max-w-2xl">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-xl mb-4 text-center">Apply for {title}</h3>

              <form onSubmit={handleApply} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name='name' type="text" placeholder="First Name" className="input input-bordered w-full" required />
                  <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
                  <input name='address' type="text" placeholder="Address" className="input input-bordered w-full" />
                  <input name='date' type="datetime-local" placeholder="Date" className="input input-bordered w-full" />
                  <input name='title' type="text" placeholder="Job Title" className="input input-bordered w-full" defaultValue={title} />
                  <input name='skills' type="text" placeholder="Skills" className="input input-bordered w-full" />
                  <input name='education' type="text" placeholder="Education" className="input input-bordered w-full" />
                  <input name='experience' type="text" placeholder="Experience" className="input input-bordered w-full" />
                  <input name='portfolio' type="url" placeholder="Portfolio URL" className="input input-bordered w-full" />
                  <input name='gitHub' type="url" placeholder="GitHub URL" className="input input-bordered w-full" />
                  <input name='linkedin' type="url" placeholder="LinkedIn URL" className="input input-bordered w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                  <input name='resume' type="file" className="file-input file-input-bordered w-full" required />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600 hover:cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </dialog>

        </div>
      </div>

    </div>
  );
};

const LatestJobs = () => {
  const { latestJobs } = useLatestJobs()

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  mx-10">

        {latestJobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to={'/allJobs'} className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition">
          See More Jobs →
        </Link>
      </div>
    </section>
  );
};

export default LatestJobs;
