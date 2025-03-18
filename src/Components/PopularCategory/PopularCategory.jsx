import { FaCode, FaChartLine, FaBullhorn, FaPaintBrush, FaShieldAlt, FaTasks, FaHeadset, FaPenNib } from "react-icons/fa";

const categories = [
  { name: "Software Development", icon: <FaCode />, vacancies: "1,200+" },
  { name: "Data Science", icon: <FaChartLine />, vacancies: "950+" },
  { name: "Digital Marketing", icon: <FaBullhorn />, vacancies: "870+" },
  { name: "Graphic Design", icon: <FaPaintBrush />, vacancies: "620+" },
  { name: "Cybersecurity", icon: <FaShieldAlt />, vacancies: "540+" },
  { name: "Project Management", icon: <FaTasks />, vacancies: "720+" },
  { name: "Customer Support", icon: <FaHeadset />, vacancies: "1,000+" },
  { name: "Content Writing", icon: <FaPenNib />, vacancies: "800+" },
];

const PopularCategory = () => {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            whileHover={{ scale: 1.1, rotate: 3 }}
            className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center justify-center transition-all duration-400 hover:bg-blue-500 hover:text-white cursor-pointer "
          >
            <div className="text-4xl">{category.icon}</div>
            <h3 className="text-lg font-semibold mt-4">{category.name}</h3>
            <p className="text-gray-500 text-sm mt-2">{category.vacancies} Jobs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategory;
