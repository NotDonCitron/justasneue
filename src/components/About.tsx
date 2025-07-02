import React from 'react';
import LazyImage from './LazyImage';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 animate-slideInLeft">
          <div 
            className="relative overflow-hidden rounded-lg smooth-hover"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/40 to-transparent z-10"></div>
            <LazyImage 
              src="/images/image00001(2).jpeg"
              alt="Justas Lange - Professional DJ Portrait" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>
          </div>
        </div>
        
        <div className="order-1 lg:order-2 animate-slideInRight">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative animate-fadeIn">
            <span className="relative z-10">{t('about.title')}</span>
            <span className="absolute -left-4 top-0 w-12 h-12 bg-red-600/20 rounded-full blur-xl -z-0"></span>
          </h2>
          
          <div className="space-y-6 text-gray-300">
            <p className="leading-relaxed animate-fadeIn delay-100">
              {t('about.p1')}
            </p>
            
            <p className="leading-relaxed animate-fadeIn delay-200">
              {t('about.p2')}
            </p>
            
            <p className="leading-relaxed animate-fadeIn delay-300">
              {t('about.p3')}
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-6 text-center animate-scaleIn delay-400">
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">50+</p>
              <p className="text-sm uppercase tracking-wider mt-2">{t('about.stats.shows')}</p>
            </div>
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">15+</p>
              <p className="text-sm uppercase tracking-wider mt-2">{t('about.stats.venues')}</p>
            </div>
            <div className="smooth-hover">
              <p className="text-4xl font-bold text-red-500">3+</p>
              <p className="text-sm uppercase tracking-wider mt-2">{t('about.stats.years')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;