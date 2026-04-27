import React, { useState, useRef, useEffect } from "react";
import { TRACKS } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, Music } from "lucide-react";

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total) {
        setProgress((current / total) * 100);
        setDuration(total);
      }
    }
  };

  const handleTrackEnd = () => {
    skipForward();
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full bg-black">
      {/* Session Header / Score Placeholder */}
      <div className="p-6 border-b-2 border-neon-cyan/20 flex flex-col items-center justify-center text-center bg-black/80">
        <div className="text-[10px] text-neon-magenta font-black mb-2 uppercase tracking-[0.4em] glitch-text">SESSION_ANALYTICS</div>
        <div className="text-5xl font-black text-white tabular-nums italic">1.2K_S</div>
        <div className="w-full h-[2px] bg-neon-cyan/20 my-4 shadow-[0_0_10px_cyan]" />
        <div className="text-[9px] text-white/40 uppercase mb-1 tracking-[0.3em]">PEAK_INTEGRITY</div>
        <div className="text-xl font-black text-neon-magenta">00005400</div>
      </div>

      {/* Track List */}
      <div className="flex-1 overflow-hidden flex flex-col p-4">
        <h2 className="text-[10px] text-neon-cyan font-black mb-4 border-b border-neon-cyan/20 pb-2 uppercase tracking-[0.3em]">RAW_AUDIO_STREAM</h2>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {TRACKS.map((track, index) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(index);
                setIsPlaying(true);
              }}
              className={`w-full group text-left transition-all p-3 border-l-4 ${index === currentTrackIndex ? 'border-neon-cyan bg-neon-cyan/10' : 'border-transparent opacity-30 hover:opacity-100 hover:bg-white/5'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white truncate uppercase tracking-widest">{track.title}</span>
                <span className="text-[9px] text-neon-cyan/40 font-mono">#{index}</span>
              </div>
              <div className="text-[8px] text-neon-cyan/40 uppercase mt-1">
                {track.artist} // SYNC_RE_04
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Player Sticky Controls */}
      <div className="p-4 border-t-2 border-neon-cyan/20 bg-black space-y-4">
        <div className="flex justify-between text-[10px] text-white font-black uppercase tracking-widest italic">
          <span className="truncate max-w-[150px] glitch-text">{currentTrack.title}</span>
          <span>{formatTime((progress / 100) * duration)} / {formatTime(duration)}</span>
        </div>
        <div className="h-2 bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_15px_#00f3ff]" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-center gap-8 pt-2">
          <button onClick={skipBackward} className="text-white hover:text-neon-cyan transition-colors">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-white flex items-center justify-center text-black hover:bg-neon-magenta hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
          </button>
          <button onClick={skipForward} className="text-white hover:text-neon-cyan transition-colors">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
}
