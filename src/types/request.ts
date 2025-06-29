export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;
  genre?: string;
  bpm?: number;
  energy?: number; // 1-10 scale
  spotifyId?: string;
  youtubeId?: string;
  artwork?: string;
}

export interface SongRequest {
  id: string;
  song: Song;
  requestedBy: string;
  requestedAt: Date;
  dedication?: string;
  status: 'pending' | 'approved' | 'rejected' | 'played';
  priority: number; // 1-10, higher = more priority
  eventId: string;
  userIp?: string;
  moodRating?: number; // 1-5 dance floor mood
}

export interface User {
  id: string;
  name: string;
  lastRequestTime?: Date;
  requestCount: number;
  isBlocked: boolean;
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  venue: string;
  isActive: boolean;
  djId: string;
  settings: EventSettings;
}

export interface EventSettings {
  maxRequestsPerUser: number;
  timeBetweenRequests: number; // minutes
  allowDedications: boolean;
  requireMoodRating: boolean;
  autoApprove: boolean;
  profanityFilter: boolean;
}

export interface QueueItem extends SongRequest {
  estimatedPlayTime?: Date;
  position: number;
}

export interface Analytics {
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  mostRequestedSongs: Array<{ song: Song; count: number }>;
  peakRequestTimes: Array<{ hour: number; count: number }>;
  averageMoodRating: number;
  topGenres: Array<{ genre: string; count: number }>;
}