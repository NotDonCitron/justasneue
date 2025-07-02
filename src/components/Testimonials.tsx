import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Weber",
      role: "",
      venue: "",
      content: "Justas bringt mit seinen energiegeladenen Techno-Sets jede Crowd zum Kochen. Seine Leidenschaft für elektronische Musik ist in jedem Moment spürbar!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sarah Klein",
      role: "",
      venue: "",
      content: "Seit Justas bei uns auflegt, ist die Tanzfläche immer voll. Seine Trackauswahl und sein Gespür für den perfekten Moment machen jede Nacht unvergesslich.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Tom Fischer",
      role: "",
      venue: "",
      content: "Justas ist ein Garant für ekstatische Stimmung und treibende Beats. Seine Sets sind technisch brillant und voller Überraschungen.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/65.jpg"
    },
    {
      id: 4,
      name: "Lisa Müller",
      role: "",
      venue: "",
      content: "Justas versteht es, die Crowd mit treibenden Techno-Beats und einzigartigen Übergängen in Ekstase zu versetzen. Jeder Auftritt ist ein Erlebnis für echte Liebhaber elektronischer Musik!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/68.jpg"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
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
            <div className="text-gray-400">{t('testimonials.positiveReviews')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
            <div className="text-gray-400">{t('testimonials.satisfiedVenues')}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500 mb-2">4 Jahre</div>
            <div className="text-gray-400">{t('testimonials.yearsExperience')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;