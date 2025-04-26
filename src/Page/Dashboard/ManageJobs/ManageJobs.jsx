import React from 'react';
import useAllJobs from '../../../Components/Hooks/useAllJobs';
import { Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';

const ManageJobs = () => {
  const { allJobs, refetch } = useAllJobs();
  const axiosSecure = useAxiosSecure()

  const handleRemove = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/allJobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your job has been deleted.",
                icon: "success"
              });
              refetch()
            }
          })
      }
    });
  }


  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage All Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 mt-1">Company: <span className="font-medium">{job.companyName}</span></p>
            <p className="text-gray-600">Location: <span className="font-medium">{job.location}</span></p>

            <div className="flex items-center gap-4 mt-4">
              <Link to={`/dashboard/updateJob/${job._id}`}
                className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Pencil size={16} /> Edit
              </Link>
              <button onClick={() => handleRemove(job._id)}
                className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
