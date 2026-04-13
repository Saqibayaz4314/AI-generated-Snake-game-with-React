import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, TerminalSquare } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: 'SECTOR_1_AMBIENCE',
    artist: 'AI.GEN_01',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '6:12'
  },
  {
    id: 2,
    title: 'CORE_DUMP_BEATS',
    artist: 'AI.GEN_02',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '7:05'
  },
  {
    id: 3,
    title: 'NULL_POINTER_GROOVE',
    artist: 'AI.GEN_03',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:44'
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => {
        console.error("Audio playback failed", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="bg-black border-2 border-cyan-400 p-6 h-full flex flex-col relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <TerminalSquare className="w-6 h-6 text-fuchsia-500" />
        <h2 className="text-xl font-bold text-fuchsia-500 tracking-widest uppercase glitch-text" data-text="AUDIO.SUBSYSTEM">AUDIO.SUBSYSTEM</h2>
      </div>

      <div className="mb-8 border-l-4 border-cyan-400 pl-4">
        <div className="text-cyan-400 font-bold text-2xl truncate mb-1 uppercase">
          {currentTrack.title}
        </div>
        <div className="text-fuchsia-500 text-sm truncate uppercase tracking-wider">
          AUTHORITY: {currentTrack.artist}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-neutral-900 mb-8 overflow-hidden border border-cyan-400/30">
        <div 
          className="h-full bg-fuchsia-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <button 
          onClick={prevTrack}
          className="p-2 text-cyan-400 hover:text-fuchsia-500 hover:bg-cyan-900/20 transition-all border border-transparent hover:border-cyan-400"
        >
          <SkipBack className="w-7 h-7" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="p-4 bg-black border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-black transition-all"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        
        <button 
          onClick={nextTrack}
          className="p-2 text-cyan-400 hover:text-fuchsia-500 hover:bg-cyan-900/20 transition-all border border-transparent hover:border-cyan-400"
        >
          <SkipForward className="w-7 h-7" />
        </button>
      </div>

      {/* Track List */}
      <div className="mt-auto space-y-2">
        <div className="text-sm text-fuchsia-500 font-bold uppercase tracking-widest mb-4 border-b border-fuchsia-500/30 pb-2">TRACK_INDEX</div>
        {TRACKS.map((track, idx) => (
          <div 
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(idx);
              setIsPlaying(true);
            }}
            className={`flex justify-between items-center p-3 cursor-pointer transition-colors border-l-2 ${
              idx === currentTrackIndex 
                ? 'bg-cyan-900/30 border-cyan-400 text-cyan-400' 
                : 'border-transparent hover:bg-neutral-900 text-cyan-700'
            }`}
          >
            <div className="flex items-center gap-3 truncate">
              <span className="text-xs opacity-70 w-4 font-bold">0{idx + 1}</span>
              <span className="truncate text-sm font-bold tracking-wide">{track.title}</span>
            </div>
            <span className="text-xs opacity-70 font-mono">{track.duration}</span>
          </div>
        ))}
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
