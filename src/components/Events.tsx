import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import LazyImage from './LazyImage';
import { useTranslation } from 'react-i18next';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  status: 'upcoming' | 'past';
  description?: string;
  likes?: number;
  comments?: number;
  isFromInstagram?: boolean;
}

const Events: React.FC = () => {
  const { t } = useTranslation();
  const [instagramData, setInstagramData] = useState<any[]>([]);

  // Load Instagram data safely with dynamic import
  useEffect(() => {
    const loadInstagramData = async () => {
      try {
        const { default: data } = await import('../data/dataset_instagram-profile-posts-scraper_2025-06-29_21-56-39-977.json');
        setInstagramData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.warn('Instagram data not available, using fallback data:', error);
        setInstagramData([]);
      }
    };
    
    loadInstagramData();
  }, []);

  // Events aus Instagram-Daten extrahieren
  const instagramEvents: Event[] = instagramData
    .filter(post => 
      post.locationName && 
      (post.locationName.toLowerCase().includes('club') ||
       post.locationName.toLowerCase().includes('basement') ||
       post.locationName.toLowerCase().includes('connexion') ||
       post.locationName.toLowerCase().includes('zimmer') ||
       post.locationName.toLowerCase().includes('bar'))
    )
    .slice(0, 8)
    .map((post, index) => {
      const eventDate = new Date(post.timestamp * 1000);
      const isUpcoming = eventDate > new Date();
      
      // Use local fallback images instead of Instagram URLs to avoid CORS issues
      const localImages = [
        '/images/image00003(1).jpeg',
        '/images/image00001(2).jpeg',
        '/images/image00002(1).jpeg',
        '/images/image00001.jpeg',
        '/images/image00002.jpeg',
        '/images/image00003.jpeg',
        '/images/image00004.jpeg',
        '/images/image00005.jpeg'
      ];
      
      return {
        id: post.id,
        title: post.caption.split('\n')[0] || `Event @ ${post.locationName}`,
        date: eventDate.toLocaleDateString('de-DE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        time: eventDate.toLocaleTimeString('de-DE', {
          hour: '2-digit',
          minute: '2-digit'
        }) + ' - Late',
        location: post.locationName || 'Location TBA',
        image: localImages[index % localImages.length], // Use local images instead of post.displayUrl
        status: isUpcoming ? 'upcoming' : 'past',
        description: post.caption,
        likes: post.likes,
        comments: post.comments,
        isFromInstagram: true
      };
    });

  // Manuelle Events hinzufügen
  const manualEvents: Event[] = [
    {
      id: 'manual-1',
      title: 'Techno Underground Session',
      date: '15. Juli 2025',
      time: '22:00 - 06:00',
      location: 'MS Connexion Complex, Mannheim',
      image: '/images/image00003(1).jpeg',
      status: 'upcoming',
      description: 'Eine Nacht voller harter Techno-Beats und Underground-Vibes'
    },
    {
      id: 'manual-2',
      title: 'Bass & House Festival',
      date: '22. August 2025',
      time: '18:00 - 04:00',
      location: 'Open Air Stage, Mannheim',
      image: '/images/image00001(2).jpeg',
      status: 'upcoming',
      description: 'Festival-Atmosphäre mit den besten Bass und House Tracks'
    },
    {
      id: 'manual-3',
      title: 'Studio Sessions Live',
      date: '05. September 2025',
      time: '20:00 - 02:00',
      location: 'Private Studio, Mannheim',
      image: '/images/image00002(1).jpeg',
      status: 'upcoming',
      description: 'Exklusive Studio-Session mit Live-Performance'
    }
  ];

  const allEvents = [...manualEvents, ...instagramEvents];
  const upcomingEvents = allEvents.filter(event => event.status === 'upcoming').slice(0, 6);
  const pastEvents = allEvents.filter(event => event.status === 'past').slice(0, 8);

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('events.title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('events.subtitle')}
        </p>
      </div>
      
      {/* Upcoming Events */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold mb-8 text-red-500">{t('events.upcoming')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="group relative bg-neutral-900 rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
            >
              <div className="relative h-48 overflow-hidden">
                <LazyImage 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => {
                    // Fallback handled internally by LazyImage component
                  }}
                  context="event"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                {event.isFromInstagram && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded">
                    {t('events.live')}
                  </div>
                )}
              </div>
              
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {truncateText(event.title, 50)}
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

                {event.description && (
                  <p className="text-sm text-gray-300 mb-4">
                    {truncateText(event.description, 80)}
                  </p>
                )}

                {event.isFromInstagram && event.likes && (
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Heart size={14} className="mr-1 text-red-500" />
                      <span>{event.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      <span>{event.comments}</span>
                    </div>
                  </div>
                )}
                
                <button className="w-full py-2 mt-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 rounded-sm">
                  {event.isFromInstagram ? t('events.viewOnInstagram') : t('events.buyTickets')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div>
        <h3 className="text-2xl font-bold mb-8 text-gray-400">{t('events.past')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.map((event) => (
            <div 
              key={event.id} 
              className="group relative bg-neutral-900/50 rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-all duration-300"
            >
              <div className="relative h-32 overflow-hidden">
                <LazyImage 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    // Fallback handled internally by LazyImage component
                  }}
                  context="event"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                {event.isFromInstagram && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-1 py-0.5 rounded">
                    IG
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">{truncateText(event.title, 40)}</h4>
                <p className="text-sm text-gray-400">{event.date}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
                {event.isFromInstagram && event.likes && (
                  <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Heart size={12} className="mr-1" />
                      <span>{event.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={12} className="mr-1" />
                      <span>{event.comments}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-transparent border border-white hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded-sm">
            {t('events.showAll')}
          </button>
          <a
            href="https://instagram.com/justaslange"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 rounded-sm"
          >
            <ExternalLink size={16} className="mr-2" />
            {t('events.followForUpdates')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Events;