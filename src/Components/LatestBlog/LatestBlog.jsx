import React from "react";

const blogs = [
  {
    title: "How to Land Your Dream Job in Tech",
    date: "March 18, 2025",
    time: "10:30 AM",
    image: "https://via.placeholder.com/400x250?text=Tech+Job",
    link: "#",
  },
  {
    title: "Top 10 Companies Hiring in 2025",
    date: "March 15, 2025",
    time: "02:00 PM",
    image: "https://via.placeholder.com/400x250?text=Top+Companies",
    link: "#",
  },
  {
    title: "Freelancing vs. Full-Time Jobs – Which is Better?",
    date: "March 12, 2025",
    time: "04:45 PM",
    image: "https://via.placeholder.com/400x250?text=Freelance+Vs+FullTime",
    link: "#",
  },
];

const LatestBlog = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">Latest Blog & News</h1>
      <p className="text-gray-600 text-center mb-10">
        Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30,000+ companies worldwide.
      </p>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            <img src={blog.image} alt={blog.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <p className="text-sm text-gray-500">{blog.date} • {blog.time}</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-2">{blog.title}</h3>
              <a href={blog.link} className="text-blue-500 font-semibold mt-4 inline-block hover:underline">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
