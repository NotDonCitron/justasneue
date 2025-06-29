import React, { useState } from 'react';
import { Heart, MessageCircle, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  caption: string;
  timestamp: number;
  likes: number;
  comments: number;
  mediaType: 'image' | 'video';
  displayUrl: string;
  thumbnailUrl: string;
  locationName?: string;
  pinned: boolean;
}

const InstagramFeed: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [filter, setFilter] = useState<'all' | 'pinned' | 'recent'>('all');

  // Load Instagram data safely with fallback
  let instagramData: any[] = [];
  try {
    const data = require('../data/dataset_instagram-profile-posts-scraper_2025-06-29_21-56-39-977.json');
    instagramData = Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn('Instagram data not available, using fallback data:', error);
    instagramData = [];
  }

  const posts: InstagramPost[] = instagramData.map(post => ({
    id: post.id,
    caption: post.caption,
    timestamp: post.timestamp,
    likes: post.likes,
    comments: post.comments,
    mediaType: post.mediaType as 'image' | 'video',
    displayUrl: post.displayUrl,
    thumbnailUrl: post.thumbnailUrl,
    locationName: post.locationName,
    pinned: post.pinned
  }));

  const filteredPosts = posts.filter(post => {
    if (filter === 'pinned') return post.pinned;
    if (filter === 'recent') return Date.now() / 1000 - post.timestamp < 365 * 24 * 60 * 60; // Last year
    return true;
  }).slice(0, 12);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const truncateCaption = (caption: string, maxLength: number = 100) => {
    if (caption.length <= maxLength) return caption;
    return caption.substring(0, maxLength) + '...';
  };

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Instagram Feed</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Folge meiner Reise durch die Techno-Szene - Live-Auftritte, Studio-Sessions und Behind-the-Scenes Momente.
        </p>
        
        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {[
            { key: 'all', label: 'Alle Posts' },
            { key: 'pinned', label: 'Highlights' },
            { key: 'recent', label: 'Aktuell' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-6 py-2 rounded-sm transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Instagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group relative bg-neutral-900 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-900/20"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={post.thumbnailUrl}
                alt="Instagram Post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Images/364268621_248985811283826_4097087762299984333_n.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <div className="flex items-center">
                      <Heart size={20} className="mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle size={20} className="mr-1" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  {post.mediaType === 'video' && (
                    <div className="text-sm bg-red-600 px-2 py-1 rounded">VIDEO</div>
                  )}
                </div>
              </div>
              {post.pinned && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  HIGHLIGHT
                </div>
              )}
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-300 mb-2">
                {truncateCaption(post.caption)}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(post.timestamp)}</span>
                {post.locationName && (
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    <span className="truncate max-w-20">{post.locationName}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal for selected post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-neutral-900 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedPost.displayUrl}
                  alt="Instagram Post"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = selectedPost.thumbnailUrl;
                  }}
                />
              </div>
              
              <div className="p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">@justaslange</h3>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto mb-4">
                  <p className="text-gray-300 whitespace-pre-line">
                    {selectedPost.caption}
                  </p>
                </div>
                
                <div className="border-t border-neutral-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-red-500">
                        <Heart size={20} className="mr-1" />
                        <span>{selectedPost.likes}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MessageCircle size={20} className="mr-1" />
                        <span>{selectedPost.comments}</span>
                      </div>
                    </div>
                    <a
                      href={`https://instagram.com/p/${selectedPost.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-red-500 hover:text-red-400"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Instagram
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{formatDate(selectedPost.timestamp)}</span>
                    </div>
                    {selectedPost.locationName && (
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{selectedPost.locationName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-12">
        <a
          href="https://instagram.com/justaslange"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-sm transition-all duration-300 transform hover:-translate-y-1"
        >
          <ExternalLink size={20} className="mr-2" />
          Folge @justaslange auf Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramFeed;