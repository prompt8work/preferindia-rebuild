import React, { useState } from 'react';
import { ViewMode, VideoTape } from '../types';
import { VIDEO_ARCHIVE } from '../data/equipmentData';

interface VideosViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenVideo: (video: VideoTape) => void;
  onOpenQuote: (productName?: string) => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const VideosView: React.FC<VideosViewProps> = ({
  onNavigate,
  onOpenVideo,
  onOpenQuote,
  onAddToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterCategories = [
    { id: 'ALL', label: 'ALL TAPES (7)' },
    { id: 'Coil Handling', label: 'COIL HANDLING (2)' },
    { id: 'Slab Tongs', label: 'SLAB & BILLET TONGS (2)' },
    { id: 'Transfer Cars', label: 'TRANSFER CARS (1)' },
    { id: 'C-Hooks', label: 'C-HOOKS & CLAMPS (1)' },
    { id: 'Proof Testing', label: 'FACTORY 150% PROOF TESTS (1)' },
  ];

  const filteredVideos = VIDEO_ARCHIVE.filter(video => {
    if (selectedFilter === 'ALL') return true;
    return video.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const masterTape = VIDEO_ARCHIVE[0];

  return (
    <div className="flex flex-col w-full">
      {/* Top Telemetry Ribbon & Breadcrumbs */}
      <section className="w-full bg-[#0c0e11] border-b border-[#333538] px-4 md:px-8 lg:px-12 py-2">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[#e2bfb2] font-label-sm text-xs">
          <div className="flex items-center gap-2 uppercase tracking-wider font-mono">
            <button onClick={() => onNavigate('home')} className="hover:text-[#ff6a1a] transition-colors cursor-pointer">
              HOME
            </button>
            <span className="text-[#5a4137]">/</span>
            <span className="text-[#c0c7d5]">MEDIA ROOM</span>
            <span className="text-[#5a4137]">/</span>
            <span className="text-[#ff6a1a] font-semibold">COMMISSIONING &amp; PLANT SERVICE FOOTAGE</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-2 bg-[#1a1c1f] px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-[#ff6a1a] animate-ping" />
              <span className="text-white tracking-widest uppercase">7 UNCUT MASTER TAPES ARCHIVED</span>
            </div>
            <span className="hidden lg:inline text-[#c0c7d5]">PROTOCOL: RTSP / 4K HUD</span>
          </div>
        </div>
      </section>

      {/* Header Section with Technical Telemetry Banner */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-10 pb-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1a1c1f] border border-[#333538] rounded">
              <span className="material-symbols-outlined text-[#ff6a1a] text-[16px]">videocam</span>
              <span className="font-label-sm text-xs uppercase tracking-widest text-[#fabc4d] font-mono font-bold">
                UNCUT FACTORY &amp; SITE PROOF ARCHIVE
              </span>
            </div>
            <h1 className="font-display-lg text-4xl sm:text-5xl uppercase text-[#e2e2e6] tracking-wide leading-none font-extrabold">
              PLANT COMMISSIONING <br />
              <span className="text-[#ff6a1a]">&amp; SERVICE FOOTAGE</span>
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-[#e2bfb2] max-w-2xl leading-relaxed">
              Uncut factory proof tests, high-temperature hot-metal plant deployments, and full-motion dynamic load tests (up to 150% rated SWL) recorded across integrated steel complexes throughout India and global export facilities.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#1a1c1f] p-4 rounded border border-[#333538] shadow-lg space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#333538]">
              <span className="text-[#c0c7d5] uppercase">ARCHIVE REVISION</span>
              <span className="text-[#fabc4d] uppercase font-bold">REV 2024.4</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#333538]">
              <span className="text-[#c0c7d5] uppercase">AUDIT COMPLIANCE</span>
              <span className="text-white uppercase">ISO 9001:2015 WITNESS</span>
            </div>
            <div className="flex items-center justify-between pb-1.5 border-b border-[#333538]">
              <span className="text-[#c0c7d5] uppercase">PROOF MARGIN</span>
              <span className="text-[#ff6a1a] font-bold">150% STATIC SWL</span>
            </div>
            <div className="text-right text-[10px] text-[#9299a7] pt-1">
              LATENCY: 12ms // BALLABGARH TEST BED
            </div>
          </div>
        </div>

        {/* Filter Chips Row */}
        <div className="pt-8 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-1">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 font-label-md text-xs uppercase tracking-wider rounded font-mono font-semibold transition-all cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-[#ff6a1a] text-[#591e00] shadow-[0_0_12px_rgba(255,106,26,0.3)]'
                    : 'bg-[#1a1c1f] hover:bg-[#282a2d] text-[#e2bfb2] hover:text-white border border-[#333538]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Master Featured Video Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-6 w-full">
        <div className="bg-[#1a1c1f] rounded border border-[#333538] overflow-hidden shadow-2xl">
          {/* Telemetry Card Header Bar */}
          <div className="px-5 py-3 bg-[#1e2023] flex flex-wrap items-center justify-between gap-3 border-b border-[#333538]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-sm bg-[#ff6a1a]" />
              <span className="font-headline-sm text-sm sm:text-base uppercase text-white tracking-wider font-bold">
                FEATURED MASTER WITNESS TAPE
              </span>
              <span className="px-2 py-0.5 bg-[#bd8718]/20 text-[#fabc4d] border border-[#bd8718] font-mono text-[10px] rounded uppercase font-semibold">
                4K 60FPS TELEMETRY SYNC
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-[#e2bfb2]">
              <span>AUDIO INTERLOCK: <strong className="text-[#fabc4d]">ACTIVE</strong></span>
              <span>BURDEN LIMIT: <strong className="text-[#ff6a1a]">60,000 KG</strong></span>
            </div>
          </div>

          {/* Video Player Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#0c0e11]">
            {/* Main Player Display (8 cols) */}
            <div 
              onClick={() => onOpenVideo(masterTape)}
              className="lg:col-span-8 relative aspect-video w-full bg-[#111316] overflow-hidden group cursor-pointer"
            >
              <img
                src={masterTape.thumbnail}
                alt={masterTape.title}
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-transparent to-[#0c0e11]/60 pointer-events-none" />

              {/* Top HUD Bar inside Player */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white pointer-events-none">
                <div className="flex items-center gap-2 bg-[#0c0e11]/85 backdrop-blur-sm px-2.5 py-1 rounded border border-[#333538]">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>REC // {masterTape.camId} [{masterTape.camLocation}]</span>
                </div>
                <div className="hidden sm:flex items-center gap-3 bg-[#0c0e11]/85 backdrop-blur-sm px-2.5 py-1 rounded border border-[#333538]">
                  <span className="text-[#fabc4d]">MILL TEMP: {masterTape.operatingTemp}</span>
                  <span className="text-[#9299a7]">|</span>
                  <span className="text-[#ff6a1a] font-bold">SWL: 60 MT</span>
                </div>
              </div>

              {/* Central Big Play Button with Molten Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative group/btn flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#ff6a1a] text-[#591e00] shadow-[0_0_30px_rgba(255,106,26,0.6)] group-hover:scale-110 transition-all duration-300">
                  <span className="material-symbols-outlined text-[36px] md:text-[44px] ml-1 fill-current">play_arrow</span>
                </div>
              </div>

              {/* Bottom HUD Readings */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between font-mono text-xs text-white pointer-events-none gap-2">
                <div className="space-y-1 bg-[#0c0e11]/85 backdrop-blur-sm p-2 rounded border border-[#333538] text-[11px]">
                  <div className="text-[#c0c7d5]">
                    ROTATION SPEED: <span className="text-white font-semibold">1.8 RPM [MOTORIZED 360° SLEW]</span>
                  </div>
                  <div className="text-[#c0c7d5]">
                    OPTICAL LOCK: <span className="text-[#fabc4d]">LASER DETECTED [±0.5mm]</span>
                  </div>
                </div>
                <div className="bg-[#0c0e11]/85 backdrop-blur-sm px-3 py-1.5 rounded border border-[#333538] flex items-center gap-2 text-[11px]">
                  <span className="material-symbols-outlined text-[#fabc4d] text-[16px]">verified</span>
                  <span>WITNESS: TATA STEEL / KALINGANAGAR QA</span>
                </div>
              </div>
            </div>

            {/* Video Metadata & Engineering Strip (4 cols) */}
            <div className="lg:col-span-4 p-5 lg:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#333538] bg-[#1a1c1f]">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="font-mono text-xs text-[#ff6a1a] uppercase tracking-widest font-bold">
                    COIL HANDLING SERIES
                  </div>
                  <h2 className="font-headline-lg text-xl uppercase text-white font-bold leading-tight">
                    {masterTape.title}
                  </h2>
                  <div className="flex items-center gap-2 pt-1 font-mono text-xs text-[#c0c7d5]">
                    <span>DURATION: {masterTape.duration}</span>
                    <span>•</span>
                    <span>RES: 4K UHD</span>
                    <span>•</span>
                    <span className="text-[#fabc4d] font-semibold">{masterTape.proofRating}</span>
                  </div>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs pt-1">
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="block text-[10px] text-[#c0c7d5] uppercase">RIG MODEL</span>
                    <span className="text-white font-bold">{masterTape.modelRef}</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="block text-[10px] text-[#c0c7d5] uppercase">RATED LOAD</span>
                    <span className="text-[#ff6a1a] font-bold">60,000 KG</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="block text-[10px] text-[#c0c7d5] uppercase">OPERATING TEMP</span>
                    <span className="text-[#fabc4d] font-bold">750°C Radiant</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="block text-[10px] text-[#c0c7d5] uppercase">PLANT FACILITY</span>
                    <span className="text-white font-bold">Tata Steel Kalinganagar</span>
                  </div>
                </div>

                <div className="space-y-1.5 bg-[#111316] p-3 rounded border border-[#333538]">
                  <div className="font-mono text-[10px] text-[#ffb597] uppercase font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">terminal</span>
                    APPLICATION ENGINEER OBSERVATION LOG
                  </div>
                  <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                    {masterTape.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => onOpenVideo(masterTape)}
                  className="w-full py-3 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-sm font-bold rounded shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">play_circle</span>
                  LAUNCH CCTV HUD TELEMETRY PLAYER
                </button>
                <button
                  onClick={() => onOpenQuote('Motorized Coil Lifter (CL-M60)')}
                  className="w-full py-2 bg-[#282a2d] hover:bg-[#333538] text-white border border-[#333538] font-mono uppercase text-xs rounded transition-colors cursor-pointer"
                >
                  Request Technical GA for CL-M60
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Card CCTV Proof Grid */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-8 w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#333538] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="font-headline-lg text-2xl uppercase text-[#e2e2e6] tracking-wider font-bold">
              Archived Commissioning Tapes ({filteredVideos.length})
            </h3>
          </div>
          <span className="font-mono text-xs text-[#c0c7d5]">
            DIRECT WITNESS LOAD PROOF ARCHIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              onClick={() => onOpenVideo(video)}
              className="bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] rounded overflow-hidden flex flex-col justify-between group cursor-pointer transition-all shadow-md"
            >
              <div>
                {/* Thumbnail Display */}
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff6a1a] text-[#591e00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[28px] fill-current">play_arrow</span>
                    </div>
                  </div>

                  {/* Corner Badges */}
                  <div className="absolute top-2 left-2 bg-[#111316]/90 border border-[#333538] px-2 py-0.5 rounded font-mono text-[10px] text-[#ffb597] font-bold">
                    {video.camId} // {video.camLocation}
                  </div>
                  <div className="absolute top-2 right-2 bg-[#bd8718] text-[#3a2600] px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                    {video.proofRating}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded font-mono text-[10px] text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#c0c7d5]">
                    <span>SYS: {video.modelRef}</span>
                    <span className="text-[#fabc4d]">{video.site}</span>
                  </div>
                  <h4 className="font-headline-sm text-base uppercase text-white font-bold group-hover:text-[#ff6a1a] transition-colors line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="font-body-sm text-xs text-[#e2bfb2] line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Bottom Stream Bar */}
              <div className="px-4 py-2.5 bg-[#1e2023] border-t border-[#333538] flex items-center justify-between font-mono text-xs">
                <span className="text-[#9299a7] text-[11px]">CCTV SCANLINE READY</span>
                <span className="text-[#ff6a1a] group-hover:text-[#ff843d] flex items-center gap-1 font-bold">
                  STREAM TAPE
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QA Inspection Agency Witness Protocol Banner */}
      <section className="w-full bg-[#1e2023] border-t border-[#333538] py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="font-mono text-xs text-[#ffb597] uppercase font-bold tracking-widest">
              THIRD-PARTY WITNESS PROTOCOLS
            </span>
            <h3 className="font-headline-lg text-2xl uppercase text-[#e2e2e6] tracking-wider font-bold">
              Endorsed by Independent Metallurgical Quality Inspection Agencies
            </h3>
            <p className="font-body-sm text-xs text-[#e2bfb2] max-w-2xl mx-auto">
              Our 150% static overload hydraulic test bench in Ballabgarh regularly welcomes customer inspectors and third-party surveying societies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Lloyd's Register", code: 'LRQA MARINE & MILL' },
              { name: 'Bureau Veritas', code: 'BV HEAVY HOIST CL.1' },
              { name: 'TÜV Rheinland', code: 'EN 13155 SAFETY' },
              { name: 'DNV GL', code: 'OFFSHORE & FORGING' },
              { name: 'SGS India', code: 'NDT & MPI WITNESS' },
              { name: 'RITES Limited', code: 'RAIL & PSUs APPROVED' },
            ].map((agency, aidx) => (
              <div key={aidx} className="p-3 bg-[#111316] border border-[#333538] rounded text-center font-mono">
                <div className="text-white text-xs font-bold uppercase">{agency.name}</div>
                <div className="text-[#9299a7] text-[9px] pt-0.5">{agency.code}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
