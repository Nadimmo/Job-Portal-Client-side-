import React, { useState } from 'react';
import { FaRegLifeRing, FaRocket, FaClock, FaBriefcase, FaShieldAlt, FaUsersCog, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'; // Import icons

// Sample JSON Data (you can load this from a separate file)
const data = {
  teamMembers: [
    {
      name: 'Nadim Mostofa',
      role: 'Job Specialist',
      image: 'https://i.ibb.co.com/dsVVDfZp/profile.jpg',
      socialLinks: {
        facebook: 'https://facebook.com/nadim',
        linkedin: 'https://linkedin.com/in/nadim',
        twitter: 'https://twitter.com/nadim'
      }
    },
    {
      name: 'Krista John',
      role: 'Job Specialist',
      image: 'https://i.ibb.co.com/8m0ydTC/aa.webp',
      socialLinks: {
        facebook: 'https://facebook.com/krista',
        linkedin: 'https://linkedin.com/in/krista',
        twitter: 'https://twitter.com/krista'
      }
    },
    {
      name: 'Roger Jackson',
      role: 'Job Specialist',
      image: 'https://i.ibb.co.com/rM2S9bf/author.jpg',
      socialLinks: {
        facebook: 'https://facebook.com/roger',
        linkedin: 'https://linkedin.com/in/roger',
        twitter: 'https://twitter.com/roger'
      }
    },
    {
      name: 'Jonny English',
      role: 'Job Specialist',
      image: 'https://i.ibb.co.com/02SBH3k/it-support.jpg',
      socialLinks: {
        facebook: 'https://facebook.com/jonny',
        linkedin: 'https://linkedin.com/in/jonny',
        twitter: 'https://twitter.com/jonny'
      }
    }
  ],
  faqs: [
    {
      question: 'How does our platform work?',
      answer: 'Our platform offers a simple and effective way for job seekers to find opportunities and for employers to connect with talent.'
    },
    {
      question: 'What is the minimum process to open an account?',
      answer: 'To get started, simply sign up with your email, verify your account, and complete your profile.'
    },
    {
      question: 'How to maintain data safety?',
      answer: 'We prioritize your privacy and security by using encryption and other industry-standard protocols.'
    }
  ]
};

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Title Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">About Wellfoun</h1>
        <p className="text-xl text-gray-600">
          At Wellfoun, we connect talented individuals with leading employers, creating seamless job opportunities. Our goal is to make job-hunting efficient and rewarding.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center">Here's why you'll love it WellFound</h2>
        <p className="text-md text-gray-600 my-3 text-center flex justify-center items-center">We're a team of passionate professionals who believe in creating a more efficient and rewarding job-hunting experience.</p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaRegLifeRing className="text-4xl text-blue-500" />}
            title="24/7 Support"
            description="Get help anytime you need it, no matter where you are."
          />
          <FeatureCard
            icon={<FaRocket className="text-4xl text-blue-500" />}
            title="Tech & Startup Jobs"
            description="Explore exciting opportunities in the tech industry and startups."
          />
          <FeatureCard
            icon={<FaClock className="text-4xl text-blue-500" />}
            title="Quick & Easy"
            description="A fast and user-friendly application process."
          />
          <FeatureCard
            icon={<FaBriefcase className="text-4xl text-blue-500" />}
            title="Save Time"
            description="Efficient job listings tailored to your preferences."
          />
          <FeatureCard
            icon={<FaShieldAlt className="text-4xl text-blue-500" />}
            title="Apply with Confidence"
            description="Verified job postings to ensure a secure job search."
          />
          <FeatureCard
            icon={<FaUsersCog className="text-4xl text-blue-500" />}
            title="Proactive Employers"
            description="Employers that actively reach out to you, not just waiting for applicants."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {data.teamMembers.map(member => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      {/* FAQs Section with Accordion */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div>
          {data.faqs.map((faq, index) => (
            <FaqCard key={faq.question} {...faq} index={index} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Have Questions? Get in Touch!</h2>
        <p className="text-lg text-gray-600 mb-6">
          We're here to help. Feel free to contact us for any inquiries or assistance you may need.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 cursor-pointer">
          Contact Us
        </button>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition duration-300">
    <span className="mb-4 flex justify-center items-center">{icon}</span>
    <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const TeamMemberCard = ({ name, role, image, socialLinks }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 w-64 text-center transition-transform transform hover:scale-105">
    <img className="rounded-full w-32 h-32 mx-auto mb-4" src={image} alt={name} />
    <h3 className="text-xl font-semibold text-primary">{name}</h3>
    <p className="text-gray-600">{role}</p>
    <div className="flex justify-center gap-4 mt-4">
      <a className='transaction duration-300 hover:scale-125' href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
        <FaFacebook className="text-2xl text-blue-600" />
      </a>
      <a className='transaction duration-300 hover:scale-125' href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-2xl text-blue-700" />
      </a>
      <a className='transaction duration-300 hover:scale-125' href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-2xl text-blue-400" />
      </a>
    </div>
  </div>
);

const FaqCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg mb-6">
      <button
        className="w-full text-left p-6 flex justify-between items-center text-lg font-semibold text-primary"
        onClick={toggleAccordion}
      >
        <span>{question}</span>
        <span className="cursor-pointer">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default About;
