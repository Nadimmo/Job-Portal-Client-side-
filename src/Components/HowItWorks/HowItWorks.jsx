import React from "react";
import { FaUserPlus, FaSearch, FaBriefcase, FaThumbsUp } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-blue-600 text-4xl transition-transform duration-300" />,
    title: "Sign Up",
    description: "Create your free account as a job seeker or employer.",
  },
  {
    icon: <FaSearch className="text-green-600 text-4xl transition-transform duration-300" />,
    title: "Find Jobs",
    description: "Browse and apply for jobs that match your skills.",
  },
  {
    icon: <FaBriefcase className="text-purple-600 text-4xl transition-transform duration-300" />,
    title: "Apply & Get Hired",
    description: "Submit applications and connect with employers.",
  },
  {
    icon: <FaThumbsUp className="text-orange-600 text-4xl transition-transform duration-300" />,
    title: "Start Your Career",
    description: "Get hired and begin your professional journey!",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 border rounded-lg shadow-md transition duration-300 hover:bg-blue-50 hover:shadow-lg hover:scale-105"
            >
              <div className="mb-4 hover:scale-110">{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
