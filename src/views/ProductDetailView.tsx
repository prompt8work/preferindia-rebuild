import React, { useState } from 'react';
import { ViewMode, VideoTape } from '../types';
import { CU30_SPECIFICATIONS, VIDEO_ARCHIVE } from '../data/equipmentData';

interface ProductDetailViewProps {
  onNavigate: (view: ViewMode) => void;
  onOpenVideo: (video: VideoTape) => void;
  onOpenCad: () => void;
  onOpenQuote: (productName?: string) => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  onNavigate,
  onOpenVideo,
  onOpenCad,
  onOpenQuote,
  onAddToast,
}) => {
  const [activeView, setActiveView] = useState<'photo' | 'cad'>('photo');
  
  // RFQ Sticky form state
  const [swlValue, setSwlValue] = useState<number>(30);
  const [femClass, setFemClass] = useState<string>('Class 4 (24/7 Mill Continuous)');
  const [voltage, setVoltage] = useState<string>('415V / 3-Phase / 50Hz (India/EU)');
  const [cradleLining, setCradleLining] = useState<string>('High-density Polyurethane / Nylon Pads');
  const [rfqName, setRfqName] = useState('');
  const [rfqCompany, setRfqCompany] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);

  const cu30Video = VIDEO_ARCHIVE.find(v => v.id === 'cam-04-upender') || VIDEO_ARCHIVE[1];

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    const ticket = 'CU30-RFQ-' + Math.floor(1000 + Math.random() * 9000);
    onAddToast(
      'CU-30 Engineering Proposal Queued',
      `Proposal Ticket #${ticket} generated. CAD files and GA drawings sent to ${rfqEmail}.`,
      'success'
    );
  };

  const handlePrintSpecs = () => {
    window.print();
    onAddToast('Print Dialog Triggered', 'Formatted engineering data matrix prepared for printer / PDF spool.', 'info');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility & Engineering Telemetry Bar */}
      <section className="w-full bg-[#0c0e11] border-b border-[#333538] px-4 md:px-8 lg:px-12 py-2">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-y-2 text-[#e2bfb2] font-label-sm text-xs tracking-wider">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 shrink-0">
            <button onClick={() => onNavigate('home')} className="hover:text-[#ff6a1a] transition-colors uppercase cursor-pointer">
              HOME
            </button>
            <span>/</span>
            <button onClick={() => onNavigate('products')} className="hover:text-[#ff6a1a] transition-colors uppercase cursor-pointer">
              COIL HANDLING
            </button>
            <span>/</span>
            <span className="text-[#ff6a1a] font-semibold uppercase">30 MT COIL UPENDER (CU-30)</span>
          </nav>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a1a] animate-ping" />
              DOC REV: <span className="text-white font-medium">2024.4</span>
            </span>
            <span className="hidden sm:inline text-[#333538]">|</span>
            <span className="text-[#e2bfb2]">STD: <span className="text-white">ASME B30.20 &amp; BTH-1 CLASS 4</span></span>
            <span className="hidden md:inline text-[#333538]">|</span>
            <span className="bg-[#282a2d] px-2 py-0.5 rounded text-[#fabc4d] font-semibold">CALIBRATED SWL: 30,000 KG</span>
            <span className="hidden lg:inline text-[#333538]">|</span>
            <span className="text-[#ff6a1a] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">precision_manufacturing</span>
              FABRICATION: LIVE
            </span>
          </div>
        </div>
      </section>

      {/* Engineering Product Hero & Master Title Block */}
      <section className="w-full bg-[#1a1c1f] border-b border-[#333538] relative overflow-hidden py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#ff6a1a]/10 border border-[#ff6a1a]/30 rounded text-[#ff6a1a] font-label-md text-xs uppercase tracking-widest font-mono">
              <span className="w-2 h-2 bg-[#ff6a1a] rounded-sm" />
              Heavy-Duty Mechanical &amp; Hydraulic Coil Tilter
            </div>
            <h1 className="font-display-lg text-4xl sm:text-5xl uppercase tracking-wide leading-none text-[#e2e2e6] font-extrabold pt-1">
              30 MT Coil Upender (CU-30)
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-[#e2bfb2] max-w-3xl leading-relaxed pt-1">
              Precision 90-degree tilting cradle engineered for continuous 24/7 reorientation of hot-rolled and cold-rolled steel coils between horizontal eye-to-sky and vertical axis orientations. Designed for extreme furnace-side and coil yard duty cycles.
            </p>
          </div>

          {/* Monospace Key Spec Chips */}
          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0 font-mono text-xs">
            <span className="px-3 py-1.5 bg-[#333538] border border-[#333538] text-[#fabc4d] rounded tracking-wider font-semibold">
              [SWL 30 METRIC TONNES]
            </span>
            <span className="px-3 py-1.5 bg-[#282a2d] border border-[#333538] text-white rounded tracking-wider">
              [CYCLE TIME: 45 SEC / 90°]
            </span>
            <span className="px-3 py-1.5 bg-[#282a2d] border border-[#333538] text-white rounded tracking-wider">
              [DRIVE: DUAL HYDRAULIC CYLINDERS]
            </span>
            <span className="px-3 py-1.5 bg-[#ff6a1a]/20 border border-[#ff6a1a]/40 text-[#ffb597] rounded tracking-wider">
              [DUTY CYCLE: FEM CLASS 3/4]
            </span>
          </div>
        </div>
      </section>

      {/* Main Product Workstation Grid */}
      <main className="w-full bg-[#111316] py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visuals, Technical Data & Validation (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Viewport Module (Photo vs CAD Toggle) */}
            <div className="bg-[#1a1c1f] border border-[#333538] rounded-md overflow-hidden shadow-2xl">
              {/* Viewport Switcher Controls Header */}
              <div className="bg-[#1e2023] px-4 py-2.5 border-b border-[#333538] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-label-sm text-xs text-[#e2bfb2] uppercase font-mono">
                  <span className="material-symbols-outlined text-[16px] text-[#ff6a1a]">camera_alt</span>
                  <span>TELEMETRY VIEWPORT //</span>
                  <span className="text-white font-semibold">
                    {activeView === 'photo' ? 'PLANT ACTIVE DEPLOYMENT' : 'GA CAD BLUEPRINT SCHEMATIC'}
                  </span>
                </div>
                
                <div className="inline-flex p-1 bg-[#0c0e11] border border-[#333538] rounded">
                  <button
                    onClick={() => setActiveView('photo')}
                    className={`px-3 py-1 font-label-sm text-xs rounded transition-all flex items-center gap-1.5 font-mono cursor-pointer ${
                      activeView === 'photo'
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow'
                        : 'text-[#e2bfb2] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">factory</span>
                    [VIEW: PLANT PHOTO]
                  </button>
                  <button
                    onClick={() => setActiveView('cad')}
                    className={`px-3 py-1 font-label-sm text-xs rounded transition-all flex items-center gap-1.5 font-mono cursor-pointer ${
                      activeView === 'cad'
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow'
                        : 'text-[#e2bfb2] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">architecture</span>
                    [VIEW: CAD SCHEMATIC]
                  </button>
                </div>
              </div>

              {/* Viewport Canvas Area */}
              <div className="relative w-full aspect-[16/9] bg-[#0c0e11] overflow-hidden flex items-center justify-center">
                {activeView === 'photo' ? (
                  <div className="relative w-full h-full">
                    <img
                      src="/assets/aistudio/Image_3_6e68f3fa.jpeg"
                      alt="30 MT Coil Upender operating in steel rolling mill"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-[#0d141f] p-4 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/Image_4_2c20ea0e.jpeg"
                      alt="2D CAD General Arrangement drawing of 30 MT Coil Upender"
                      className="w-full h-full object-contain cursor-zoom-in"
                      onClick={onOpenCad}
                      title="Click to expand high-res CAD viewer"
                    />
                    {/* CAD Blueprint grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf810_1px,transparent_1px),linear-gradient(to_bottom,#38bdf810_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                    
                    {/* Zoom Overlay Trigger */}
                    <button
                      onClick={onOpenCad}
                      className="absolute bottom-4 right-4 bg-[#1e293b]/90 hover:bg-[#334155] border border-[#38bdf8]/40 text-white px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      EXPAND 2D CAD SCHEMATICS
                    </button>
                  </div>
                )}

                {/* HUD Floating Real-Time Data Markers */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none font-mono">
                  <div className="bg-[#0c0e11]/90 backdrop-blur border border-[#ff6a1a]/40 px-2.5 py-1 rounded text-[#ff6a1a] text-xs font-semibold tracking-wider flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#ff6a1a] animate-pulse" />
                    TILT ANGLE: 90.0° ± 0.5°
                  </div>
                  <div className="bg-[#0c0e11]/85 backdrop-blur border border-[#333538] px-2.5 py-1 rounded text-white text-xs tracking-wider flex items-center gap-1.5 shadow">
                    <span className="material-symbols-outlined text-[14px] text-[#fabc4d]">straighten</span>
                    MAX COIL OD: Ø2,000 MM
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 hidden sm:flex flex-col gap-2 items-end pointer-events-none font-mono">
                  <div className="bg-[#0c0e11]/85 backdrop-blur border border-[#333538] px-2.5 py-1 rounded text-white text-xs tracking-wider flex items-center gap-1.5 shadow">
                    <span className="material-symbols-outlined text-[14px] text-[#c0c7d5]">shield</span>
                    CRADLE: V-BED NYLON/URETHANE LINED
                  </div>
                  <div className="bg-[#0c0e11]/85 backdrop-blur border border-[#333538] px-2.5 py-1 rounded text-white text-xs tracking-wider flex items-center gap-1.5 shadow">
                    <span className="material-symbols-outlined text-[14px] text-[#fabc4d]">bolt</span>
                    MOTOR: 18.5 KW HEAVY TEFC
                  </div>
                </div>

                {/* Reticle Corner Markers */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ff6a1a] pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ff6a1a] pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ff6a1a] pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ff6a1a] pointer-events-none" />
              </div>

              {/* Thumbnail Selector Strip */}
              <div className="bg-[#1e2023] p-3 border-t border-[#333538] flex items-center gap-3 overflow-x-auto">
                <button
                  onClick={() => setActiveView('photo')}
                  className={`relative w-24 h-16 rounded overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                    activeView === 'photo' ? 'border-[#ff6a1a]' : 'border-[#333538] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src="/assets/aistudio/Image_3_6e68f3fa.jpeg" alt="Plant operation thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 text-center font-mono text-[9px] text-[#ff6a1a] py-0.5 uppercase">Plant Cam</div>
                </button>

                <button
                  onClick={() => setActiveView('cad')}
                  className={`relative w-24 h-16 rounded overflow-hidden shrink-0 transition-all cursor-pointer bg-[#0d141f] border-2 ${
                    activeView === 'cad' ? 'border-[#ff6a1a]' : 'border-[#333538] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src="/assets/aistudio/Image_4_2c20ea0e.jpeg" alt="CAD drawing thumbnail" className="w-full h-full object-contain p-1" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 text-center font-mono text-[9px] text-[#c0c7d5] py-0.5 uppercase">GA Schematics</div>
                </button>

                <div className="relative w-24 h-16 rounded overflow-hidden border border-[#333538] shrink-0 bg-[#282a2d] flex flex-col items-center justify-center p-1 text-center font-mono">
                  <span className="material-symbols-outlined text-[20px] text-[#fabc4d]">oil_barrel</span>
                  <span className="text-[9px] text-white uppercase leading-tight pt-1">HPU 210-BAR</span>
                  <span className="text-[8px] text-[#c0c7d5]">Dual Vane</span>
                </div>

                <div className="relative w-24 h-16 rounded overflow-hidden border border-[#333538] shrink-0 bg-[#282a2d] flex flex-col items-center justify-center p-1 text-center font-mono">
                  <span className="material-symbols-outlined text-[20px] text-[#ff6a1a]">gamepad</span>
                  <span className="text-[9px] text-white uppercase leading-tight pt-1">RF PENDANT</span>
                  <span className="text-[8px] text-[#c0c7d5]">SIL 3 Rating</span>
                </div>

                <div className="ml-auto hidden md:flex items-center gap-2 px-3 py-1 bg-[#1a1c1f] border border-[#333538] rounded">
                  <span className="material-symbols-outlined text-[#fabc4d] text-[16px]">verified</span>
                  <span className="font-label-sm text-xs text-white tracking-wider uppercase font-mono">
                    FABRICATED IN BALLABGARH WORKS
                  </span>
                </div>
              </div>
            </div>

            {/* Machine Overview & Structural Architecture (4 Feature Callouts) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#333538] pb-3">
                <h2 className="font-headline-lg text-2xl uppercase text-[#e2e2e6] tracking-wider flex items-center gap-2 font-bold">
                  <span className="w-1.5 h-6 bg-[#ff6a1a]" />
                  Mechanical &amp; Hydraulic Architecture
                </h2>
                <span className="font-label-sm text-xs text-[#c0c7d5] uppercase tracking-widest font-mono">
                  SYS-CODE: CU30-GA-001
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#1a1c1f] border border-[#333538] rounded space-y-2">
                  <div className="flex items-center gap-2 text-[#ff6a1a]">
                    <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                    <h3 className="font-headline-sm text-base uppercase font-bold text-white">
                      1. Heavy-Duty Structural Cradle Frame
                    </h3>
                  </div>
                  <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                    Fabricated from high-tensile structural steel plates conforming to IS 2062 Grade E350. Heavy stiffener box ribbing delivers torsional rigidity under eccentric coil placements.
                  </p>
                </div>

                <div className="p-4 bg-[#1a1c1f] border border-[#333538] rounded space-y-2">
                  <div className="flex items-center gap-2 text-[#fabc4d]">
                    <span className="material-symbols-outlined text-[20px]">hydraulic</span>
                    <h3 className="font-headline-sm text-base uppercase font-bold text-white">
                      2. Dual Telescopic Hydraulic Cylinders
                    </h3>
                  </div>
                  <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                    Heavy-mill grade tie-rod cylinders equipped with hard chrome-plated induction-hardened piston rods, integral pilot-operated counterbalance check valves, and end-stroke cushioning.
                  </p>
                </div>

                <div className="p-4 bg-[#1a1c1f] border border-[#333538] rounded space-y-2">
                  <div className="flex items-center gap-2 text-[#ffb597]">
                    <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
                    <h3 className="font-headline-sm text-base uppercase font-bold text-white">
                      3. Self-Contained HPU Skid
                    </h3>
                  </div>
                  <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                    Integrated 18.5 kW TEFC motor, variable displacement piston pump delivering 210 bar working pressure, stainless steel pipework, and automatic offline oil filtration with thermal cutouts.
                  </p>
                </div>

                <div className="p-4 bg-[#1a1c1f] border border-[#333538] rounded space-y-2">
                  <div className="flex items-center gap-2 text-[#c0c7d5]">
                    <span className="material-symbols-outlined text-[20px]">security</span>
                    <h3 className="font-headline-sm text-base uppercase font-bold text-white">
                      4. Multi-Tier Mill Safety Architecture
                    </h3>
                  </div>
                  <p className="font-body-sm text-xs text-[#e2bfb2] leading-relaxed">
                    Dual mechanical locking pawls, hardwired emergency stop pendant with safety relays (SIL 3 rated), optical safety perimeter beams, and mechanical anti-drop stops.
                  </p>
                </div>
              </div>
            </div>

            {/* 12-Row Comprehensive Engineering Data Matrix */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#333538] pb-3">
                <div className="space-y-0.5">
                  <span className="font-label-sm text-xs text-[#ff6a1a] uppercase font-mono font-bold">
                    TOLERANCED SPECIFICATION SHEET
                  </span>
                  <h3 className="font-headline-lg text-2xl uppercase text-[#e2e2e6] tracking-wider font-bold">
                    CU-30 Engineering Data Matrix
                  </h3>
                </div>
                
                <button
                  onClick={handlePrintSpecs}
                  className="px-3 py-1.5 bg-[#1e2023] hover:bg-[#282a2d] border border-[#333538] hover:border-[#ff6a1a] text-xs font-mono text-[#e2e2e6] rounded flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  PRINT DATA MATRIX
                </button>
              </div>

              <div className="overflow-x-auto border border-[#333538] rounded-md">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#1e2023] text-[#c0c7d5] uppercase border-b border-[#333538]">
                    <tr>
                      <th className="py-2.5 px-4 font-bold">Design Parameter</th>
                      <th className="py-2.5 px-4 font-bold">Standard Value</th>
                      <th className="py-2.5 px-4 font-bold hidden sm:table-cell">Engineering Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#333538] bg-[#1a1c1f]">
                    {CU30_SPECIFICATIONS.map((row, idx) => (
                      <tr key={idx} className="hover:bg-[#282a2d]/50 transition-colors">
                        <td className="py-2 px-4 text-[#e2bfb2] font-semibold whitespace-nowrap">
                          {row.param}
                        </td>
                        <td className="py-2 px-4 text-white font-bold whitespace-nowrap">
                          {row.spec}
                        </td>
                        <td className="py-2 px-4 text-[#9299a7] hidden sm:table-cell text-[11px]">
                          {row.rating}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* CCTV Proof Footage Card */}
            <div className="p-6 bg-[#1a1c1f] border border-[#333538] rounded-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-label-sm text-xs font-mono text-[#ff6a1a] uppercase font-bold">
                    WITNESS TESTING ARCHIVE // CAM 04
                  </span>
                </div>
                <span className="font-mono text-xs text-[#c0c7d5]">FULL LOAD 30 MT PROOF</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div 
                  onClick={() => onOpenVideo(cu30Video)}
                  className="relative aspect-video bg-black rounded overflow-hidden cursor-pointer group sm:col-span-1"
                >
                  <img src="/assets/aistudio/Image_3_6e68f3fa.jpeg" alt="Video thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#ff6a1a] text-[#591e00] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                    </div>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded font-mono text-[9px] text-white">
                    03:48
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <h4 className="font-headline-sm text-base uppercase font-bold text-white">
                    CU-30 Full Hydraulic 90° Tilting Proof Cycle
                  </h4>
                  <p className="font-body-sm text-xs text-[#e2bfb2]">
                    Recorded witness testing at Ballabgarh Heavy Test Bay prior to packaging for JSW Vijayanagar HSM. Displays complete smooth articulation under 30 metric ton hot coil load.
                  </p>
                  <button
                    onClick={() => onOpenVideo(cu30Video)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#ff6a1a] hover:text-[#ff843d] font-bold cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    OPEN CCTV HUD PLAYER
                  </button>
                </div>
              </div>
            </div>

            {/* Complementary Mill Rigging */}
            <div className="space-y-4">
              <h3 className="font-headline-sm text-lg uppercase text-[#e2e2e6] tracking-wider font-bold">
                Complementary Mill Rigging Pairs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => onNavigate('products')}
                  className="p-4 bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] rounded flex items-center gap-4 cursor-pointer group transition-all"
                >
                  <div className="w-12 h-12 rounded bg-[#111316] flex items-center justify-center text-[#ff6a1a] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm uppercase text-white font-bold group-hover:text-[#ff6a1a]">
                      Motorized Coil Lifter (CL-M60)
                    </h4>
                    <p className="font-body-sm text-xs text-[#e2bfb2]">
                      15 — 60 MT capacity with 360° slew head for feeding the CU-30 cradle.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => onNavigate('products')}
                  className="p-4 bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] rounded flex items-center gap-4 cursor-pointer group transition-all"
                >
                  <div className="w-12 h-12 rounded bg-[#111316] flex items-center justify-center text-[#fabc4d] shrink-0">
                    <span className="material-symbols-outlined text-[24px]">train</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm uppercase text-white font-bold group-hover:text-[#fabc4d]">
                      Coil Transfer Car (CTC-100)
                    </h4>
                    <p className="font-body-sm text-xs text-[#e2bfb2]">
                      Automated rail transport receiving reoriented coils directly from upender.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky RFQ Console, CAD Downloads & Works Contact (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Direct RFQ Console for CU-30 */}
            <div className="bg-[#1a1c1f] border-2 border-[#ff6a1a]/60 rounded-md p-5 shadow-2xl space-y-4">
              <div className="border-b border-[#333538] pb-3 flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-[10px] text-[#ff6a1a] uppercase font-mono tracking-widest font-bold">
                    MILL RFQ CONSOLE
                  </span>
                  <h3 className="font-headline-sm text-lg uppercase text-white tracking-wider font-bold">
                    Request CU-30 Quotation &amp; GA
                  </h3>
                </div>
                <span className="material-symbols-outlined text-[#ff6a1a] text-[24px]">request_quote</span>
              </div>

              {rfqSubmitted ? (
                <div className="p-4 bg-[#111316] border border-emerald-500/40 rounded text-center space-y-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[36px]">check_circle</span>
                  <h4 className="font-headline-sm text-base uppercase text-white font-bold">
                    Proposal Dispatched
                  </h4>
                  <p className="font-body-sm text-xs text-[#e2bfb2]">
                    GA Drawing package (PDF &amp; DXF) is routing to {rfqEmail}.
                  </p>
                  <button
                    onClick={() => setRfqSubmitted(false)}
                    className="mt-2 px-3 py-1 bg-[#282a2d] hover:bg-[#333538] text-white text-xs font-mono uppercase rounded cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-[#c0c7d5] uppercase font-semibold text-[11px]">
                      Required SWL Capacity: <span className="text-[#ff6a1a] font-bold">{swlValue} MT</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="5"
                      value={swlValue}
                      onChange={e => setSwlValue(Number(e.target.value))}
                      className="w-full h-1.5 bg-[#333538] accent-[#ff6a1a] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#c0c7d5]">
                      <span>15 MT</span>
                      <span>30 MT (STD)</span>
                      <span>60 MT</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#c0c7d5] uppercase font-semibold text-[11px]">
                      FEM / Duty Standard
                    </label>
                    <select
                      value={femClass}
                      onChange={e => setFemClass(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option>Class 4 (24/7 Mill Continuous)</option>
                      <option>Class 3 (Heavy Intermittent)</option>
                      <option>Class 2 (Standard Warehouse)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#c0c7d5] uppercase font-semibold text-[11px]">
                      Electrical Supply
                    </label>
                    <select
                      value={voltage}
                      onChange={e => setVoltage(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option>415V / 3-Phase / 50Hz (India/EU)</option>
                      <option>480V / 3-Phase / 60Hz (USA/Americas)</option>
                      <option>380V / 3-Phase / 50Hz (SE Asia)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#c0c7d5] uppercase font-semibold text-[11px]">
                      Cradle Protection
                    </label>
                    <select
                      value={cradleLining}
                      onChange={e => setCradleLining(e.target.value)}
                      className="w-full bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    >
                      <option>High-density Polyurethane / Nylon Pads</option>
                      <option>Hardwood Oak Saddle Inserts</option>
                      <option>Brass / Bronze Non-Marring Strips</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      required
                      placeholder="Engineer Name"
                      value={rfqName}
                      onChange={e => setRfqName(e.target.value)}
                      className="bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Steel Mill Name"
                      value={rfqCompany}
                      onChange={e => setRfqCompany(e.target.value)}
                      className="bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email"
                      value={rfqEmail}
                      onChange={e => setRfqEmail(e.target.value)}
                      className="bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp"
                      value={rfqPhone}
                      onChange={e => setRfqPhone(e.target.value)}
                      className="bg-[#111316] border border-[#333538] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-sm font-bold rounded shadow transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Generate CU-30 Specification Ticket
                  </button>
                </form>
              )}
            </div>

            {/* Technical Downloads Panel */}
            <div className="bg-[#1a1c1f] border border-[#333538] rounded-md p-5 space-y-3">
              <h4 className="font-headline-sm text-sm uppercase text-white font-bold tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[18px]">cloud_download</span>
                Technical Documentation &amp; CAD
              </h4>
              <div className="space-y-2 font-mono text-xs">
                <button
                  onClick={onOpenCad}
                  className="w-full p-2.5 bg-[#111316] hover:bg-[#282a2d] border border-[#333538] hover:border-[#ff6a1a] rounded flex items-center justify-between transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#38bdf8] text-[18px]">architecture</span>
                    <div>
                      <div className="text-white font-semibold">CU30-GA-001 AutoCAD DWG</div>
                      <div className="text-[10px] text-[#9299a7]">Rev 03 // 1:25 Scale</div>
                    </div>
                  </div>
                  <span className="text-[#ff6a1a] font-bold text-[11px]">VIEW CAD</span>
                </button>

                <button
                  onClick={() => onAddToast('File Download Initiated', 'CU30-STEP-3D-Model.step (14.2 MB) packaging for download.', 'success')}
                  className="w-full p-2.5 bg-[#111316] hover:bg-[#282a2d] border border-[#333538] hover:border-[#ff6a1a] rounded flex items-center justify-between transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#fabc4d] text-[18px]">deployed_code</span>
                    <div>
                      <div className="text-white font-semibold">3D SolidWorks STEP Model</div>
                      <div className="text-[10px] text-[#9299a7]">Parasolid AP214 // 14.2 MB</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#c0c7d5] text-[18px]">download</span>
                </button>

                <button
                  onClick={() => onAddToast('Brochure Downloaded', 'CU-30-Engineering-Brochure.pdf (4.8 MB) saved.', 'success')}
                  className="w-full p-2.5 bg-[#111316] hover:bg-[#282a2d] border border-[#333538] hover:border-[#ff6a1a] rounded flex items-center justify-between transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-400 text-[18px]">picture_as_pdf</span>
                    <div>
                      <div className="text-white font-semibold">Technical PDF Brochure</div>
                      <div className="text-[10px] text-[#9299a7]">English / Metric Units // 4.8 MB</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#c0c7d5] text-[18px]">download</span>
                </button>
              </div>
            </div>

            {/* Direct Factory Terminal Contact */}
            <div className="bg-[#1e2023] border border-[#333538] rounded-md p-4 space-y-2">
              <span className="font-label-sm text-[10px] text-[#c0c7d5] uppercase font-mono">
                WORKS APPLICATION DESK
              </span>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff6a1a] text-[20px]">phone_in_talk</span>
                <a href="tel:+911294008822" className="text-white hover:text-[#ff6a1a] font-mono font-bold text-sm">
                  +91 (0) 129 400 8822
                </a>
              </div>
              <p className="font-mono text-[11px] text-[#e2bfb2]">
                Ballabgarh Works: 09:00 – 18:00 IST (UTC+5:30)
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
