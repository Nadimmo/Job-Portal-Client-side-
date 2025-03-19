import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed successfully with ${email}`);
    setEmail(""); // Clear input after submission
  };

  return (
    <section className="py-12  bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold  mb-4">Stay Updated!</h2>
        <p className="text-lg  mb-6">
          Subscribe to get the latest job alerts and career tips directly to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-80 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-gray-200 cursor-pointer hover:text-black"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
