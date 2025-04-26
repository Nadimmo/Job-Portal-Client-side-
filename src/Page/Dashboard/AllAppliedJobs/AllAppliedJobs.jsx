import React from 'react';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAllAppliedJobs from '../../../Components/Hooks/useAllAppliedJobs';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Components/Hooks/useAxiosSecure';

const AllAppliedJobs = () => {
  const { appliedAllJobs, refetch } = useAllAppliedJobs();
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
        axiosSecure.delete(`/appliedAllJobs/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch()
            }
          })
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">All Applied Jobs</h2>

      {appliedAllJobs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-12">
           Haven’t applied to any jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appliedAllJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-1">{job.title || "Untitled Position"}</h3>
                <p className="text-sm text-gray-500 mb-2">Applied on: {job.date || "N/A"}</p>

                <div className="space-y-1 text-gray-600 text-sm">
                  <p><span className="font-semibold">Name:</span> {job.name}</p>
                  <p><span className="font-semibold">Email:</span> {job.email}</p>
                  <p><span className="font-semibold">Address:</span> {job.address}</p>
                  <p><span className="font-semibold">Education:</span> {job.education}</p>
                  <p><span className="font-semibold">Experience:</span> {job.experience}</p>
                  <p><span className="font-semibold">Skills:</span> {job.skills}</p>
                </div>

                {/* Resume & Portfolio Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 text-sm">
                  {job.resume && (
                    <a href={job.resume} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1 px-3 rounded-md transition-colors"
                    >
                      <FileText size={16} /> Resume
                    </a>
                  )}
                  {job.portfolio && (
                    <a href={job.portfolio} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-1 px-3 rounded-md transition-colors"
                    >
                      🌐 Portfolio
                    </a>
                  )}
                  {job.linkedin && (
                    <a href={job.linkedin} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-1 px-3 rounded-md transition-colors"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {job.gitHub && (
                    <a href={job.gitHub} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-md transition-colors"
                    >
                      🐙 GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className=" gap-3 mt-6 text-right">
                <button onClick={() => handleRemove(job._id)}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition duration-200 cursor-pointer"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAppliedJobs;
