import React from "react";

const CTAForEmployers = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Hire Top Talent Today!</h2>
        <p className="text-lg mb-6">
          Post a job and connect with thousands of skilled professionals ready to join your team.
        </p>
        <a
          href="/post-job"
          className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full text-lg transition duration-300 hover:bg-gray-200 hover:text-blue-700"
        >
          Post a Job
        </a>
      </div>
    </section>
  );
};

export default CTAForEmployers;
