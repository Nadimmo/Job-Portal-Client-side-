import React, { useState } from 'react';

const PostCompany = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    logo: '',
    location: '',
    vacancy: '',
    jobLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company submitted:', formData);
    // You can send the data to your backend or database here
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Post a New Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Logo / Image URL</label>
            <input
              type="file"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter logo or image URL"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter company location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Vacancy</label>
            <input
              type="number"
              name="vacancy"
              value={formData.vacancy}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter number of job vacancies"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Job Link</label>
            <input
              type="url"
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter job application link"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Post Company
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCompany;
