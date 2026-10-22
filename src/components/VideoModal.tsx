import React, { useState, useEffect } from 'react';
import { VideoTape } from '../types';

interface VideoModalProps {
  video: VideoTape | null;
  onClose: () => void;
  onOpenDoc: (docName: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onOpenDoc }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(14);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '0.5x' | '2x'>('1x');

  useEffect(() => {
    if (!video || !isPlaying) return;
    const interval = setInterval(() => {
      setSeconds(prev => (prev >= 240 ? 0 : prev + 1));
    }, playbackSpeed === '1x' ? 1000 : playbackSpeed === '0.5x' ? 2000 : 500);
    return () => clearInterval(interval);
  }, [video, isPlaying, playbackSpeed]);

  if (!video) return null;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#1a1c1f] border-2 border-[#333538] rounded shadow-2xl overflow-hidden flex flex-col">
        {/* CCTV Telemetry Top Header */}
        <div className="bg-[#1e2023] px-4 py-2.5 border-b border-[#333538] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2 py-0.5 bg-[#690005] text-[#ffdad6] font-label-sm text-label-sm uppercase font-bold rounded">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              {video.camId} // {video.camLocation}
            </span>
            <span className="hidden sm:inline font-label-sm text-label-sm text-[#fabc4d] font-mono">
              [TELEMETRY SYNC: 60 FPS]
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#111316] hover:bg-[#333538] text-[#e2e2e6] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close video player"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-[#0c0e11] overflow-hidden group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-all duration-300 ${isPlaying ? 'brightness-90 contrast-105' : 'brightness-60'}`}
          />

          {/* CCTV HUD Scanline Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40"></div>

          {/* CCTV Top Left Stamp */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 font-label-sm text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-sm p-2 rounded border border-white/10 pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LIVE FEED: {video.camId}</span>
            </div>
            <div>STATUS: {isPlaying ? 'ACTIVE WITNESS RUN' : 'PAUSED'}</div>
            <div className="text-[#fabc4d]">MODEL: {video.modelRef}</div>
          </div>

          {/* CCTV Top Right Thermal Telemetry */}
          <div className="absolute top-4 right-4 z-10 font-label-sm text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-sm p-2 rounded border border-white/10 text-right pointer-events-none">
            <div>LOAD RATING: <span className="text-[#ff6a1a] font-bold">{video.proofRating}</span></div>
            <div>BURDEN TEMP: <span className="text-[#fabc4d]">{video.operatingTemp || '750°C'}</span></div>
            <div className="text-gray-400">FPS: 59.94 // BITRATE: 24Mbps</div>
          </div>

          {/* Central Play/Pause Toggle button */}
          <div 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-[#ff6a1a]/90 text-[#591e00] flex items-center justify-center shadow-[0_0_30px_rgba(255,106,26,0.6)]">
                <span className="material-symbols-outlined text-[48px] ml-1">play_arrow</span>
              </div>
            )}
          </div>

          {/* Bottom HUD Bar & Controls */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col gap-2">
            {/* Progress bar */}
            <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="bg-[#ff6a1a] h-full transition-all duration-300"
                style={{ width: `${(seconds / 240) * 100}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-white font-label-sm text-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#ff6a1a] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button 
                  onClick={() => setSeconds(Math.max(0, seconds - 10))}
                  className="hover:text-[#ff6a1a] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">replay_10</span>
                </button>
                <span className="font-mono text-xs">
                  {formatTime(seconds)} / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono hidden sm:inline">SPEED:</span>
                {(['0.5x', '1x', '2x'] as const).map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-0.5 rounded text-xs font-mono cursor-pointer ${
                      playbackSpeed === speed
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold'
                        : 'bg-black/40 text-gray-300 hover:text-white'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Notes & Action Bar */}
        <div className="p-4 bg-[#1e2023] space-y-3">
          <div>
            <h3 className="font-headline-sm text-headline-sm uppercase text-[#e2e2e6] tracking-wide">
              {video.title}
            </h3>
            <p className="font-body-sm text-body-sm text-[#e2bfb2] pt-1">
              {video.description}
            </p>
          </div>

          {video.observation && (
            <div className="p-2.5 bg-[#111316] border-l-2 border-[#ff6a1a] rounded text-body-sm text-[#e2bfb2]">
              <span className="font-label-sm text-[11px] text-[#ff6a1a] uppercase font-bold block mb-0.5">
                ENGINEERING LOG:
              </span>
              {video.observation}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#333538]">
            <div className="flex items-center gap-2 font-label-sm text-xs text-[#9299a7]">
              <span className="material-symbols-outlined text-[#fabc4d] text-[18px]">verified</span>
              <span>WITNESS SITE: {video.site || 'Tier-1 Steel Works'}</span>
            </div>
            <button
              onClick={() => onOpenDoc(`Witness Test Report - ${video.modelRef} (PDF)`)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm text-sm uppercase tracking-wider rounded transition-all font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Download Witness Cert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
