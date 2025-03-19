import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 ">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Section 1: Logo & Description */}
                <div>
                    <h2 className="text-xl font-bold">JobPortal</h2>
                    <p className="text-sm text-gray-400 mt-2">
                        Your go-to platform for finding the best job opportunities and hiring top talent.
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-blue-400">Home</a></li>
                        <li><a href="/jobs" className="hover:text-blue-400">Browse Jobs</a></li>
                        <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                    </ul>
                </div>

                {/* Section 3: Policies */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Policies</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-blue-400">Terms of Service</a></li>
                        <li><a href="/faq" className="hover:text-blue-400">FAQs</a></li>
                    </ul>
                </div>

                {/* Section 4: Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-400"><FaFacebook size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400"><FaTwitter size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400"><FaLinkedin size={24} /></a>
                        <a href="#" className="text-gray-400 hover:text-blue-400"><FaInstagram size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
