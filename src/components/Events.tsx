import React from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: 'upcoming' | 'past';
}

const Events: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Bass Underground',
      date: 'April 15, 2024',
      time: '22:00 - 04:00',
      location: 'Club Basement, Vilnius',
      image: '/Images/WhatsApp Image 2025-05-10 at 15.09.09 copy.jpeg',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'House Sessions',
      date: 'April 22, 2024',
      time: '20:00 - 02:00',
      location: 'Rooftop Lounge, Kaunas',
      image: '/Images/WhatsApp Image 2025-05-10 at 15.10.27 copy.jpeg',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Electronic Fusion Festival',
      date: 'May 5, 2024',
      time: '18:00 - 06:00',
      location: 'Open Air Stage, Klaipėda',
      image: '/Images/364268621_248985811283826_4097087762299984333_n.jpg',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Winter Bass Drop',
      date: 'February 14, 2024',
      time: '23:00 - 05:00',
      location: 'Underground Club, Vilnius',
      image: '/Images/header 2.jpeg',
      status: 'past'
    }
  ];

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Events & Shows</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join me at these upcoming events and experience the energy firsthand.
        </p>
      </div>
      
      {/* Upcoming Events */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-red-500">Upcoming Shows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
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
      </div>

      {/* Past Events */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-gray-400">Past Performances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.map((event) => (
            <div 
              key={event.id} 
              className="group relative bg-neutral-900/50 rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">{event.title}</h4>
                <p className="text-sm text-gray-400">{event.date}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
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