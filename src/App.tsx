import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal } from 'lucide-react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="static-noise"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-20"
           style={{
             background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4))',
             backgroundSize: '100% 4px'
           }}>
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col gap-8">
        {/* Header */}
        <header className="flex justify-between items-center border-b-4 border-fuchsia-500 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-900/30 border-2 border-cyan-400">
              <Terminal className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-widest text-cyan-400 glitch-text" data-text="SYS.SNAKE_PROTOCOL">
              SYS.SNAKE_PROTOCOL
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-fuchsia-500 tracking-widest mb-1">DATA_YIELD</span>
            <div className="text-5xl font-bold text-cyan-400 glitch-text" data-text={score.toString().padStart(4, '0')}>
              {score.toString().padStart(4, '0')}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">
          {/* Game Window */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative p-1 bg-fuchsia-500">
              <div className="bg-black p-4 h-full flex items-center justify-center border-2 border-cyan-400">
                <SnakeGame onScoreChange={setScore} />
              </div>
            </div>
          </div>

          {/* Music Player Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <MusicPlayer />
          </div>
        </div>
      </div>
    </div>
  );
}
