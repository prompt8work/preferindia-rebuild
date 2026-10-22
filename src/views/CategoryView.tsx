import React, { useState, useMemo } from 'react';
import { ViewMode, VideoTape } from '../types';
import { COIL_HANDLING_RIGS, VIDEO_ARCHIVE } from '../data/equipmentData';

interface CategoryViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenVideo: (video: VideoTape) => void;
  onOpenCad: () => void;
  onOpenQuote: (productName?: string) => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  onNavigate,
  onOpenVideo,
  onOpenQuote,
  onAddToast,
}) => {
  const [maxCapacity, setMaxCapacity] = useState<number>(80);
  const [selectedTopologies, setSelectedTopologies] = useState<string[]>([
    'Motorized Coil Tongs (H/V)',
    'Coil Upenders / Tilters (90°)',
    'Coil Transfer Cars (Rail/SP)',
    'Mechanical Counterweighted C-Hooks',
    'Vacuum Coil End-Face Lifters',
  ]);
  const [millEnv, setMillEnv] = useState<string>('Hot Strip Mill (≤ 800°C)');
  const [axisOrientation, setAxisOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [sortBy, setSortBy] = useState<'high-to-low' | 'low-to-high'>('high-to-low');

  const topologyOptions = [
    { label: 'Motorized Coil Tongs (H/V)', category: 'Motorized Coil Tongs (H/V)' },
    { label: 'Coil Upenders / Tilters (90°)', category: 'Coil Upenders / Tilters (90°)' },
    { label: 'Coil Transfer Cars (Rail/SP)', category: 'Heavy Mill Coil Transfer Cars' },
    { label: 'Mechanical Counterweighted C-Hooks', category: 'Mechanical Counterweighted C-Hooks' },
    { label: 'Vacuum Coil End-Face Lifters', category: 'Vacuum Coil End-Face Lifters' },
  ];

  const handleToggleTopology = (cat: string) => {
    setSelectedTopologies(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleResetFilters = () => {
    setMaxCapacity(80);
    setSelectedTopologies([
      'Motorized Coil Tongs (H/V)',
      'Coil Upenders / Tilters (90°)',
      'Coil Transfer Cars (Rail/SP)',
      'Mechanical Counterweighted C-Hooks',
      'Vacuum Coil End-Face Lifters',
    ]);
    setMillEnv('Hot Strip Mill (≤ 800°C)');
    setAxisOrientation('horizontal');
    onAddToast('Filters Restored', 'Application parameters reset to factory default envelope.', 'info');
  };

  const filteredRigs = useMemo(() => {
    let result = COIL_HANDLING_RIGS.filter(rig => {
      // Capacity check
      if (rig.minCap > maxCapacity) return false;
      // Topology check
      const matchesTopo = selectedTopologies.some(top => rig.category.toLowerCase().includes(top.toLowerCase().slice(0, 10)));
      if (selectedTopologies.length > 0 && !matchesTopo) return false;
      return true;
    });

    if (sortBy === 'high-to-low') {
      result.sort((a, b) => b.maxCap - a.maxCap);
    } else {
      result.sort((a, b) => a.minCap - b.minCap);
    }

    return result;
  }, [maxCapacity, selectedTopologies, sortBy]);

  const activeFilterCount = (maxCapacity < 80 ? 1 : 0) + (selectedTopologies.length < 5 ? 1 : 0) + (axisOrientation === 'vertical' ? 1 : 0) + (millEnv !== 'Hot Strip Mill (≤ 800°C)' ? 1 : 0) + 1;

  return (
    <div className="flex flex-col w-full">
      {/* Precision Technical Breadcrumb & Specification Meta Strip */}
      <section className="w-full bg-[#0c0e11] px-4 md:px-8 lg:px-12 py-2 border-b border-[#333538]">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 text-[#e2bfb2] font-label-sm text-xs">
          <div className="flex items-center gap-2 tracking-wider">
            <button onClick={() => onNavigate('home')} className="hover:text-[#ff6a1a] transition-colors uppercase cursor-pointer">
              HQ-ROOT
            </button>
            <span className="text-[#5a4137] font-bold">/</span>
            <button onClick={() => onNavigate('products')} className="hover:text-[#ff6a1a] transition-colors uppercase cursor-pointer">
              HEAVY EQUIPMENT
            </button>
            <span className="text-[#5a4137] font-bold">/</span>
            <span className="text-[#ff6a1a] font-semibold uppercase">COIL HANDLING CATALOG</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#1a1c1f] text-[#c0c7d5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fabc4d]" />
              STD: ASME B30.20-2021 &amp; DIN EN 13155
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1a1c1f] text-[#e2e2e6]">
              <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">tune</span>
              FILTERS APPLIED: <strong className="text-[#ffb597] ml-1">{activeFilterCount}</strong>
            </span>
            <span className="px-2 py-0.5 bg-[#282a2d] text-[#e2bfb2]">DOC.REV: 2024-C3-MET</span>
          </div>
        </div>
      </section>

      {/* Technical Category Hero Section */}
      <section className="w-full bg-[#1a1c1f] relative overflow-hidden py-10 px-4 md:px-8 lg:px-12 border-b border-[#333538]">
        {/* CAD Blueprint Grid Backdrop SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="catCadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffb597" strokeDasharray="2 2" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#catCadGrid)" />
          </svg>
        </div>

        {/* Hot Thermal Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6a1a]/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#ff6a1a] text-[#591e00] font-headline-sm uppercase tracking-wider font-bold text-xs">
                  SECTION 02 // TONGS &amp; TILTERS
                </span>
                <span className="px-2.5 py-1 bg-[#333538] text-[#fabc4d] font-label-sm uppercase tracking-widest font-semibold text-xs font-mono">
                  10 — 80 MT SWL CLASSIFICATION
                </span>
                <span className="px-2.5 py-1 bg-[#1e2023] text-[#e2bfb2] font-label-sm text-xs font-mono">
                  ISO 9001:2015 FACTORY TESTED
                </span>
              </div>

              <h1 className="font-display-lg text-4xl sm:text-5xl uppercase tracking-tight text-[#e2e2e6] font-extrabold">
                COIL HANDLING <span className="text-[#ff6a1a]">EQUIPMENT</span>
              </h1>

              <p className="font-body-lg text-sm sm:text-base text-[#e2bfb2] leading-relaxed">
                Heavy-duty mechanical, electromechanical, and hydraulic coil turning, gripping, and internal-transfer systems engineered for continuous 24/7 service in hot strip mills, cold rolling complexes, slitting lines, and blast furnace yard operations. Built to endure temperatures up to 800°C with 100% duty cycle rating.
              </p>
            </div>

            {/* Telemetry Matrix Box */}
            <div className="bg-[#1e2023] border border-[#333538] p-4 shadow-xl flex flex-col gap-2 shrink-0 lg:w-80 rounded">
              <div className="flex items-center justify-between font-label-sm text-xs text-[#e2bfb2] uppercase font-mono">
                <span>MILL TELEMETRY</span>
                <span className="flex items-center gap-1 text-[#ff6a1a] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ff6a1a] animate-pulse" />
                  STANDBY 100%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 font-label-md pt-1">
                <div className="bg-[#0c0e11] p-2 flex flex-col rounded">
                  <span className="text-[#e2bfb2] font-label-sm text-[10px] uppercase font-mono">CORE FAMILIES</span>
                  <span className="text-[#ffb597] font-bold text-lg font-headline-sm">05 RIGS</span>
                </div>
                <div className="bg-[#0c0e11] p-2 flex flex-col rounded">
                  <span className="text-[#e2bfb2] font-label-sm text-[10px] uppercase font-mono">MAX FIELD LOAD</span>
                  <span className="text-[#fabc4d] font-bold text-lg font-headline-sm">80 MT SWL</span>
                </div>
                <div className="bg-[#0c0e11] p-2 flex flex-col col-span-2 rounded">
                  <span className="text-[#e2bfb2] font-label-sm text-[10px] uppercase font-mono">STRIP COMPATIBILITY</span>
                  <span className="text-white font-semibold text-xs font-mono">HOT (800°C) &amp; COLD FINISH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Characteristic Chips */}
          <div className="mt-6 pt-4 border-t border-[#333538] flex flex-wrap items-center gap-4 font-label-sm text-xs text-[#e2bfb2] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#fabc4d]">verified_user</span>
              <span>150% FACTORY PROOF LOAD TESTING ON RIGID HYDRAULIC BENCH</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ff6a1a]">speed</span>
              <span>CYCLE OPTIMIZED: 45 SEC COMPLETE 90° BED ARTICULATION</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffb597]">engineering</span>
              <span>CUSTOM ARBOR &amp; TONG RADII FOR ASTM / DIN STANDARDS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Equipment Catalog Section */}
      <section className="w-full bg-[#111316] px-4 md:px-8 lg:px-12 py-12">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Filter Rig Panel */}
          <aside className="w-full lg:w-[320px] shrink-0 bg-[#1a1c1f] p-5 border border-[#333538] rounded-md shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#333538]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[18px]">filter_alt</span>
                <span className="font-headline-sm text-base uppercase text-[#e2e2e6] font-semibold">APPLICATION FILTER</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="font-label-sm text-xs text-[#e2bfb2] hover:text-[#ff6a1a] transition-colors uppercase font-mono cursor-pointer"
              >
                [RESET]
              </button>
            </div>

            {/* Slider Control Envelope */}
            <div className="space-y-2 bg-[#0c0e11] p-3 rounded border border-[#333538]">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-xs text-[#e2e2e6] uppercase tracking-wider font-semibold">
                  CAPACITY ENVELOPE [MT]
                </label>
                <span className="font-label-md text-sm font-bold text-[#ff6a1a] font-mono">
                  Up to {maxCapacity} MT
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={maxCapacity}
                onChange={e => setMaxCapacity(Number(e.target.value))}
                className="w-full h-1.5 bg-[#333538] accent-[#ff6a1a] cursor-pointer"
              />
              <div className="flex justify-between text-[#c0c7d5] font-label-sm text-[10px] font-mono">
                <span>MIN: 10 MT</span>
                <span>MAX: 80 MT</span>
              </div>
            </div>

            {/* Rig Type Filters */}
            <div className="space-y-2">
              <h3 className="font-headline-sm text-sm text-[#e2e2e6] uppercase tracking-wide flex items-center justify-between">
                <span>RIGGING TOPOLOGY</span>
                <span className="font-label-sm text-[10px] text-[#c0c7d5] font-mono">05 TYPES</span>
              </h3>
              <div className="space-y-1.5 pt-1">
                {topologyOptions.map(opt => (
                  <label
                    key={opt.label}
                    className="flex items-center gap-2.5 p-2 bg-[#1e2023] hover:bg-[#282a2d] border border-transparent hover:border-[#333538] rounded transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTopologies.includes(opt.label)}
                      onChange={() => handleToggleTopology(opt.label)}
                      className="w-4 h-4 accent-[#ff6a1a] rounded cursor-pointer"
                    />
                    <span className="font-body-sm text-xs text-[#e2e2e6]">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mill Processing Environment */}
            <div className="space-y-2">
              <h3 className="font-headline-sm text-sm text-[#e2e2e6] uppercase tracking-wide">
                PROCESSING ENVIRONMENT
              </h3>
              <div className="space-y-1.5 pt-1 font-body-sm text-xs">
                {[
                  'Hot Strip Mill (≤ 800°C)',
                  'Cold Rolling Complex',
                  'Slitting & Annealing Line',
                  'Port / Stevedoring Yard',
                ].map(env => (
                  <label
                    key={env}
                    className={`flex items-center justify-between p-2 rounded transition-colors cursor-pointer border ${
                      millEnv === env
                        ? 'bg-[#282a2d] border-[#ff6a1a] text-white'
                        : 'bg-[#1e2023] border-transparent text-[#e2bfb2] hover:bg-[#282a2d]'
                    }`}
                  >
                    <span>{env}</span>
                    <input
                      type="radio"
                      name="mill_env"
                      checked={millEnv === env}
                      onChange={() => setMillEnv(env)}
                      className="w-3.5 h-3.5 accent-[#ff6a1a]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Coil Axis Orientation */}
            <div className="space-y-2">
              <h3 className="font-headline-sm text-sm text-[#e2e2e6] uppercase tracking-wide">
                COIL AXIS ORIENTATION
              </h3>
              <div className="grid grid-cols-2 gap-2 font-label-sm text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setAxisOrientation('horizontal')}
                  className={`p-2 rounded font-semibold uppercase tracking-wider text-center transition-all cursor-pointer ${
                    axisOrientation === 'horizontal'
                      ? 'bg-[#ff6a1a] text-[#591e00]'
                      : 'bg-[#1e2023] text-[#e2bfb2] hover:bg-[#282a2d]'
                  }`}
                >
                  HORIZONTAL (EYE-H)
                </button>
                <button
                  type="button"
                  onClick={() => setAxisOrientation('vertical')}
                  className={`p-2 rounded font-semibold uppercase tracking-wider text-center transition-all cursor-pointer ${
                    axisOrientation === 'vertical'
                      ? 'bg-[#ff6a1a] text-[#591e00]'
                      : 'bg-[#1e2023] text-[#e2bfb2] hover:bg-[#282a2d]'
                  }`}
                >
                  EYE-TO-SKY (VERT)
                </button>
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-2 space-y-2 border-t border-[#333538]">
              <button
                onClick={() => onAddToast('CAD Package Downloaded', 'Exporting DXF envelope specs to your downloads folder.', 'success')}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-[#1e2023] hover:bg-[#282a2d] border border-[#333538] hover:border-[#ff6a1a] text-[#ff6a1a] rounded font-headline-sm text-sm uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                EXPORT ENVELOPE SPEC (.DXF/PDF)
              </button>
              <div className="text-center font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">
                CALIBRATED FOR FEM 1.001 / DIN 15018 CL. H2-B4
              </div>
            </div>
          </aside>

          {/* Right Equipment Catalog Grid */}
          <div className="flex-1 w-full space-y-6">
            {/* Live Filter Feed Bar */}
            <div className="bg-[#1a1c1f] border border-[#333538] p-3 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-label-sm text-xs">
              <div className="flex items-center gap-2 text-[#e2e2e6]">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[18px]">view_in_ar</span>
                <span className="uppercase tracking-wider font-semibold font-mono">
                  SHOWING {filteredRigs.length} ENGINEERED CONFIGURATIONS
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#e2bfb2] font-mono">
                <div className="flex items-center gap-2">
                  <span>SORT:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="bg-[#111316] text-[#e2e2e6] border border-[#333538] rounded px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="high-to-low">CAPACITY [HIGH TO LOW]</option>
                    <option value="low-to-high">CAPACITY [LOW TO HIGH]</option>
                  </select>
                </div>
                <span className="hidden md:inline text-[10px] text-[#c0c7d5]">TOLERANCE: ±0.05 MM</span>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRigs.map(rig => (
                <article
                  key={rig.id}
                  className="bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] rounded overflow-hidden shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative w-full h-56 bg-[#0c0e11] overflow-hidden">
                      <img
                        src={rig.image}
                        alt={rig.altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 flex gap-1 font-mono">
                        <span className="px-2 py-0.5 bg-[#111316]/90 border border-[#333538] text-[#ffb597] font-label-sm text-[10px] uppercase font-bold">
                          SYS.REF: {rig.model}
                        </span>
                        <span className="px-2 py-0.5 bg-[#bd8718] text-[#3a2600] font-label-sm text-[10px] uppercase font-bold">
                          {rig.capacityRange}
                        </span>
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#111316]/90 border border-[#333538] text-[#e2e2e6] font-label-sm text-[10px] font-mono">
                        {rig.badgeRef || 'DUTY: 24/7 HSM MILL'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono tracking-wider">
                          {rig.applicationBay}
                        </span>
                        <h3 className="font-headline-md text-xl text-[#e2e2e6] uppercase font-bold group-hover:text-[#ff6a1a] transition-colors">
                          {rig.title}
                        </h3>
                      </div>

                      <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed line-clamp-3">
                        {rig.description}
                      </p>

                      {/* 4 Featured Specs 2x2 Grid */}
                      {rig.featuredSpecs && (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#333538]">
                          {rig.featuredSpecs.map((spec, sidx) => (
                            <div key={sidx} className="bg-[#111316] p-2 rounded border border-[#333538]/60">
                              <span className="block font-label-sm text-[9px] text-[#c0c7d5] uppercase font-mono">
                                {spec.label}
                              </span>
                              <span className="font-mono text-xs text-white font-semibold">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="p-4 bg-[#1e2023] border-t border-[#333538] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onNavigate('product-detail')}
                      className="px-3 py-1.5 bg-[#282a2d] hover:bg-[#333538] border border-[#333538] hover:border-[#ff6a1a] rounded text-xs font-headline-sm uppercase text-[#e2e2e6] hover:text-[#ff6a1a] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>VIEW FULL SPEC &amp; GA</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>

                    <button
                      onClick={() => onOpenQuote(`${rig.title} (${rig.model})`)}
                      className="px-3 py-1.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] rounded text-xs font-headline-sm uppercase font-bold transition-all shadow-md cursor-pointer"
                    >
                      INSTANT RFQ
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredRigs.length === 0 && (
              <div className="p-12 bg-[#1a1c1f] border border-[#333538] rounded text-center space-y-3">
                <span className="material-symbols-outlined text-[#fabc4d] text-[40px]">search_off</span>
                <h4 className="font-headline-sm text-lg text-white uppercase">No Configurations Match Current Filters</h4>
                <p className="font-body-sm text-xs text-[#e2bfb2]">
                  Try expanding the capacity envelope or reset your topology selection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#ff6a1a] text-[#591e00] rounded font-headline-sm text-xs uppercase font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Proof Video Strip */}
      <section className="w-full bg-[#1a1c1f] border-t border-[#333538] py-10 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <h3 className="font-headline-sm text-lg text-[#e2e2e6] uppercase font-bold tracking-wider">
                COIL HANDLING CCTV FOOTAGE ARCHIVE
              </h3>
            </div>
            <button
              onClick={() => onNavigate('videos')}
              className="text-xs font-mono text-[#ff6a1a] hover:underline uppercase flex items-center gap-1 cursor-pointer"
            >
              ALL 7 PROOF RECORDINGS <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIDEO_ARCHIVE.slice(0, 4).map(tape => (
              <div
                key={tape.id}
                onClick={() => onOpenVideo(tape)}
                className="bg-[#111316] border border-[#333538] hover:border-[#ff6a1a] rounded overflow-hidden group cursor-pointer transition-all"
              >
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img
                    src={tape.thumbnail}
                    alt={tape.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#ff6a1a] text-[#591e00] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded font-mono text-[9px] text-white">
                    {tape.duration}
                  </div>
                </div>
                <div className="p-2.5 space-y-1">
                  <div className="font-mono text-[9px] text-[#ffb597]">{tape.camId} // {tape.proofRating}</div>
                  <h4 className="font-headline-sm text-xs text-[#e2e2e6] uppercase font-bold line-clamp-1 group-hover:text-[#ff6a1a]">
                    {tape.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Custom Sizing RFQ Prompt */}
      <section className="w-full bg-[#111316] border-t border-[#333538] py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto p-6 bg-[#1e2023] border border-[#ff6a1a]/40 rounded-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-label-sm text-xs text-[#ffb597] uppercase font-mono font-bold">
              NON-STANDARD COIL ARBOR / EYE CONFIGURATIONS?
            </span>
            <h3 className="font-headline-sm text-xl text-[#e2e2e6] uppercase font-bold">
              Engineering Custom Tongs &amp; Tilters Up to 180 MT SWL
            </h3>
            <p className="font-body-sm text-xs text-[#e2bfb2]">
              Supply your mill runway hook clearance, coil OD/ID spectrum, and maximum coil weight for custom finite element modeling.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote('Custom Coil Handling Rig')}
            className="px-6 py-3 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-sm font-bold rounded shadow-lg whitespace-nowrap transition-all cursor-pointer"
          >
            REQUEST CUSTOM GA DRAWING
          </button>
        </div>
      </section>
    </div>
  );
};
