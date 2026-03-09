import { MusicPlayer } from './components/MusicPlayer';
import { SnakeGame } from './components/SnakeGame';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center relative overflow-hidden font-mono">
      {/* Glitch Overlays */}
      <div className="noise-overlay" />
      <div className="scanline" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 border-b border-cyan/20 bg-dark/80 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-magenta animate-pulse shadow-[0_0_10px_#ff00ff]" />
          <h1 className="text-xl font-pixel tracking-tighter text-cyan glitch-text" data-text="SYSTEM_VOID">
            SYSTEM_VOID
          </h1>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-pixel uppercase tracking-widest text-magenta/60">
          <span className="hover:text-cyan cursor-crosshair transition-colors">[ CORE ]</span>
          <span className="hover:text-cyan cursor-crosshair transition-colors">[ AUDIO ]</span>
          <span className="hover:text-cyan cursor-crosshair transition-colors">[ LOGS ]</span>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-4xl flex flex-col items-center pt-20"
      >
        <div className="w-full flex flex-col items-center">
          <SnakeGame />
        </div>
      </motion.main>

      {/* Music Player */}
      <MusicPlayer />

      {/* Decorative Elements */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 items-center opacity-30">
        <div className="h-32 w-[2px] bg-magenta" />
        <span className="writing-vertical-rl text-[10px] uppercase tracking-[0.5em] text-cyan font-pixel">ERR_NULL_PTR</span>
        <div className="h-32 w-[2px] bg-cyan" />
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 items-center opacity-30">
        <div className="h-32 w-[2px] bg-cyan" />
        <span className="writing-vertical-rl text-[10px] uppercase tracking-[0.5em] text-magenta font-pixel">DATA_STREAM</span>
        <div className="h-32 w-[2px] bg-magenta" />
      </div>

      {/* Background Text */}
      <div className="absolute top-1/4 left-10 text-[120px] font-pixel text-white/5 pointer-events-none select-none -z-10 rotate-12">
        010101
      </div>
      <div className="absolute bottom-1/4 right-10 text-[120px] font-pixel text-white/5 pointer-events-none select-none -z-10 -rotate-12">
        VOID
      </div>
    </div>
  );
}
