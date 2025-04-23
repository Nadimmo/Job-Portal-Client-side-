import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ShowDetails = () => {
  const company = useLoaderData();
//   console.log()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 mb-10">
      <img
        src={company?.icon}
        alt={company?.title}
        className="w-full rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{company?.title || "Digital Technology"}</h1>
      <p className="text-lg text-gray-700 font-semibold mb-1">Company: {company?.name}</p>
      <p className="text-gray-600 mb-1">Location: {company?.location}</p>
      <p className="text-gray-600 mb-1">Vacancy: {company?.jobs}</p>
      <a
        href={company?.jobLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        View Job Posting
      </a>
    </div>
  );
};

export default ShowDetails;
