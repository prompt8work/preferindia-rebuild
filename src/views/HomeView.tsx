import React, { useState } from 'react';
import { ViewMode, EquipmentItem, VideoTape } from '../types';
import { CORE_EQUIPMENT_CLASSES, VIDEO_ARCHIVE, CLIENT_REFERENCES, EXPORT_DESTINATIONS } from '../data/equipmentData';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenVideo: (video: VideoTape) => void;
  onOpenCad: () => void;
  onOpenQuote: (productName?: string) => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenVideo,
  onOpenCad,
  onOpenQuote,
  onAddToast,
}) => {
  const [selectedRange, setSelectedRange] = useState<string>('30-60');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive RFQ form state inside home
  const [rfqEquipment, setRfqEquipment] = useState('Motorized Coil Lifter (CL-M60)');
  const [rfqCapacity, setRfqCapacity] = useState('30 MT');
  const [rfqTemp, setRfqTemp] = useState('Ambient (< 120°C)');
  const [rfqName, setRfqName] = useState('');
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const ranges = [
    { id: '4-15', label: '4 – 15 MT', sub: 'Pickling & Sheet Shearing', min: 4, max: 15 },
    { id: '15-30', label: '15 – 30 MT', sub: 'Galvanizing & Cold Mills', min: 15, max: 30 },
    { id: '30-60', label: '30 – 60 MT', sub: 'Hot Strip & Slitting Lines', min: 30, max: 60 },
    { id: '60-100', label: '60 – 100 MT', sub: 'Heavy Slab Caster Runout', min: 60, max: 100 },
    { id: '100-180', label: '100 – 180 MT', sub: 'Primary Ingot & Ladle Bail', min: 100, max: 180 },
  ];

  const currentRangeObj = ranges.find(r => r.id === selectedRange) || ranges[2];

  const categories = ['All', 'Coil Handling Rigs', 'Slab & Ingot Tongs', 'Heavy Transfer Cars', 'Specialized Vacuum / C-Hooks'];

  const filteredEquipment = CORE_EQUIPMENT_CLASSES.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLoad = !(item.maxCap < currentRangeObj.min || item.minCap > currentRangeObj.max);
    return matchesCategory && matchesLoad;
  });

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    const ticket = 'RFQ-2024-' + Math.floor(1000 + Math.random() * 9000);
    onAddToast('RFQ Transmitted to Engineering Works', `Ticket #${ticket} allocated. Senior application engineer will review within 4 hours.`, 'success');
  };

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full -mt-20 pt-20 bg-[#0c0e11] overflow-hidden">
        {/* Atmospheric Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXZIpBkbojI-ioazCes1ojKTh3qLg9NTdxFnBHC01MeTjqwb-W3YxlpWiqG3gqpVnIMP0emdbQfAKXVporht5oyEn_GBpHTHkWdYpVSchq-UbSFMHcIJspWH-4UWCTOKJS_1meEFn1R1EMCearKeyzlWO_AVE3Fv3RaTTjG_33p0tSyjF0ajIzzoIFW1gOd6wiHcsvOw7zc4xOa5FH_vy6NiYc_Iyy2TuHJTZNCurLBf-oJRXO74F7')` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111316] via-[#111316]/80 to-[#0c0e11]/60" />
        
        {/* HUD Technical Grid Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9299a7" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="1.5" fill="#ff6a1a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* HUD Telemetry Marks */}
        <div className="absolute top-28 left-6 md:left-12 z-10 hidden sm:flex flex-col gap-1 font-label-sm text-[10px] text-[#c0c7d5]/60 select-none">
          <span>SYS.LAT: 28.3412° N</span>
          <span>SYS.LON: 77.3197° E</span>
          <span>MILL_ID: PIW-BF-01</span>
          <span className="text-[#ffb597] font-semibold">STATUS: HEAVY LIFT ACTIVE</span>
        </div>
        <div className="absolute top-28 right-6 md:right-12 z-10 hidden sm:flex flex-col items-end gap-1 font-label-sm text-[10px] text-[#c0c7d5]/60 select-none">
          <span className="text-[#fabc4d] font-semibold">SWL RANGE: 4MT - 180MT</span>
          <span>FEA FACTOR: 3.5:1 DYNAMIC</span>
          <span>HYD.PR: 240 BAR NOM</span>
        </div>

        <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-4xl space-y-4">
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#282a2d]/90 border border-[#333538] rounded">
              <span className="w-2 h-2 rounded-full bg-[#ff6a1a] animate-ping" />
              <span className="w-2 h-2 rounded-full bg-[#ff6a1a] -ml-4" />
              <span className="font-label-sm text-xs text-[#ffb597] uppercase tracking-widest font-semibold">
                Heavy-Duty Material Handling • Steel Sector Specialists
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display-lg text-4xl sm:text-5xl md:text-[68px] md:leading-[70px] uppercase tracking-tight text-[#e2e2e6] font-extrabold">
              Engineered to Lift What Moves <span className="text-[#ff6a1a] drop-shadow-[0_0_24px_rgba(255,106,26,0.35)]">Steel</span>
            </h1>

            {/* Subline */}
            <p className="font-body-lg text-base md:text-lg text-[#e2bfb2] max-w-2xl leading-relaxed">
              Custom-engineered motorized coil lifters, automated slab tongs, transfer cars, and metallurgical grabs built to endure 24/7 continuous duty in extreme thermal environments. Designed &amp; fabricated in Faridabad since 1968.
            </p>

            {/* Action Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="inline-flex items-center gap-2 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] px-6 py-3 rounded font-headline-sm text-lg uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(255,106,26,0.4)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                Explore Heavy Equipment
              </button>
              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-2 bg-[#282a2d] hover:bg-[#333538] border border-[#333538] hover:border-[#ff6a1a] text-[#e2e2e6] px-6 py-3 rounded font-headline-sm text-lg uppercase tracking-wider transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#fabc4d]">architecture</span>
                Request Engineering Quote
              </button>
              <div className="hidden lg:flex items-center gap-2 pl-2 font-label-md text-xs text-[#e2bfb2]">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[18px]">verified_user</span>
                <span>ASME B30.20 &amp; BTH-1 COMPLIANT</span>
              </div>
            </div>
          </div>

          {/* Stat Chips Technical Panel */}
          <div className="mt-12 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#333538]/80">
            <div className="p-4 bg-[#1a1c1f]/90 border border-[#333538] rounded relative group hover:border-[#ff6a1a]/80 transition-all">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-xs text-[#c0c7d5] uppercase">RATING DELIVERED</span>
                <span className="font-label-sm text-xs text-[#ffb597]">#PROVEN-LIFT</span>
              </div>
              <div className="font-headline-xl text-3xl text-[#e2e2e6] uppercase tracking-tight font-bold">
                Up to 120 MT Built
              </div>
              <p className="font-body-sm text-xs text-[#e2bfb2] pt-1">
                Proven custom lift rigs in tier-1 integrated rolling mills worldwide.
              </p>
              <div className="absolute bottom-2 right-3 text-[#333538] group-hover:text-[#ff6a1a] transition-colors">
                <span className="material-symbols-outlined text-[28px]">weight</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1c1f]/90 border border-[#333538] rounded relative group hover:border-[#ff6a1a]/80 transition-all">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-xs text-[#c0c7d5] uppercase">ENGINEERING CAPACITY</span>
                <span className="font-label-sm text-xs text-[#fabc4d]">#FEA-SIMULATED</span>
              </div>
              <div className="font-headline-xl text-3xl text-[#e2e2e6] uppercase tracking-tight font-bold">
                Designs to 180 MT
              </div>
              <p className="font-body-sm text-xs text-[#e2bfb2] pt-1">
                Structural fatigue analysis, thermal shielding, and 3D FEA verification.
              </p>
              <div className="absolute bottom-2 right-3 text-[#333538] group-hover:text-[#fabc4d] transition-colors">
                <span className="material-symbols-outlined text-[28px]">analytics</span>
              </div>
            </div>

            <div className="p-4 bg-[#1a1c1f]/90 border border-[#333538] rounded relative group hover:border-[#ff6a1a]/80 transition-all">
              <div className="flex items-center justify-between pb-1">
                <span className="font-label-sm text-xs text-[#c0c7d5] uppercase">GLOBAL REACH</span>
                <span className="font-label-sm text-xs text-[#c0c7d5]">#BREAKBULK READY</span>
              </div>
              <div className="font-headline-xl text-3xl text-[#e2e2e6] uppercase tracking-tight font-bold">
                Exports to 12 Countries
              </div>
              <p className="font-body-sm text-xs text-[#e2bfb2] pt-1">
                Trusted by integrated blast furnaces across Asia, Middle East, &amp; Europe.
              </p>
              <div className="absolute bottom-2 right-3 text-[#333538] group-hover:text-[#ff6a1a] transition-colors">
                <span className="material-symbols-outlined text-[28px]">public</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE BUILT FOR YOUR LOAD STRIP */}
      <section className="w-full bg-[#1e2023] border-y border-[#333538] py-8 relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[18px]">tune</span>
                <span className="font-label-sm text-xs uppercase tracking-widest text-[#ffb597] font-bold">CALIBRATED LOAD SELECTOR</span>
              </div>
              <h2 className="font-headline-md text-2xl text-[#e2e2e6] uppercase tracking-wider font-semibold">
                Match Rigging to Mill Load Envelope
              </h2>
            </div>
            {/* Envelope Readout */}
            <div className="p-3 bg-[#0c0e11] border border-[#333538] rounded flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a1a] animate-pulse" />
              <div>
                <div className="font-label-sm text-[10px] text-[#c0c7d5] uppercase">Selected Metric Load Envelope</div>
                <div className="font-label-md text-sm text-[#ff6a1a] font-bold font-mono">
                  {currentRangeObj.label} ({currentRangeObj.sub})
                </div>
              </div>
            </div>
          </div>

          {/* Segmented Bar / Capacity Increments */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {ranges.map(range => {
              const active = range.id === selectedRange;
              return (
                <button
                  key={range.id}
                  onClick={() => setSelectedRange(range.id)}
                  className={`px-3 py-2.5 border rounded text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#282a2d] border-[#ff6a1a] shadow-[0_0_12px_rgba(255,106,26,0.25)]'
                      : 'bg-[#1a1c1f] border-[#333538] hover:border-[#ff6a1a]/60'
                  }`}
                >
                  <div className={`font-label-sm text-[10px] font-semibold ${active ? 'text-[#ff6a1a]' : 'text-[#9299a7]'}`}>
                    RANGE {range.id}
                  </div>
                  <div className="font-headline-sm text-lg text-[#e2e2e6] uppercase font-bold">
                    {range.label}
                  </div>
                  <div className="font-body-sm text-[11px] text-[#e2bfb2] truncate">
                    {range.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: CORE EQUIPMENT CATALOG */}
      <section id="product-catalog" className="w-full bg-[#111316] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#333538] pb-6">
            <div>
              <div className="flex items-center gap-2 text-[#ffb597] font-label-sm text-xs uppercase tracking-widest font-semibold pb-1">
                <span className="material-symbols-outlined text-[16px]">folder_special</span>
                MILL PRODUCT CATALOGUE
              </div>
              <h2 className="font-headline-xl text-3xl md:text-4xl text-[#e2e2e6] uppercase tracking-wide font-bold">
                Heavy Material Handling Equipment
              </h2>
            </div>
            
            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded font-label-sm text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow-md'
                      : 'bg-[#1e2023] text-[#e2bfb2] border border-[#333538] hover:border-[#ff6a1a]/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map(item => (
              <div
                key={item.id}
                className="bg-[#1a1c1f] border border-[#333538] rounded-md overflow-hidden flex flex-col group hover:border-[#ff6a1a] transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] bg-[#0c0e11] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1f] via-transparent to-black/30" />
                  
                  {/* Model Tag */}
                  <div className="absolute top-3 left-3 bg-[#111316]/90 border border-[#333538] px-2.5 py-1 rounded">
                    <span className="font-label-sm text-[11px] font-mono text-[#ffb597] font-bold">
                      {item.model}
                    </span>
                  </div>

                  {/* Technical Spec Badge */}
                  <div className="absolute top-3 right-3 bg-[#ff6a1a] text-[#591e00] px-2 py-0.5 rounded font-label-sm text-[10px] font-mono font-bold uppercase">
                    {item.capacityRange}
                  </div>

                  {item.tempRating && (
                    <div className="absolute bottom-3 left-3 bg-[#bd8718]/90 text-[#3a2600] px-2 py-0.5 rounded font-label-sm text-[10px] font-mono font-bold">
                      {item.tempRating}
                    </div>
                  )}

                  {item.cadRef && (
                    <div className="absolute bottom-3 right-3 bg-[#111316]/90 border border-[#333538] text-gray-300 px-2 py-0.5 rounded font-label-sm text-[10px] font-mono">
                      {item.cadRef}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="font-label-sm text-[10px] text-[#c0c7d5] uppercase tracking-wider font-mono">
                      {item.applicationBay}
                    </div>
                    <h3 className="font-headline-md text-xl text-[#e2e2e6] uppercase font-bold group-hover:text-[#ff6a1a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Links */}
                  <div className="pt-2 border-t border-[#333538] flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (item.id === 'cl-m60' || item.id === 'cu-30') {
                          onNavigate('product-detail');
                        } else {
                          onNavigate('products');
                        }
                      }}
                      className="text-xs font-headline-sm uppercase text-[#ff6a1a] hover:text-[#ff843d] flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      Technical Specs
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                    
                    <button
                      onClick={() => onOpenQuote(`${item.title} (${item.model})`)}
                      className="px-2.5 py-1 bg-[#282a2d] hover:bg-[#333538] border border-[#333538] rounded text-[11px] font-mono uppercase text-[#e2e2e6] hover:text-[#ff6a1a] transition-colors cursor-pointer"
                    >
                      Instant RFQ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 bg-[#1e2023] hover:bg-[#282a2d] border border-[#333538] text-[#e2e2e6] hover:text-[#ff6a1a] px-8 py-3 rounded font-headline-sm uppercase tracking-wider font-semibold transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">view_module</span>
              View Full 10-Class Mill Rigging Equipment Suite
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: 4 PILLARS OF ENGINEERING ASSURANCE */}
      <section className="w-full bg-[#1a1c1f] border-y border-[#333538] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="font-label-sm text-xs text-[#ffb597] uppercase tracking-widest font-bold">
              ZERO-FAIL CRITICAL METALLURGICAL LOGISTICS
            </span>
            <h2 className="font-headline-xl text-3xl md:text-4xl text-[#e2e2e6] uppercase tracking-wide font-bold">
              The 4 Pillars of Prefer India Heavy Engineering
            </h2>
            <p className="font-body-md text-sm text-[#e2bfb2]">
              Every tong, upender, and mill hoist we ship is validated against ASME B30.20, DIN 15401, and EN 13155 steel mill standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#111316] border border-[#333538] rounded flex flex-col justify-between space-y-4 hover:border-[#ff6a1a] transition-all">
              <div className="w-12 h-12 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#ff6a1a]">
                <span className="material-symbols-outlined text-[28px]">search_check</span>
              </div>
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">PILLAR 01 // NDT</span>
                <h3 className="font-headline-sm text-xl text-[#e2e2e6] uppercase font-bold">
                  100% Ultrasonic &amp; MPI Testing
                </h3>
                <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                  Every critical load-bearing weld undergoes Class-1 ultrasonic testing and wet fluorescent magnetic particle inspection before paint.
                </p>
              </div>
              <div className="pt-2 border-t border-[#333538] font-label-sm text-[10px] text-[#ffb597] font-mono">
                ASNT LEVEL-II INSPECTED
              </div>
            </div>

            <div className="p-6 bg-[#111316] border border-[#333538] rounded flex flex-col justify-between space-y-4 hover:border-[#ff6a1a] transition-all">
              <div className="w-12 h-12 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#fabc4d]">
                <span className="material-symbols-outlined text-[28px]">local_fire_department</span>
              </div>
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">PILLAR 02 // THERMAL</span>
                <h3 className="font-headline-sm text-xl text-[#e2e2e6] uppercase font-bold">
                  950°C Thermal Hardening
                </h3>
                <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                  Ceramic fiber radiant heat baffles, Hardox 500 jaw tips, and Class H silicone high-temperature wiring for red-hot continuous slabs.
                </p>
              </div>
              <div className="pt-2 border-t border-[#333538] font-label-sm text-[10px] text-[#fabc4d] font-mono">
                EXTREME HEAT PACK 950°C
              </div>
            </div>

            <div className="p-6 bg-[#111316] border border-[#333538] rounded flex flex-col justify-between space-y-4 hover:border-[#ff6a1a] transition-all">
              <div className="w-12 h-12 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#ff6a1a]">
                <span className="material-symbols-outlined text-[28px]">architecture</span>
              </div>
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">PILLAR 03 // FEA</span>
                <h3 className="font-headline-sm text-xl text-[#e2e2e6] uppercase font-bold">
                  3D Finite Element Analysis
                </h3>
                <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                  ANSYS stress fatigue simulations modeled to 2,000,000 continuous mill duty cycles (ASME BTH-1 Category B, Service Class 4).
                </p>
              </div>
              <div className="pt-2 border-t border-[#333538] font-label-sm text-[10px] text-[#ffb597] font-mono">
                SAFETY FACTOR 3.5:1 DYNAMIC
              </div>
            </div>

            <div className="p-6 bg-[#111316] border border-[#333538] rounded flex flex-col justify-between space-y-4 hover:border-[#ff6a1a] transition-all">
              <div className="w-12 h-12 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#c0c7d5]">
                <span className="material-symbols-outlined text-[28px]">verified</span>
              </div>
              <div className="space-y-2">
                <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">PILLAR 04 // WITNESS</span>
                <h3 className="font-headline-sm text-xl text-[#e2e2e6] uppercase font-bold">
                  Third-Party Proof Testing
                </h3>
                <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                  In-house 150% static overload hydraulic test rig with load cell witness certification available by Lloyd's, BV, or TÜV Rheinland.
                </p>
              </div>
              <div className="pt-2 border-t border-[#333538] font-label-sm text-[10px] text-[#c0c7d5] font-mono">
                150% PROOF LOAD TESTED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE MILL COMMISSIONING FOOTAGE */}
      <section className="w-full bg-[#111316] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#ffb597] font-label-sm text-xs uppercase tracking-widest font-semibold pb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                VERIFIED MILL SERVICE FOOTAGE
              </div>
              <h2 className="font-headline-xl text-3xl md:text-4xl text-[#e2e2e6] uppercase tracking-wide font-bold">
                Operational Rigs in Tier-1 Steel Plants
              </h2>
            </div>
            <button
              onClick={() => onNavigate('videos')}
              className="inline-flex items-center gap-2 text-[#ff6a1a] hover:text-[#ff843d] font-headline-sm text-sm uppercase tracking-wider font-bold cursor-pointer"
            >
              Browse Complete Footage Archive (7 Tapes)
              <span className="material-symbols-outlined text-[18px]">videocam</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_ARCHIVE.slice(0, 3).map(tape => (
              <div
                key={tape.id}
                onClick={() => onOpenVideo(tape)}
                className="bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] rounded overflow-hidden flex flex-col group cursor-pointer transition-all shadow-lg"
              >
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={tape.thumbnail}
                    alt={tape.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#ff6a1a] text-[#591e00] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[28px] fill-current">play_arrow</span>
                    </div>
                  </div>

                  {/* Cam HUD Tags */}
                  <div className="absolute top-2 left-2 bg-[#111316]/90 border border-[#333538] px-2 py-0.5 rounded font-mono text-[10px] text-[#ffb597]">
                    {tape.camId} // {tape.camLocation}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded font-mono text-[10px] text-white">
                    {tape.duration}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-label-sm text-[10px] text-[#c0c7d5] font-mono uppercase">
                      {tape.modelRef} • {tape.proofRating}
                    </span>
                    <h4 className="font-headline-sm text-base text-[#e2e2e6] uppercase font-bold group-hover:text-[#ff6a1a] transition-colors line-clamp-1">
                      {tape.title}
                    </h4>
                    <p className="font-body-sm text-xs text-[#e2bfb2] line-clamp-2 mt-1">
                      {tape.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#333538] flex items-center justify-between text-[11px] font-mono text-[#c0c7d5]">
                    <span>{tape.site}</span>
                    <span className="text-[#ff6a1a] flex items-center gap-1 font-bold">
                      STREAM TAPE <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENT REFERENCES MARQUEE */}
      <section className="w-full bg-[#1e2023] border-y border-[#333538] py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          <div className="text-center space-y-1">
            <span className="font-label-sm text-xs text-[#c0c7d5] uppercase tracking-widest font-mono">
              ESTABLISHED INSTALL BASE
            </span>
            <h3 className="font-headline-md text-2xl text-[#e2e2e6] uppercase tracking-wider font-bold">
              Trusted by Tier-1 Integrated Steel Mills &amp; Global Heavy EPCs
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CLIENT_REFERENCES.map((client, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#111316] border border-[#333538] rounded text-center flex flex-col items-center justify-center hover:border-[#ff6a1a] transition-all group"
              >
                <span className="font-headline-sm text-sm text-[#e2e2e6] uppercase font-bold group-hover:text-[#ff6a1a] transition-colors">
                  {client.name}
                </span>
                <span className="font-label-sm text-[9px] text-[#e2bfb2] font-mono">
                  {client.location}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: GLOBAL EXPORT LOGISTICS & CORRIDOR */}
      <section className="w-full bg-[#111316] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="font-label-sm text-xs text-[#ffb597] uppercase tracking-widest font-bold">
                BREAKBULK SEA FREIGHT READY
              </span>
              <h2 className="font-headline-xl text-3xl md:text-4xl text-[#e2e2e6] uppercase tracking-wide font-bold">
                Heavy Equipment Shipped to 12 Countries Worldwide
              </h2>
              <p className="font-body-md text-sm text-[#e2bfb2] leading-relaxed">
                Operating out of our heavy manufacturing works in Ballabgarh (Faridabad industrial corridor), Prefer India rigs are crated with seaworthy export rust inhibitor wrapping, vacuum nitrogen vapor barrier, and certified lifting lugs for breakbulk vessel transit.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {EXPORT_DESTINATIONS.map((country, idx) => (
                  <div key={idx} className="p-3 bg-[#1a1c1f] border border-[#333538] rounded">
                    <div className="font-headline-sm text-sm text-[#e2e2e6] uppercase font-bold">
                      {country}
                    </div>
                    <div className="font-label-sm text-[10px] text-[#ffb597] font-mono">
                      ACTIVE INSTALL BASE
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Logistics Corridor Graphic / Card */}
            <div className="p-6 bg-[#1a1c1f] border border-[#333538] rounded-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#333538] pb-3">
                <span className="font-label-sm text-xs font-mono text-[#ff6a1a] uppercase">
                  DISPATCH CORRIDOR // BALLABGARH WORKS
                </span>
                <span className="font-label-sm text-[10px] font-mono text-[#c0c7d5]">
                  NH-19 / WDFC CONNECTED
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#e2bfb2]">
                <div className="p-3 bg-[#111316] border border-[#333538] rounded flex items-center justify-between">
                  <span>BALLABGARH WORKS (MANUFACTURING)</span>
                  <span className="text-white font-bold">0 KM [ORIGIN]</span>
                </div>
                <div className="p-3 bg-[#111316] border border-[#333538] rounded flex items-center justify-between">
                  <span>MUNDRA / NHAVA SHEVA (PORT DISPATCH)</span>
                  <span className="text-[#fabc4d] font-bold">48 HR MULTI-AXLE</span>
                </div>
                <div className="p-3 bg-[#111316] border border-[#333538] rounded flex items-center justify-between">
                  <span>BREAKBULK STOWAGE CERTIFICATION</span>
                  <span className="text-emerald-400 font-bold">DNV / LLOYD'S APPROVED</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-[#282a2d] hover:bg-[#333538] border border-[#333538] hover:border-[#ff6a1a] rounded text-[#e2e2e6] font-headline-sm uppercase tracking-wider text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  View Dispatch Specifications &amp; Works Coordinates
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: INLINE MILL RFQ FORM */}
      <section id="engineering-inquiry" className="w-full bg-[#1e2023] border-t border-[#333538] py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto bg-[#1a1c1f] border-2 border-[#333538] rounded-lg p-6 md:p-10 shadow-2xl space-y-6">
            <div className="border-b border-[#333538] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <span className="font-label-sm text-xs font-mono text-[#ff6a1a] uppercase font-bold">
                  FAST-TRACK ENGINEERING CONSULTATION
                </span>
                <h3 className="font-headline-xl text-2xl md:text-3xl text-[#e2e2e6] uppercase tracking-wide font-bold">
                  Request Mill GA Drawing &amp; Budgetary Quotation
                </h3>
              </div>
              <span className="font-label-sm text-xs font-mono text-[#c0c7d5]">
                SLA: &lt; 4 HOURS RESPONSE
              </span>
            </div>

            {rfqSubmitted ? (
              <div className="p-8 bg-[#111316] border border-emerald-500/40 rounded text-center space-y-3">
                <span className="material-symbols-outlined text-emerald-400 text-[48px]">check_circle</span>
                <h4 className="font-headline-sm text-xl uppercase text-white font-bold">
                  Engineering RFQ Received
                </h4>
                <p className="font-body-sm text-sm text-[#e2bfb2] max-w-md mx-auto">
                  Our application design team in Ballabgarh has queued your request. GA drawings and duty cycle calculations will be dispatched to your email.
                </p>
                <button
                  onClick={() => setRfqSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-[#282a2d] hover:bg-[#333538] text-white text-xs font-mono uppercase rounded cursor-pointer"
                >
                  Submit Another Specification
                </button>
              </div>
            ) : (
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Equipment Family
                    </label>
                    <select
                      value={rfqEquipment}
                      onChange={e => setRfqEquipment(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    >
                      <option>Motorized Coil Lifter (CL-M60)</option>
                      <option>30 MT Coil Upender (CU-30)</option>
                      <option>Heavy Slab Tong (ST-A120)</option>
                      <option>Mechanical C-Hook (CH-45)</option>
                      <option>Coil Transfer Car (CTC-100)</option>
                      <option>Sheet Pack Lifter (SPL-35)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Target SWL Capacity
                    </label>
                    <select
                      value={rfqCapacity}
                      onChange={e => setRfqCapacity(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    >
                      <option>15 MT</option>
                      <option>30 MT (Standard)</option>
                      <option>45 MT</option>
                      <option>60 MT</option>
                      <option>100 MT Heavy</option>
                      <option>Custom 120+ MT</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Operating Thermal Bay
                    </label>
                    <select
                      value={rfqTemp}
                      onChange={e => setRfqTemp(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    >
                      <option>Ambient (&lt; 120°C)</option>
                      <option>Warm Rolling (120°C – 450°C)</option>
                      <option>Radiant Furnace (Up to 950°C)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Lead Plant Engineer Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={rfqName}
                      onChange={e => setRfqName(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Steel Mill / Enterprise
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tata Steel / JSW Steel"
                      value={rfqCompany}
                      onChange={e => setRfqCompany(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Corporate Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="engineer@steelworks.com"
                      value={rfqEmail}
                      onChange={e => setRfqEmail(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-xs text-[#c0c7d5] uppercase font-mono">
                      Direct Mill Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98110 XXXXX"
                      value={rfqPhone}
                      onChange={e => setRfqPhone(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-sm text-white font-mono focus:border-[#ff6a1a] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#c0c7d5]">
                    <span className="material-symbols-outlined text-emerald-400 text-[18px]">lock</span>
                    Non-Disclosure NDA Automatically Honored
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-base font-bold rounded shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    Transmit RFQ to Engineering
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
