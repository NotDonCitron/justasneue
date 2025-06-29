import React from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

const Events: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Deep House Night',
      date: 'March 15, 2024',
      time: '22:00 - 04:00',
      location: 'Club Echo, Vilnius',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'
    },
    {
      id: 2,
      title: 'Sunset Sessions',
      date: 'March 22, 2024',
      time: '20:00 - 02:00',
      location: 'Rooftop Bar, Kaunas',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'
    },
    {
      id: 3,
      title: 'Electronic Fusion',
      date: 'April 5, 2024',
      time: '23:00 - 05:00',
      location: 'Underground, Klaipėda',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join me at these upcoming events and experience the energy firsthand.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="group relative bg-neutral-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                {event.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <button className="w-full py-2 mt-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 rounded-sm">
                Get Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-transparent border border-white hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-sm">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default Events;