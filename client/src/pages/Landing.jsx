import { useState } from 'react'
import womenSpa from "../assets/women-spa.webp"
import menSalon from "../assets/hair-studio-women.jpg"
import ac from "../assets/AC.webp"
import cleaning from "../assets/Cleaning.webp"
import Electricians from "../assets/Electrician.webp"
import waterPurifier from "../assets/home-painting.webp"
import { CiStar } from "react-icons/ci";
import SliderHome from './SliderHome'
import Typewriter from 'typewriter-effect'
import buildingRoof from "../assets/building-roof.jpeg"
import { NavLink, useNavigate } from 'react-router-dom'
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { MdHomeRepairService } from "react-icons/md";
import PropTypes from 'prop-types';

const ServiceCard = ({ img, title, onClick }) => (
  <div
    className="service-card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
    onClick={onClick}
  >
    <div className="h-48 overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="flex items-center mt-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <CiStar key={i} className="text-yellow-400 text-xl" />
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">4.8 (120+ reviews)</span>
      </div>
    </div>
  </div>
);

ServiceCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const Landing = () => {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      img: womenSpa,
      title: "Women's Salon & Spa",
      path: "/spaayurveda"
    },
    {
      img: menSalon,
      title: "Men's Salon & Massage",
      path: "/hairstudio"
    },
    {
      img: ac,
      title: "AC & Appliance Repair",
      path: "/acrepair"
    },
    {
      img: cleaning,
      title: "Cleaning & Pest Control",
      path: "/homepainting"
    },
    {
      img: Electricians,
      title: "Electrician Services",
      path: "/diwalilights"
    },
    {
      img: waterPurifier,
      title: "Water Purifier",
      path: "/waterpurifier"
    },
  ];

  const feedbacks = [
    "This platform has made my life so much easier! I've booked both cleaning and beauty services, and the professionals were polite, punctual, and did a great job. The booking process was smooth, and I liked how I could choose a time slot that suited me.",
    "I recently used this platform to book a handyman for some repairs at home, and I must say I was thoroughly impressed. The website was easy to navigate, and finding a service provider was hassle-free. The handyman arrived on time and completed the job quickly.",
    "I booked a plumber through this website for some urgent repairs. The actual work was done efficiently and the pricing was fair. If they can work on their response times, it would be a 5-star experience.",
    "The idea behind this platform is great, and it's easy to find verified service providers in various categories. The service provider was excellent and very professional.",
    "I've used this website multiple times, from hiring electricians to beauty experts, and I'm always impressed by the professionalism and quality of service. The ratings and reviews system is helpful, and I trust this site to connect me with reliable professionals."
  ];

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentFeedbackIndex((prevIndex) =>
        prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
      );
      setFade(false);
    }, 500);
  };

  const handlePrevious = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentFeedbackIndex((prevIndex) =>
        prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
      );
      setFade(false);
    }, 500);
  };

  return (
    <div className="bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="home-main-background min-h-[80vh] flex items-center animate-fadeIn">
        <div className="container mx-auto px-4">
          <div className="max-w-xl md:ml-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Professional Services<br />
              <span className="text-[#4A90E2]">At Your Doorstep</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Quality service providers for all your home and personal needs, just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn-primary flex items-center justify-center"
                onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
              >
                <MdHomeRepairService className="mr-2 text-xl" />
                Explore Services
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate('/aboutus')}
              >
                About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services-section" className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide high-quality services for all your home and personal needs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                img={service.img}
                title={service.title}
                onClick={() => navigate(service.path)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Slider */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto">Featured Services</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our most popular offerings
          </p>
          <SliderHome />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-5/12 mb-10 md:mb-0">
              <img
                src={buildingRoof}
                alt="How it works"
                className="rounded-lg shadow-xl max-w-full h-auto mx-auto md:mr-10"
                style={{ maxWidth: '400px' }}
              />
            </div>

            <div className="w-full md:w-7/12 px-4">
              <h2 className="section-title">How It Works</h2>
              <p className="text-lg text-gray-600 mb-6">
                We make finding and booking service professionals easy:
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="w-8 h-8 rounded-full bg-[#4A90E2] text-white flex items-center justify-center font-semibold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Choose a Service</h3>
                    <p className="text-gray-600">Browse or search for the service you need.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="w-8 h-8 rounded-full bg-[#4A90E2] text-white flex items-center justify-center font-semibold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Select a Professional</h3>
                    <p className="text-gray-600">Review ratings and choose from verified professionals.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="w-8 h-8 rounded-full bg-[#4A90E2] text-white flex items-center justify-center font-semibold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Book an Appointment</h3>
                    <p className="text-gray-600">Schedule a time that&apos;s convenient for you.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <span className="w-8 h-8 rounded-full bg-[#4A90E2] text-white flex items-center justify-center font-semibold">4</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">Get the Job Done</h3>
                    <p className="text-gray-600">Enjoy high-quality service with transparent pricing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auto Typing Section */}
      <section className="py-16 bg-[#2A2A2A] text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Why Choose Innoserve?</h2>
            <div className="h-16 md:h-20 flex items-center justify-center text-xl md:text-2xl text-[#4A90E2]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Verified professionals at your service")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Transparent pricing with no hidden fees")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Quality service guaranteed")
                    .pauseFor(2000)
                    .deleteAll()
                    .typeString("Booking made simple and convenient")
                    .pauseFor(2000)
                    .start()
                }}
                options={{ loop: true, delay: 30, deleteSpeed: 20 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="section-title text-center mx-auto">What Our Customers Say</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Don&apos;t just take our word for it
          </p>

          <div className="max-w-3xl mx-auto px-4">
            <div className={`bg-gray-50 p-8 rounded-xl shadow-md ${fade ? 'feedback-exit' : 'feedback-enter'}`}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full mb-4 md:mb-0">
                  <p className="text-gray-700 text-lg italic relative">
                    <span className="text-5xl text-[#4A90E2] absolute -top-6 -left-4">&ldquo;</span>
                    {feedbacks[currentFeedbackIndex]}
                    <span className="text-5xl text-[#4A90E2] absolute -bottom-10 -right-4">&rdquo;</span>
                  </p>
                  <div className="mt-8 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {String.fromCharCode(65 + currentFeedbackIndex)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Happy Customer</h4>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <CiStar key={i} className="fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 gap-4">
              <button
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={handlePrevious}
              >
                <GrFormPrevious className="text-xl" />
              </button>
              <button
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={handleNext}
              >
                <GrFormNext className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#4A90E2]">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Book your first service today and experience the convenience of professional services at your doorstep.
            </p>
            <NavLink
              to="/category"
              className="inline-block px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Explore All Services
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
