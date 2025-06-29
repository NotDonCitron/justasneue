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
    alert('Thanks for reaching out! I will get back to you soon.');
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
          Ready to book me for your event or have a collaboration idea? Let's make some noise together.
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
                <option value="booking">Event Booking</option>
                <option value="collaboration">Music Collaboration</option>
                <option value="remix">Remix Request</option>
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
                placeholder="Tell me about your event, collaboration idea, or any questions you have..."
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
                  <p className="text-gray-400">bookings@justaslange.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-gray-400">+370 XXX XXXXX</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-red-500 mt-1 mr-4" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Based in</h4>
                  <p className="text-gray-400">Vilnius, Lithuania</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 border-b border-neutral-700 pb-4">Follow Me</h3>
            
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

            <div className="mt-8 p-4 bg-red-900/20 rounded-lg border border-red-600/30">
              <h4 className="font-bold text-red-400 mb-2">Booking Info</h4>
              <p className="text-sm text-gray-300">
                Available for club nights, festivals, private events, and collaborations. 
                Professional equipment and lighting setup available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;