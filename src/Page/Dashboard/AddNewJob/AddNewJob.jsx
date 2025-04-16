import React, { useState } from "react";

const AddNewJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    salary: "",
    type: "Full Time",
    image: "",
    experienceLevel: "",
    education: "",
    requirements: "",
    responsibilities: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job submitted:", formData);
    // Submit to backend or API here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-20">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="title" type="text" placeholder="Job Title" className="input" onChange={handleChange} required />
        <input name="companyName" type="text" placeholder="Company Name" className="input" onChange={handleChange} required />

        <input name="location" type="text" placeholder="Location" className="input" onChange={handleChange} required />
        <input name="salary" type="text" placeholder="Salary" className="input" onChange={handleChange} required />

        <select name="type" className="input" onChange={handleChange} value={formData.type}>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Internship</option>
          <option>Remote</option>
          <option>Hybrid</option>
        </select>

        <input name="image" type="file" placeholder="Company Logo URL" className="input" onChange={handleChange} />

        <input name="experienceLevel" type="text" placeholder="Experience Level (e.g. Mid)" className="input" onChange={handleChange} />
        <input name="education" type="text" placeholder="Education Requirement" className="input" onChange={handleChange} />

        <textarea name="requirements" placeholder="Job Requirements (comma separated)" className="textarea" onChange={handleChange}></textarea>
        <textarea name="responsibilities" placeholder="Job Responsibilities (comma separated)" className="textarea" onChange={handleChange}></textarea>

        <div className="md:col-span-2  w-full">
          <textarea name="description" placeholder="Short Description" className="textarea h-24" onChange={handleChange}></textarea>
        </div>

        <div className="md:col-span-2 text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
            Submit Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewJob;

// Tailwind input/textarea styles
const style = `
.input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
.textarea {
  @apply w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
}
`;
