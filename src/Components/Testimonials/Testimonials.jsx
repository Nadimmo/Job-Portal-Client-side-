import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    feedback: "This platform helped me land my dream job! Highly recommend it.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "HR Manager",
    feedback: "We found amazing candidates through this job portal. Fantastic experience!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Smith",
    role: "UI/UX Designer",
    feedback: "The job recommendations were spot on. The application process was seamless.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Success Stories</h2>
        <p className="text-sm text-gray-500 mb-2">
          Discover how our satisfied clients have used our job search platform to land their dream jobs.
        </p>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          className="px-4"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="mt-4 text-gray-700 italic">"{testimonial.feedback}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
