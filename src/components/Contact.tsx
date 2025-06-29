import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
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
    alert('Thanks for reaching out! We will get back to you soon.');
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a question or want to book us for your event? Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none"
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="collaboration">Collaboration</option>
                <option value="press">Press/Media</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-neutral-800 border-0 rounded-sm p-3 text-white form-input focus:ring-0 focus:outline-none resize-none"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-sm transition-colors duration-300 flex items-center justify-center"
            >
              <Send size={18} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
        
        <div className="lg:pl-8">
          <div className="glass-effect p-8 rounded-lg h-full">
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-4">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <Mail className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-gray-400">bookings@gordoszn.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Office</h4>
                  <p className="text-gray-400">123 Music Boulevard, Los Angeles, CA 90001</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-4">Follow Us</h3>
            
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-3 bg-neutral-800 rounded-full hover:bg-red-600 transition-colors duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;