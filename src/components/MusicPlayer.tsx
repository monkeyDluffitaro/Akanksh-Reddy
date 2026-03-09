import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { DUMMY_TRACKS, Track } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
    }
  }, [currentTrackIndex, currentTrack.url]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const p = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, [handleNext]);

  return (
    <div className="bg-dark/95 backdrop-blur-md border-t-4 border-magenta p-4 flex items-center justify-between w-full fixed bottom-0 left-0 z-50 font-mono">
      <audio ref={audioRef} />
      
      <div className="flex items-center gap-4 w-1/3">
        <img 
          src={currentTrack.cover} 
          alt={currentTrack.title} 
          className="w-12 h-12 rounded-none border-2 border-cyan object-cover magenta-glow"
          referrerPolicy="no-referrer"
        />
        <div className="overflow-hidden">
          <h3 className="text-cyan font-pixel text-[10px] truncate glitch-text" data-text={currentTrack.title}>{currentTrack.title}</h3>
          <p className="text-magenta/60 text-[8px] font-pixel truncate">{'>>_'}{currentTrack.artist}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-1/3">
        <div className="flex items-center gap-6">
          <button onClick={handlePrev} className="text-cyan hover:text-magenta transition-colors">
            <SkipBack size={18} />
          </button>
          <button 
            onClick={togglePlay} 
            className="w-10 h-10 bg-cyan flex items-center justify-center text-dark hover:bg-magenta transition-colors shadow-[4px_4px_0_#ff00ff]"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
          <button onClick={handleNext} className="text-cyan hover:text-magenta transition-colors">
            <SkipForward size={18} />
          </button>
        </div>
        <div className="w-full max-w-md h-2 bg-gray-dark border border-cyan/30 overflow-hidden">
          <div 
            className="h-full bg-magenta transition-all duration-100" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-1/3 text-cyan">
        <Volume2 size={16} />
        <div className="w-24 h-2 bg-gray-dark border border-cyan/30">
          <div className="w-2/3 h-full bg-cyan/50" />
        </div>
      </div>
    </div>
  );
};
