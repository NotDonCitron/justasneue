import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, MapPin } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: string;
  color?: string;
}

const Metric: React.FC<MetricProps> = ({ icon, value, label, trend, color = 'text-red-500' }) => (
  <div className="bg-neutral-900/50 rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
    <div className={`${color} mb-3 flex justify-center`}>
      {icon}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-gray-400 text-sm mb-2">{label}</div>
    {trend && (
      <div className="text-xs text-green-400 flex items-center justify-center">
        <TrendingUp size={12} className="mr-1" />
        {trend}
      </div>
    )}
  </div>
);

const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    totalShows: 0,
    totalAttendees: 0,
    cities: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 30);
    };

    animateCounter(75, (value) => setMetrics(prev => ({ ...prev, totalShows: value })));
    animateCounter(15000, (value) => setMetrics(prev => ({ ...prev, totalAttendees: value })));
    animateCounter(12, (value) => setMetrics(prev => ({ ...prev, cities: value })));
    animateCounter(8, (value) => setMetrics(prev => ({ ...prev, upcomingEvents: value })));
  }, []);

  return (
    <div className="py-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Statistiken</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Zahlen, die für sich sprechen - Ein Blick auf meine Reise durch die deutsche Techno-Szene
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Metric
            icon={<Calendar size={32} />}
            value={`${metrics.totalShows}+`}
            label="Live Auftritte"
            trend="+15% dieses Jahr"
            color="text-red-500"
          />
          
          <Metric
            icon={<Users size={32} />}
            value={`${metrics.totalAttendees.toLocaleString()}+`}
            label="Begeisterte Fans"
            trend="+25% Wachstum"
            color="text-blue-500"
          />
          
          <Metric
            icon={<MapPin size={32} />}
            value={`${metrics.cities}+`}
            label="Städte & Venues"
            trend="Deutschlandweit"
            color="text-green-500"
          />
          
          <Metric
            icon={<TrendingUp size={32} />}
            value={`${metrics.upcomingEvents}`}
            label="Kommende Events"
            trend="Nächste 3 Monate"
            color="text-purple-500"
          />
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">4.8/5</div>
            <div className="text-gray-400">Durchschnittliche Bewertung</div>
            <div className="text-sm text-gray-500 mt-1">Basierend auf Venue-Feedback</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">95%</div>
            <div className="text-gray-400">Wiederbuchungsrate</div>
            <div className="text-sm text-gray-500 mt-1">Venues buchen erneut</div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">3.5h</div>
            <div className="text-gray-400">Durchschnittliche Set-Länge</div>
            <div className="text-sm text-gray-500 mt-1">Intensive Techno-Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;