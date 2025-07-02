import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log(formData);
    alert(t('contact.thankYou'));
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
                placeholder={t('contact.namePlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">{t('contact.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
                placeholder={t('contact.emailPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">{t('contact.subject')}</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
              >
                <option value="">{t('contact.selectSubject')}</option>
                <option value="booking">{t('contact.subjectBooking')}</option>
                <option value="collaboration">{t('contact.subjectCollaboration')}</option>
                <option value="remix">{t('contact.subjectRemix')}</option>
                <option value="press">{t('contact.subjectPress')}</option>
                <option value="other">{t('contact.subjectOther')}</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none resize-none"
                placeholder={t('contact.messagePlaceholder')}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm transition-colors duration-300 flex items-center justify-center"
            >
              <Send size={18} className="mr-2" />
              {t('contact.sendMessage')}
            </button>
          </form>
        </div>
        
        <div className="lg:pl-8">
          <div className="glass-effect p-8 rounded-lg h-full">
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-4">{t('contact.infoTitle')}</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <Mail className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">{t('contact.infoEmail')}</h4>
                  <p className="text-gray-400">bookings@justaslange.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">{t('contact.infoBased')}</h4>
                  <p className="text-gray-400">Mannheim</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-4">{t('contact.followMe')}</h3>
            
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://soundcloud.com/justas-lange" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-800 rounded-full hover:bg-orange-500 transition-colors duration-300">
                <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
                  <path d="M25.6 18.667c-0.267 0-0.533 0.027-0.8 0.08-0.267-2.987-2.88-5.28-5.867-5.28-0.56 0-1.12 0.080-1.653 0.24-0.267 0.080-0.427 0.347-0.347 0.613 0.080 0.267 0.347 0.427 0.613 0.347 0.453-0.133 0.933-0.2 1.387-0.2 2.56 0 4.693 2.027 4.8 4.587 0.013 0.293 0.24 0.52 0.533 0.52h1.333c0.733 0 1.333 0.6 1.333 1.333s-0.6 1.333-1.333 1.333h-13.867c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-7.467c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v7.467c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-5.867c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v5.867c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-4.267c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v4.267c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h0.267c0.293 0 0.533-0.24 0.533-0.533v-2.667c0-0.293-0.24-0.533-0.533-0.533h-0.267c-0.733 0-1.333 0.6-1.333 1.333v2.667c0 0.293-0.24 0.533-0.533 0.533h-0.267c-0.733 0-1.333-0.6-1.333-1.333s0.6-1.333 1.333-1.333h17.067c0.733 0 1.333 0.6 1.333 1.333s-0.6 1.333-1.333 1.333z"/>
                </svg>
              </a>
            </div>

            <div className="mt-8 p-4 bg-red-900/20 rounded-lg border border-red-600/30">
              <h4 className="font-bold text-red-400 mb-2">{t('contact.bookingInfoTitle')}</h4>
              <p className="text-sm text-gray-300">
                {t('contact.bookingInfoText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;