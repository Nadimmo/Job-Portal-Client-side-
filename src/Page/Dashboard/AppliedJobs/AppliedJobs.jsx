import React from 'react';
import useAppliedJob from '../../../Components/Hooks/useAppliedJob';
import { Trash2, FileText } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Components/Hooks/useAxiosPublic';

const AppliedJobs = () => {
  const { appliedJobs, refetch } = useAppliedJob();
  const axiosPublic = useAxiosPublic()

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
           axiosPublic.delete(`/appliedJobs/${id}`)
             .then((res) => {
               if (res.data.deletedCount) {
                 Swal.fire({
                   title: "Deleted!",
                   text: "Your job application has been removed.",
                   icon: "success"
                 });
                 refetch()
               }
             })
         }
       });
     }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">My Applied Jobs</h2>

      {appliedJobs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-12">
          You haven’t applied to any jobs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {appliedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-100 shadow-md rounded-xl p-6 transition-transform hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-blue-700">{job.title || "Untitled Position"}</h3>
              <p className="text-sm text-gray-500 mb-4">Applied on: {job.date || "N/A"}</p>

              <div className="space-y-1 text-gray-700 text-sm">
                <p><span className="font-semibold">Name:</span> {job.name}</p>
                <p><span className="font-semibold">Email:</span> {job.email}</p>
                <p><span className="font-semibold">Address:</span> {job.address}</p>
                <p><span className="font-semibold">Education:</span> {job.education}</p>
                <p><span className="font-semibold">Experience:</span> {job.experience}</p>
                <p><span className="font-semibold">Skills:</span> {job.skills}</p>
              </div>

              {/* Optional delete button */}
              <div className="mt-6 text-right">
                <button
                  onClick={() => handleRemove(job._id)}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
