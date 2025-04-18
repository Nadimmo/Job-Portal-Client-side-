import React, { useState } from "react";
import useLatestBlogs from "../Hooks/useLatestBlogs";

const LatestBlog = () => {
  const { blogs } = useLatestBlogs();
  const [expandedIndexes, setExpandedIndexes] = useState({});

  const toggleSummary = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        Latest Blog & News
      </h1>
      <p className="text-gray-600 text-center mb-10">
        Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30,000+ companies worldwide.
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => {
          const isExpanded = expandedIndexes[index] || false;

          const truncateSummary = blog.summary.split(" ").length > 10
            ? blog.summary.split(" ").slice(0, 10).join(" ") + "..."
            : blog.summary;

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-2">
                  {blog.title}
                </h3>
                <p className="text-justify mt-4">
                  {isExpanded ? blog.summary : truncateSummary}
                </p>
                {blog.summary.split(" ").length > 20 && (
                  <button
                    onClick={() => toggleSummary(index)}
                    className="text-blue-500 mt-2 cursor-pointer hover:underline"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestBlog;
