import React, { useContext } from 'react';
import useSaveJobs from '../../../Components/Hooks/useSaveJobs';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Profile = () => {
  const { savedJobs, deleteJob } = useSaveJobs(); // assume deleteJob is a function in your custom hook
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className=" items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-6 mt-6">
        <img
          src={user?.photoURL || 'https://via.placeholder.com/150'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border mx-auto "
        />
        <div className='text-center'>
          <h2 className="text-xl font-semibold">{user?.displayName || 'Unknown User'}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Saved Jobs</h3>
      {savedJobs?.length > 0 ? (
        savedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-4 rounded-lg shadow mb-4 lg:flex justify-between items-start"
          >
            <div>
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-gray-600">Location: {job.location}</p>
              <p className="text-gray-600">Type: {job.type}</p>
              <p className="text-gray-600">Email: {job.email}</p>
            </div>
            <button
              onClick={() => deleteJob(job._id)}
              className=" bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded lg:mt-20 md:mt-0 mt-4 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs saved yet.</p>
      )}
    </div>
  );
};

export default Profile;
