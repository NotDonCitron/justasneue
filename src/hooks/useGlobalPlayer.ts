import { useState, useCallback, useRef, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  poster?: string;
  duration?: number;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  queue: Track[];
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  currentIndex: -1,
  isShuffled: false,
  repeatMode: 'none'
};

// Global state
let globalState = initialState;
const listeners = new Set<() => void>();

// Notify all listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Update global state
const updateState = (updates: Partial<PlayerState>) => {
  globalState = { ...globalState, ...updates };
  notifyListeners();
};

export const useGlobalPlayer = () => {
  const [state, setState] = useState(globalState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Subscribe to global state changes
  useEffect(() => {
    const listener = () => setState({ ...globalState });
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      const audio = audioRef.current;
      
      audio.addEventListener('timeupdate', () => {
        updateState({ currentTime: audio.currentTime });
      });
      
      audio.addEventListener('loadedmetadata', () => {
        updateState({ duration: audio.duration });
      });
      
      audio.addEventListener('ended', () => {
        updateState({ isPlaying: false });
        // Auto-play next track
        next();
      });
      
      audio.addEventListener('play', () => {
        updateState({ isPlaying: true });
      });
      
      audio.addEventListener('pause', () => {
        updateState({ isPlaying: false });
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playTrack = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (track.id !== state.currentTrack?.id) {
      audio.src = track.src;
      updateState({ currentTrack: track });
    }
    
    audio.play().then(() => {
      updateState({ isPlaying: true });
    }).catch(error => {
      console.error('Failed to play track:', error);
    });
  }, [state.currentTrack?.id]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      updateState({ isPlaying: false });
    }
  }, []);

  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        updateState({ isPlaying: true });
      }).catch(error => {
        console.error('Failed to resume track:', error);
      });
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      updateState({ volume, isMuted: volume === 0 });
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      const newMuted = !state.isMuted;
      audio.muted = newMuted;
      updateState({ isMuted: newMuted });
    }
  }, [state.isMuted]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      updateState({ currentTime: time });
    }
  }, []);

  const setQueue = useCallback((tracks: Track[], startIndex = 0) => {
    updateState({ 
      queue: tracks, 
      currentIndex: startIndex,
      currentTrack: tracks[startIndex] || null 
    });
    
    if (tracks[startIndex]) {
      playTrack(tracks[startIndex]);
    }
  }, [playTrack]);

  const next = useCallback(() => {
    const { queue, currentIndex, repeatMode, isShuffled } = state;
    
    if (queue.length === 0) return;
    
    let nextIndex = currentIndex;
    
    if (repeatMode === 'one') {
      // Repeat current track
      if (state.currentTrack) {
        playTrack(state.currentTrack);
      }
      return;
    }
    
    if (isShuffled) {
      // Random next track
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      // Sequential next
      nextIndex = currentIndex + 1;
      
      if (nextIndex >= queue.length) {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          return; // End of queue
        }
      }
    }
    
    updateState({ currentIndex: nextIndex });
    playTrack(queue[nextIndex]);
  }, [state, playTrack]);

  const previous = useCallback(() => {
    const { queue, currentIndex } = state;
    
    if (queue.length === 0) return;
    
    let prevIndex = currentIndex - 1;
    
    if (prevIndex < 0) {
      prevIndex = queue.length - 1;
    }
    
    updateState({ currentIndex: prevIndex });
    playTrack(queue[prevIndex]);
  }, [state, playTrack]);

  const toggleShuffle = useCallback(() => {
    updateState({ isShuffled: !state.isShuffled });
  }, [state.isShuffled]);

  const toggleRepeat = useCallback(() => {
    const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all'];
    const currentModeIndex = modes.indexOf(state.repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    updateState({ repeatMode: nextMode });
  }, [state.repeatMode]);

  return {
    ...state,
    playTrack,
    pause,
    resume,
    setVolume,
    toggleMute,
    seek,
    setQueue,
    next,
    previous,
    toggleShuffle,
    toggleRepeat,
    audioRef
  };
};
