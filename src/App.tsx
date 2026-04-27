import React from "react";
import SnakeGame from "./components/SnakeGame";
import MusicPlayer from "./components/MusicPlayer";
import { motion } from "motion/react";
import { Zap, Shield, Cpu, Activity } from "lucide-react";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center p-0 md:p-6 overflow-hidden">
      {/* Glitch Overlays */}
      <div className="absolute inset-0 pointer-events-none z-50 crt-overlay opacity-50" />
      <div className="absolute inset-0 pointer-events-none z-50 static-noise" />
      <div className="scanline" />
      
      {/* Main Interface Container */}
      <div className="w-full max-w-[1200px] h-screen md:h-[850px] bg-dark-bg border-4 border-neon-cyan/40 relative flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.2)] screen-tear">
        
        {/* TOP BAR: MACHINE TERMINAL */}
        <header className="h-14 flex items-center justify-between px-6 border-b-2 border-neon-cyan/40 bg-black shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-neon-magenta shadow-[0_0_10px_#ff00ff] animate-pulse" />
            <h1 className="text-xl font-black italic tracking-[-0.1em] text-white uppercase glitch-text">
              VOID_RUNNER_666_
            </h1>
          </div>
          <div className="hidden lg:flex gap-8 text-[9px] uppercase tracking-[0.3em] font-bold text-neon-cyan/40">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-neon-cyan" />
              <span>SIG_LOAD: OVERRUN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-neon-magenta" />
              <span>NEURAL_HANDSHAKE: OK</span>
            </div>
            <span className="text-white bg-glitch-red px-1">ERR_COUNT: NULL</span>
          </div>
        </header>

        {/* WORKSPACE DIVIDER */}
        <main className="flex-1 flex flex-col md:flex-row gap-0 overflow-hidden relative">
          
          {/* LEFT: CRYPTIC READOUTS */}
          <aside className="w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-neon-cyan/20 flex flex-col bg-black/40 shrink-0">
            <div className="p-4 flex-1 flex flex-col overflow-hidden">
              <div className="text-[10px] text-neon-magenta font-black mb-6 uppercase tracking-[0.4em] border-b border-neon-magenta/30 pb-2">
                CORE_METRICS
              </div>
              <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
                <Metric icon={<Cpu size={14} />} label="N_ENGINE" value="RECURSION" color="magenta" />
                <Metric icon={<Zap size={14} />} label="CELL_ST_V" value="V_EXTREME" color="magenta" />
                <Metric icon={<Shield size={14} />} label="ENCRYPT" value="NO_LOCK" color="cyan" />
                
                <div className="pt-6 border-t border-neon-cyan/10">
                  <div className="text-[9px] text-neon-cyan/40 font-black mb-4 uppercase tracking-[0.4em]">RAW_DATA_STREAM</div>
                  <div className="space-y-3">
                    <LogEntry time="000" text="SYS_BOOT_INIT" />
                    <LogEntry time="101" text="MEM_LEAK_DET" />
                    <LogEntry time="202" text="SNAKE_PROC_ON" />
                    <LogEntry time="303" text="VOID_SYNC_OK" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* AUDIO SPECTRUM */}
            <div className="h-32 border-t-2 border-neon-magenta/20 bg-black p-4 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-20"><Activity size={10} /></div>
              <div className="text-[9px] text-neon-magenta font-black mb-3 uppercase tracking-[0.3em]">SYNTH_WAVE_O</div>
              <div className="flex items-end gap-[2px] h-14">
                {[8, 12, 15, 7, 20, 5, 18, 4, 14, 6, 16, 9, 13, 10, 19, 3, 11, 8, 14, 5].map((h, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-neon-magenta"
                    animate={{ height: [h-2, h+5, h-2], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.3 + (i % 3) * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* CENTER: THE GRID */}
          <section className="flex-1 bg-black flex flex-col items-center justify-center p-4 relative group">
            <div className="absolute inset-0 bg-[#ff00ff]/[0.02] animate-pulse pointer-events-none" />
            
            {/* GRID DECORATION */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-neon-magenta" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-neon-magenta" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-neon-magenta" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-neon-magenta" />

            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center border-4 border-neon-cyan bg-black z-10 shadow-[0_0_30px_rgba(0,243,255,0.3)]">
              <SnakeGame />
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-6 w-full max-w-[480px]">
              <FeatureCard 
                title="S-01" 
                desc="VELOCITY_BYPASS_ENABLED" 
                icon={<Activity className="text-neon-cyan" />} 
              />
              <FeatureCard 
                title="A-02" 
                desc="REACTIVE_SONICS_ACTIVE" 
                icon={<Music className="text-neon-magenta" />} 
              />
            </div>
          </section>

          {/* RIGHT: SONIC INTERFACE */}
          <aside className="w-full md:w-80 border-t-2 md:border-t-0 md:border-l-2 border-neon-cyan/20 flex flex-col bg-black">
             <MusicPlayer />
          </aside>

        </main>

        {/* BOTTOM DECOR: SERIAL DATA */}
        <footer className="h-6 bg-neon-cyan text-black text-[8px] font-black flex items-center px-4 gap-12 overflow-hidden shrink-0">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            SYSTEM_PROTOCOL: 0x0FEA92 // DATA_STREAM: BUSY // NEURAL_NET_ACTIVE // USER_IDENTIFIED: HUMAN_ANOMALY // GRID_RESOLUTION: PIXEL_PERFECT // GLITCH_DETECTION: IGNORED
          </div>
        </footer>
      </div>
    </div>
  );
}

function Music({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function Metric({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: 'cyan' | 'yellow' | 'green' | 'magenta' }) {
  const colorMap = {
    cyan: 'text-neon-cyan',
    yellow: 'text-neon-yellow',
    green: 'text-neon-green',
    magenta: 'text-neon-magenta'
  };
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center space-x-3">
        <div className={`opacity-40 group-hover:opacity-100 transition-opacity ${colorMap[color]}`}>
          {icon}
        </div>
        <span className="text-[10px] font-mono text-white/40">{label}</span>
      </div>
      <span className={`text-[10px] font-mono font-bold ${colorMap[color]}`}>{value}</span>
    </div>
  );
}

function LogEntry({ time, text }: { time: string, text: string }) {
  return (
    <div className="flex space-x-3 text-[10px] font-mono group">
      <span className="text-white/20">{time}</span>
      <span className="text-white/40 truncate group-hover:text-white/70 transition-colors">{text}</span>
    </div>
  );
}

function FeatureCard({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-4 group hover:bg-white/10 transition-all cursor-crosshair">
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-black/40 border border-white/5 group-hover:border-white/20 transition-all">
          {icon}
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-neon-cyan transition-colors" />
      </div>
      <h5 className="text-xs font-bold font-mono tracking-widest">{title}</h5>
      <p className="text-[10px] text-white/30 truncate">{desc}</p>
    </div>
  );
}
