import { Song } from '../types/request';

// Mock music database - in production, integrate with Spotify/Apple Music APIs
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Techno Anthem',
    artist: 'Underground Artist',
    album: 'Dark Beats',
    duration: 360,
    genre: 'Techno',
    bpm: 128,
    energy: 9,
    artwork: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=300'
  },
  {
    id: '2',
    title: 'Bass Drop Revolution',
    artist: 'Electronic Collective',
    album: 'Future Sounds',
    duration: 420,
    genre: 'Bass House',
    bpm: 126,
    energy: 10,
    artwork: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=300'
  },
  {
    id: '3',
    title: 'Progressive Journey',
    artist: 'Melodic Masters',
    album: 'Emotional Waves',
    duration: 480,
    genre: 'Progressive House',
    bpm: 124,
    energy: 7,
    artwork: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=300'
  },
  {
    id: '4',
    title: 'Deep Underground',
    artist: 'Minimal Techno',
    album: 'Dark Spaces',
    duration: 390,
    genre: 'Minimal Techno',
    bpm: 130,
    energy: 8,
    artwork: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?w=300'
  }
];

class MusicApiService {
  private cache = new Map<string, Song[]>();
  private cacheExpiry = new Map<string, number>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  async searchSongs(query: string): Promise<Song[]> {
    const cacheKey = `search:${query.toLowerCase()}`;
    
    // Check cache first
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock search logic
    const results = mockSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album?.toLowerCase().includes(query.toLowerCase())
    );

    // Add some random songs if query is generic
    if (query.length < 3) {
      results.push(...mockSongs.slice(0, 3));
    }

    // Cache results
    this.cache.set(cacheKey, results);
    this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);

    return results;
  }

  async getSongById(id: string): Promise<Song | null> {
    const cacheKey = `song:${id}`;
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)![0] || null;
    }

    const song = mockSongs.find(s => s.id === id);
    
    if (song) {
      this.cache.set(cacheKey, [song]);
      this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
    }

    return song || null;
  }

  async getPopularSongs(genre?: string): Promise<Song[]> {
    const cacheKey = `popular:${genre || 'all'}`;
    
    if (this.isValidCache(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let results = mockSongs;
    if (genre) {
      results = mockSongs.filter(song => song.genre === genre);
    }

    // Sort by energy (simulating popularity)
    results = results.sort((a, b) => (b.energy || 0) - (a.energy || 0));

    this.cache.set(cacheKey, results);
    this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);

    return results;
  }

  private isValidCache(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  clearCache() {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

export const musicApi = new MusicApiService();