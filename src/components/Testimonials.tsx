import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  venue: string;
  content: string;
  rating: number;
  image?: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Weber",
      role: "Event Manager",
      venue: "MS Connexion Complex",
      content: "Justas bringt eine unglaubliche Energie auf die Bühne. Seine Sets sind technisch perfekt und die Crowd-Reaktion ist immer phänomenal. Ein absoluter Profi!",
      rating: 5,
      image: "/images/image00003(1).jpeg"
    },
    {
      id: 2,
      name: "Sarah Klein",
      role: "Club Owner",
      venue: "Das Zimmer Mannheim",
      content: "Seit Jahren einer unserer zuverlässigsten DJs. Justas versteht es, die perfekte Atmosphäre zu schaffen und die Leute bis zum Schluss zu fesseln.",
      rating: 5,
      image: "/images/image00001(2).jpeg"
    },
    {
      id: 3,
      name: "Tom Fischer",
      role: "Booking Agent",
      venue: "Basement Club",
      content: "Justas hat sich in der deutschen Techno-Szene einen Namen gemacht. Seine Entwicklung als Artist ist beeindruckend und seine Sets werden immer besser.",
      rating: 5,
      image: "/images/image00002(1).jpeg"
    },
    {
      id: 4,
      name: "Lisa Müller",
      role: "Festival Coordinator",
      venue: "Underground Events",
      content: "Professionell, pünktlich und musikalisch auf höchstem Niveau. Justas ist genau der DJ, den man für wichtige Events braucht.",
      rating: 5,
      image: "/images/image00001(2).jpeg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Was andere sagen</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feedback von Venues, Event-Managern und der Techno-Community
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-neutral-900 rounded-2xl p-8 md:p-12">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-red-500/20">
              <Quote size={48} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-300 text-center mb-8 leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="text-center">
                {currentTestimonial.image && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={currentTestimonial.image} 
                      alt={currentTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-500"
                    />
                  </div>
                )}
                <div className="text-white font-semibold text-lg">
                  {currentTestimonial.name}
                </div>
                <div className="text-red-500 font-medium">
                  {currentTestimonial.role}
                </div>
                <div className="text-gray-400 text-sm">
                  {currentTestimonial.venue}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? 'bg-red-500' : 'bg-neutral-600'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors duration-300"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">100%</div>
            <div className="text-gray-400">Positive Bewertungen</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-gray-400">Zufriedene Venues</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">4 Jahre</div>
            <div className="text-gray-400">Erfahrung in der Szene</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;