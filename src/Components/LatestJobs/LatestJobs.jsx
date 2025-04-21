import { Link } from "react-router-dom";
import useLatestJobs from "../Hooks/useLatestJobs";


const JobCard = ({ title, location, type }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 relative">
      <span className={`absolute top-2 left-2 px-3 py-1 text-sm font-bold rounded ${type === "Full Time" ? "bg-green-100 text-green-700" :
        type === "Part Time" ? "bg-yellow-100 text-yellow-700" : "bg-pink-100 text-pink-700"
        }`}>{type}</span>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{location}</p>
        <button className="mt-4 px-4 py-2 border border-green-500 text-green-500 rounded hover:cursor-pointer hover:text-black hover:bg-green-500  transition">
          APPLY NOW
        </button>
      </div>
    </div>
  );
};

const LatestJobs = () => {
  const { latestJobs } = useLatestJobs()

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Latest Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
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
