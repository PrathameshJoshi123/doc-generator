import React from 'react';
import { Star } from 'lucide-react';
import SpotlightCard from '../reactBits/SpotlightCard';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer",
      content:
        "This tool saved me hours of documentation work. The AI understands code structure perfectly.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b9512b2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Lead",
      content:
        "The side-by-side view makes it so easy to review and refine the generated documentation.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Emily Johnson",
      role: "Open Source Maintainer",
      content:
        "Perfect for open source projects. My contributors finally understand the codebase!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            See what developers are saying about DocGen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <SpotlightCard
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4"
                />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-blue-400 text-xs sm:text-sm font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
                "{testimonial.content}"
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;