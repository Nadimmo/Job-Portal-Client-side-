import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRocket, FaBriefcase, FaUserShield } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-blue-800 mb-4 tracking-wide">Contact Us</h2>
          <p className="text-gray-600 text-lg">We are always ready to help you connect with your dream job!</p>
        </motion.div>

        {/* Contact Info + Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Contact Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-xl rounded-3xl p-10 space-y-8 hover:shadow-2xl transition-shadow duration-300"
          >
            <h3 className="text-3xl font-bold text-blue-700 text-center mb-6">Get In Touch</h3>
            
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-center gap-5">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaPhoneAlt className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Phone</h4>
                  <p className="text-gray-600">+880 1234 567890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-5">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaEnvelope className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Email</h4>
                  <p className="text-gray-600">support@jobportal.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-5">
                <div className="bg-blue-100 p-4 rounded-full">
                  <FaMapMarkerAlt className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">Location</h4>
                  <p className="text-gray-600">Mirpur, Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white shadow-xl rounded-3xl p-10 space-y-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700 font-semibold" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:scale-105 transform transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-12">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Benefit 1 */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
            >
              <FaRocket className="text-blue-600 mx-auto text-5xl mb-6" />
              <h4 className="font-bold text-xl text-gray-700 mb-2">Quick Applications</h4>
              <p className="text-gray-600">Apply to jobs within minutes through our smooth platform.</p>
            </motion.div>
            {/* Benefit 2 */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
            >
              <FaBriefcase className="text-blue-600 mx-auto text-5xl mb-6" />
              <h4 className="font-bold text-xl text-gray-700 mb-2">Top Employers</h4>
              <p className="text-gray-600">We connect you with leading businesses and enterprises globally.</p>
            </motion.div>
            {/* Benefit 3 */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
            >
              <FaUserShield className="text-blue-600 mx-auto text-5xl mb-6" />
              <h4 className="font-bold text-xl text-gray-700 mb-2">Data Privacy</h4>
              <p className="text-gray-600">Your information is safe with our world-class security practices.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold text-gray-800 mb-4">Our Office Location</h3>
          <p className="text-gray-500 mb-8">Visit us at Mirpur, Dhaka, Bangladesh.</p>
          <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <MapContainer center={[23.8041, 90.3666]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={[23.8041, 90.3666]}>
                <Popup>
                  Job Portal Office - Mirpur, Dhaka
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
