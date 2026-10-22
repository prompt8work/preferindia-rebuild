import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';

interface ContactViewProps {
  onNavigate: (view: ViewMode) => void;
  onAddToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onAddToast,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentTimeIST, setCurrentTimeIST] = useState<string>('');

  // Step 1: Equipment & Load
  const [equipmentType, setEquipmentType] = useState('Motorized Coil Tong');
  const [swl, setSwl] = useState<number>(35);
  const [femClass, setFemClass] = useState('FEM Class 4 / BTH-1 Design Cat B');

  // Step 2: Environment & CAD
  const [millBay, setMillBay] = useState('Hot Strip Mill (HSM)');
  const [heatEnvelope, setHeatEnvelope] = useState('Radiant 120°C – 600°C');
  const [hookStandard, setHookStandard] = useState('DIN 15402 Ramshorn Double Hook');
  const [maxHeadroom, setMaxHeadroom] = useState('Standard (2,400mm)');
  const [attachedFileName, setAttachedFileName] = useState<string>('');

  // Step 3: Mill Facility & Contact
  const [engineerName, setEngineerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeline, setTimeline] = useState('Next Quarter Deployment');
  const [voltage, setVoltage] = useState('415V / 3-Phase / 50Hz');
  const [specialNotes, setSpecialNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTimeIST(new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAttachedFileName(file.name);
      onAddToast('File Attached', `${file.name} queued for engineering package.`, 'info');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = 'RFQ-WORKS-' + Math.floor(10000 + Math.random() * 90000);
    setTicketId(generated);
    setSubmitted(true);
    onAddToast(
      'Engineering Specification Transmitted',
      `Ticket #${generated} logged at Ballabgarh Works. Priority evaluation assigned to Senior Mill Rigging Team.`,
      'success'
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Telemetry Bar / Status Anchor */}
      <section className="w-full bg-[#0c0e11] border-b border-[#333538] px-4 md:px-8 lg:px-12 py-2">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#e2bfb2]">
          <div className="flex items-center gap-2 uppercase tracking-wider">
            <button onClick={() => onNavigate('home')} className="hover:text-[#ff6a1a] transition-colors cursor-pointer">
              HOME
            </button>
            <span className="text-[#5a4137]">/</span>
            <span className="text-white font-semibold">RFQ ENGINE &amp; DIRECT MILL DESK</span>
            <span className="text-[#5a4137]">/</span>
            <span className="text-[#ff6a1a]">SYS-ROUTE: SEC-25-RFQ</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#1a1c1f] px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-[#ff6a1a] animate-pulse" />
              <span className="text-white tracking-widest font-semibold uppercase">RFQ ENGINE ACTIVE</span>
            </div>
            <span className="text-[#fabc4d] tracking-widest uppercase hidden sm:inline-block">
              SLA: 4-HOUR FEASIBILITY GUARANTEE
            </span>
            <span className="text-emerald-400 hidden lg:inline-block">
              {currentTimeIST}
            </span>
          </div>
        </div>
      </section>

      {/* Main Blueprint Workspace */}
      <section className="w-full bg-[#111316] relative overflow-hidden py-10 lg:py-16 px-4 md:px-8 lg:px-12">
        {/* CAD Blueprint Grid SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contactGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffb597" strokeWidth="0.75" />
                <circle cx="0" cy="0" r="1.5" fill="#ff6a1a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contactGrid)" />
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: PLANT HEADQUARTERS & TELEMETRY (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Heading Box */}
              <div className="bg-[#1a1c1f] p-6 rounded border border-[#333538] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ff6a1a]" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#ff6a1a] tracking-widest uppercase font-bold">
                    SITE.REF // BLB-IN-01
                  </span>
                  <span className="font-mono text-[10px] bg-[#282a2d] text-[#fabc4d] px-2 py-0.5 rounded uppercase">
                    HEAVY BAY ACTIVE
                  </span>
                </div>
                <h1 className="font-headline-lg text-2xl uppercase tracking-wider text-[#e2e2e6] font-bold leading-tight">
                  Prefer India Heavy Works &amp; Engineering
                </h1>
                <p className="font-body-md text-xs sm:text-sm text-[#e2bfb2] mt-2 leading-relaxed">
                  Ballabgarh heavy fabrication facility, regional metallurgical application engineering nodes, and tier-1 24/7 continuous casting breakdown response.
                </p>
              </div>

              {/* Geodetic Coordinates & Facility Telemetry */}
              <div className="bg-[#1a1c1f] p-5 rounded border border-[#333538] space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-[#333538] pb-2 text-xs">
                  <span className="uppercase tracking-wider text-[#c0c7d5] flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[16px] text-[#ff6a1a]">location_searching</span>
                    GEODETIC SITE SPECIFICATIONS
                  </span>
                  <span className="text-[#9299a7]">DATUM: WGS-84</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="text-[#9299a7] text-[10px] block">LATITUDE / LONGITUDE</span>
                    <span className="text-white font-bold">28.3412° N, 77.3197° E</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="text-[#9299a7] text-[10px] block">AMSL ELEVATION</span>
                    <span className="text-white font-bold">212.4 METERS</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="text-[#9299a7] text-[10px] block">HEAVY FAB BAY</span>
                    <span className="text-white font-bold">45,000 SQ. FT</span>
                  </div>
                  <div className="bg-[#111316] p-2.5 rounded border border-[#333538]">
                    <span className="text-[#9299a7] text-[10px] block">CRANE TEST RIG</span>
                    <span className="text-[#fabc4d] font-bold">100 MT EOT TANDEM</span>
                  </div>
                </div>

                <div className="p-2.5 bg-[#111316] rounded border border-[#333538] text-xs text-[#e2bfb2]">
                  <span className="text-[#ff6a1a] uppercase text-[10px] block font-bold">POSTAL DISPATCH HUB:</span>
                  Plot 48, Sector 25, Ballabgarh Industrial Area, Faridabad, Haryana 121004, India
                </div>
              </div>

              {/* Direct Communication Channels / Hardware Terminal Nodes */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#c0c7d5] flex items-center gap-1.5 px-1 font-bold">
                  <span className="w-1.5 h-1.5 bg-[#fabc4d] rounded-full" />
                  DIRECT COMMUNICATION TERMINALS
                </div>

                {/* Primary Hotline */}
                <div className="p-3 bg-[#1a1c1f] hover:bg-[#1e2023] border border-[#333538] rounded flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#111316] flex items-center justify-center text-[#ff6a1a] group-hover:bg-[#ff6a1a] group-hover:text-[#591e00] transition-colors">
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#c0c7d5] uppercase">PLANT PRIMARY SWITCHBOARD</div>
                      <div className="font-mono text-sm text-white font-bold group-hover:text-[#ff6a1a] transition-colors">
                        +91 (0) 129 400 8820 / 8822
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] bg-[#111316] text-[#c0c7d5] px-2 py-0.5 rounded">EXT 104</span>
                </div>

                {/* 24/7 Mill Breakdown Hotline */}
                <div className="p-3 bg-[#1a1c1f] hover:bg-[#1e2023] border border-red-900/60 rounded flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-red-950/60 flex items-center justify-center text-red-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-[20px]">emergency</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-red-400 uppercase flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        24/7 MILL BREAKDOWN HOTLINE
                      </div>
                      <div className="font-mono text-sm text-white font-bold group-hover:text-red-400 transition-colors">
                        +91 98110 54321
                      </div>
                    </div>
                  </div>
                  <a
                    href="tel:+919811054321"
                    className="font-mono text-[10px] text-red-400 bg-red-950/80 px-2.5 py-1 rounded hover:bg-red-600 hover:text-white uppercase transition-colors"
                  >
                    CALL NOW
                  </a>
                </div>

                {/* Email Desks */}
                <div className="p-3 bg-[#1a1c1f] hover:bg-[#1e2023] border border-[#333538] rounded flex items-center justify-between group transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#111316] flex items-center justify-center text-[#fabc4d] group-hover:bg-[#fabc4d] group-hover:text-black transition-colors">
                      <span className="material-symbols-outlined text-[20px]">terminal</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#c0c7d5] uppercase">APPLICATION &amp; DRAWINGS DESK</div>
                      <div className="font-mono text-xs text-white">rfq@preferindia.com • drawings@preferindia.com</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified_user</span>
                </div>

                {/* WhatsApp Direct Link */}
                <a
                  href="https://wa.me/919811054321?text=Prefer%20India%20Engineering%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800/40 rounded flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-emerald-900/60 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-emerald-400 uppercase font-bold">
                        WHATSAPP APPLICATION ENGINEER
                      </div>
                      <div className="font-body-sm text-xs text-white">Instant GA Review &amp; Direct CAD Exchange</div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-emerald-400 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>

              {/* Manufacturing Quality Accreditations Bar */}
              <div className="bg-[#1a1c1f] p-4 rounded border border-[#333538] space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-[#c0c7d5] flex items-center justify-between">
                  <span>MANUFACTURING QUALITY ACCREDITATIONS</span>
                  <span className="text-[#fabc4d]">QA LEVEL IV</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                  <div className="p-2 bg-[#111316] rounded border border-[#333538]">
                    <span className="text-xs text-white block font-bold">ISO 9001</span>
                    <span className="text-[10px] text-[#9299a7]">2015 Spec</span>
                  </div>
                  <div className="p-2 bg-[#111316] rounded border border-[#333538]">
                    <span className="text-xs text-white block font-bold">ASME</span>
                    <span className="text-[10px] text-[#9299a7]">B30.20 &amp; BTH</span>
                  </div>
                  <div className="p-2 bg-[#111316] rounded border border-[#333538]">
                    <span className="text-xs text-white block font-bold">AWS D1.1</span>
                    <span className="text-[10px] text-[#9299a7]">NDT Level II/III</span>
                  </div>
                  <div className="p-2 bg-[#111316] rounded border border-[#333538]">
                    <span className="text-xs text-white block font-bold">CE / EN</span>
                    <span className="text-[10px] text-[#9299a7]">Machinery Dir</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 3-STEP MULTI-STEP ENGINEERING RFQ CONSOLE (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-[#1a1c1f] p-6 md:p-8 rounded border border-[#333538] shadow-2xl relative overflow-hidden space-y-6">
                {/* Orange top accent border line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6a1a]" />

                {/* Terminal Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#333538]">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#ff6a1a] font-bold">
                      INTERACTIVE CAD &amp; COMMERCIAL INQUIRY
                    </span>
                    <h2 className="font-headline-xl text-xl sm:text-2xl text-white uppercase tracking-wide font-bold mt-1">
                      REQUEST FORMAL GA DRAWING &amp; RFQ
                    </h2>
                  </div>
                  <div className="bg-[#111316] px-3 py-1 rounded border border-[#333538] flex items-center gap-1.5 self-start sm:self-auto font-mono text-xs">
                    <span className="material-symbols-outlined text-[#fabc4d] text-[16px]">security</span>
                    <span className="text-white">NDA SECURED</span>
                  </div>
                </div>

                {/* Stepper Progress Tracker */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={`p-2.5 rounded flex flex-col items-start transition-all text-left font-mono cursor-pointer ${
                      currentStep === 1
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow'
                        : 'bg-[#111316] text-[#e2bfb2] hover:bg-[#282a2d]'
                    }`}
                  >
                    <span className="text-[10px] uppercase block">STEP 01</span>
                    <span className="text-xs uppercase font-bold truncate">EQUIPMENT &amp; LOAD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className={`p-2.5 rounded flex flex-col items-start transition-all text-left font-mono cursor-pointer ${
                      currentStep === 2
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow'
                        : 'bg-[#111316] text-[#e2bfb2] hover:bg-[#282a2d]'
                    }`}
                  >
                    <span className="text-[10px] uppercase block">STEP 02</span>
                    <span className="text-xs uppercase font-bold truncate">ENVIRONMENT &amp; CAD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className={`p-2.5 rounded flex flex-col items-start transition-all text-left font-mono cursor-pointer ${
                      currentStep === 3
                        ? 'bg-[#ff6a1a] text-[#591e00] font-bold shadow'
                        : 'bg-[#111316] text-[#e2bfb2] hover:bg-[#282a2d]'
                    }`}
                  >
                    <span className="text-[10px] uppercase block">STEP 03</span>
                    <span className="text-xs uppercase font-bold truncate">MILL FACILITY &amp; SLA</span>
                  </button>
                </div>

                {submitted ? (
                  <div className="p-8 bg-[#111316] border border-emerald-500/50 rounded text-center space-y-4">
                    <span className="material-symbols-outlined text-emerald-400 text-[56px]">verified</span>
                    <h3 className="font-headline-sm text-2xl text-white uppercase font-bold">
                      Specification Ticket #{ticketId} Generated
                    </h3>
                    <p className="font-body-md text-sm text-[#e2bfb2] max-w-lg mx-auto">
                      Thank you, <strong className="text-white">{engineerName}</strong>. Your mill load parameters for{' '}
                      <strong className="text-[#ff6a1a]">{equipmentType} ({swl} MT)</strong> have been routed directly to the Chief Application Engineer at Ballabgarh Works.
                    </p>
                    <div className="p-4 bg-[#1a1c1f] rounded border border-[#333538] max-w-md mx-auto text-left font-mono text-xs space-y-1 text-[#c0c7d5]">
                      <div>Enterprise: <span className="text-white font-bold">{companyName}</span></div>
                      <div>Contact Email: <span className="text-white font-bold">{email}</span></div>
                      <div>Target Bay: <span className="text-[#fabc4d] font-bold">{millBay} ({heatEnvelope})</span></div>
                      <div>Target Voltage: <span className="text-white font-bold">{voltage}</span></div>
                      {attachedFileName && <div>Runway Drawing: <span className="text-emerald-400 font-bold">{attachedFileName}</span></div>}
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                      }}
                      className="px-6 py-2.5 bg-[#282a2d] hover:bg-[#333538] text-white text-xs font-mono uppercase rounded cursor-pointer"
                    >
                      Configure Another Rig Specification
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* STEP 1: EQUIPMENT ENVELOPE */}
                    {currentStep === 1 && (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-[#ff6a1a]" />
                          <h3 className="font-headline-sm text-base uppercase text-white tracking-wider font-bold">
                            Select Equipment Rig Architecture
                          </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            { name: 'Motorized Coil Tong', icon: 'tune', desc: 'Horiz / Vert Eye' },
                            { name: 'Automatic Slab Tong', icon: 'hardware', desc: 'Scissor Action' },
                            { name: 'Heavy Transfer Car', icon: 'train', desc: 'Self-Propelled Mill' },
                            { name: 'Counterweighted C-Hook', icon: 'anchor', desc: 'Balanced Pick' },
                            { name: 'Sheet Pack Lifter', icon: 'layers', desc: 'Rack & Pinion' },
                            { name: 'Coil Upender / Tilter', icon: 'rotate_90_degrees_cw', desc: '90° Inversion Table' },
                          ].map(item => (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setEquipmentType(item.name)}
                              className={`p-3 rounded text-center transition-all cursor-pointer border ${
                                equipmentType === item.name
                                  ? 'bg-[#ff6a1a] text-[#591e00] border-[#ff6a1a] font-bold shadow'
                                  : 'bg-[#111316] text-[#e2e2e6] border-[#333538] hover:border-[#ff6a1a]/60'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[24px] block mb-1">
                                {item.icon}
                              </span>
                              <span className="font-mono text-xs uppercase block font-semibold leading-tight">
                                {item.name}
                              </span>
                              <span className="font-mono text-[9px] opacity-80 block pt-0.5">
                                {item.desc}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* SWL Slider & Numeric Input */}
                        <div className="bg-[#111316] p-4 rounded border border-[#333538] space-y-3 font-mono">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xs uppercase tracking-wider text-[#c0c7d5] font-bold block">
                                SAFE WORKING LOAD (SWL) PARAMETER
                              </span>
                              <span className="text-[11px] text-[#9299a7]">
                                Continuous certified payload requirement:
                              </span>
                            </div>
                            <div className="flex items-center gap-1 bg-[#1a1c1f] px-3 py-1 rounded border border-[#333538]">
                              <input
                                type="number"
                                min="4"
                                max="150"
                                value={swl}
                                onChange={e => setSwl(Number(e.target.value))}
                                className="w-14 bg-transparent text-right font-headline-md text-lg text-[#fabc4d] focus:outline-none font-bold"
                              />
                              <span className="font-headline-sm text-sm text-white font-bold">MT</span>
                            </div>
                          </div>

                          <input
                            type="range"
                            min="4"
                            max="120"
                            step="1"
                            value={swl}
                            onChange={e => setSwl(Number(e.target.value))}
                            className="w-full h-1.5 bg-[#333538] accent-[#ff6a1a] cursor-pointer"
                          />

                          <div className="flex justify-between text-[10px] text-[#9299a7]">
                            <span>4 MT (Light)</span>
                            <span>30 MT (Standard Mill)</span>
                            <span>60 MT (Heavy Caster)</span>
                            <span>120 MT (Extreme)</span>
                          </div>
                        </div>

                        {/* FEM Duty Class Selection */}
                        <div className="space-y-1 font-mono text-xs">
                          <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                            FEM Standard / Service Duty Cycle
                          </label>
                          <select
                            value={femClass}
                            onChange={e => setFemClass(e.target.value)}
                            className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                          >
                            <option>FEM Class 4 / BTH-1 Design Cat B (24/7 Heavy Continuous Mill)</option>
                            <option>FEM Class 3 / BTH-1 Design Cat B (Heavy Regular Rolling)</option>
                            <option>FEM Class 2 / BTH-1 Design Cat A (Intermittent Warehouse)</option>
                            <option>FEM Class 1 / BTH-1 Design Cat A (Light Maintenance)</option>
                          </select>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-6 py-2.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-sm font-bold rounded shadow cursor-pointer flex items-center gap-1.5"
                          >
                            Proceed to Step 02: Environment &amp; CAD
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: ENVIRONMENT & CAD */}
                    {currentStep === 2 && (
                      <div className="space-y-4 animate-in fade-in duration-300 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-[#ff6a1a]" />
                          <h3 className="font-headline-sm text-base uppercase text-white tracking-wider font-bold">
                            Operating Environment &amp; Hook Interface
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Operational Mill Bay
                            </label>
                            <select
                              value={millBay}
                              onChange={e => setMillBay(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>Hot Strip Mill (HSM)</option>
                              <option>Cold Rolling Mill (CRM)</option>
                              <option>Continuous Casting Runout (CCM)</option>
                              <option>Pickling &amp; Acid Galvanizing Line</option>
                              <option>Slitting &amp; Cut-to-Length Center</option>
                              <option>Blast Furnace Ingot / Billet Yard</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Heat Envelope &amp; Thermal Shielding
                            </label>
                            <select
                              value={heatEnvelope}
                              onChange={e => setHeatEnvelope(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>Ambient (Up to 120°C)</option>
                              <option>Radiant 120°C – 600°C (Ceramic Baffles)</option>
                              <option>Severe Continuous 950°C (Red-Hot Slab Pack)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Crane Hook Standard Interface
                            </label>
                            <select
                              value={hookStandard}
                              onChange={e => setHookStandard(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>DIN 15402 Ramshorn Double Hook</option>
                              <option>DIN 15401 Single Crane Hook</option>
                              <option>Custom Pin Bail Connection</option>
                              <option>Tandem Dual Hoist Equalizer Beam</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Max Allowable Headroom
                            </label>
                            <select
                              value={maxHeadroom}
                              onChange={e => setMaxHeadroom(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>Standard (2,400mm clearance)</option>
                              <option>Low Headroom Compact (&lt; 1,800mm)</option>
                              <option>Ultra-Low Headroom Telescopic</option>
                              <option>Unrestricted Runway Clearance</option>
                            </select>
                          </div>
                        </div>

                        {/* File Upload Box */}
                        <div className="p-4 bg-[#111316] rounded border border-dashed border-[#333538] space-y-2 text-center">
                          <span className="material-symbols-outlined text-[#ff6a1a] text-[32px]">upload_file</span>
                          <div className="text-white font-semibold">Upload Mill Runway Drawing or Coil Specs (Optional)</div>
                          <div className="text-[#9299a7] text-[11px]">Accepts PDF, DWG, DXF, STP, PNG (Up to 25 MB)</div>
                          <input
                            type="file"
                            onChange={handleFileUpload}
                            className="text-xs text-[#c0c7d5] file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-mono file:bg-[#282a2d] file:text-white hover:file:bg-[#333538] cursor-pointer"
                          />
                          {attachedFileName && (
                            <div className="text-emerald-400 text-xs font-bold pt-1">
                              ✓ Attached: {attachedFileName}
                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex justify-between">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="px-4 py-2 bg-[#111316] hover:bg-[#282a2d] text-white border border-[#333538] rounded cursor-pointer"
                          >
                            ← Back to Step 01
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="px-6 py-2.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-sm font-bold rounded shadow cursor-pointer flex items-center gap-1.5"
                          >
                            Proceed to Step 03: Mill Facility &amp; SLA
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: MILL FACILITY & SLA */}
                    {currentStep === 3 && (
                      <div className="space-y-4 animate-in fade-in duration-300 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-3 bg-[#ff6a1a]" />
                          <h3 className="font-headline-sm text-base uppercase text-white tracking-wider font-bold">
                            Enterprise Facility &amp; Project Coordinates
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Lead Plant Engineer Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Vikramaditya Sen"
                              value={engineerName}
                              onChange={e => setEngineerName(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Steel Mill Enterprise / Plant Location *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. JSW Steel Vijayanagar Works"
                              value={companyName}
                              onChange={e => setCompanyName(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Corporate Engineer Email *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="v.sen@jsw.in"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Direct Telephone / WhatsApp *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 98110 00000"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Plant Voltage Supply
                            </label>
                            <select
                              value={voltage}
                              onChange={e => setVoltage(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>415V / 3-Phase / 50Hz (India Standard)</option>
                              <option>480V / 3-Phase / 60Hz (North America)</option>
                              <option>380V / 3-Phase / 50Hz (SE Asia / Middle East)</option>
                              <option>690V / 3-Phase Heavy Industrial</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                              Commissioning Target Timeline
                            </label>
                            <select
                              value={timeline}
                              onChange={e => setTimeline(e.target.value)}
                              className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                            >
                              <option>Immediate Shutdown (Urgent 4-6 Weeks)</option>
                              <option>Next Quarter Deployment (8-12 Weeks)</option>
                              <option>Planned Annual Turnaround</option>
                              <option>Budgetary Greenfield Planning</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[#c0c7d5] uppercase font-bold text-[11px]">
                            Special Mill Constraints or Observations
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g. Existing crane runway rail span 28.5m, crane hook #28 DIN 15402, required motorized 360 slew with laser eye centering..."
                            value={specialNotes}
                            onChange={e => setSpecialNotes(e.target.value)}
                            className="w-full bg-[#111316] border border-[#333538] rounded px-3 py-2 text-white focus:outline-none"
                          />
                        </div>

                        {/* Summary of Configuration */}
                        <div className="p-3 bg-[#111316] rounded border border-[#333538] flex flex-wrap items-center justify-between text-[11px] text-[#e2bfb2]">
                          <span>Configuration: <strong className="text-white">{equipmentType}</strong> ({swl} MT)</span>
                          <span>Duty: <strong className="text-[#fabc4d]">{femClass.split('/')[0]}</strong></span>
                          <span>Target Bay: <strong className="text-[#ff6a1a]">{millBay}</strong></span>
                        </div>

                        <div className="pt-2 flex justify-between items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="px-4 py-2 bg-[#111316] hover:bg-[#282a2d] text-white border border-[#333538] rounded cursor-pointer"
                          >
                            ← Back to Step 02
                          </button>

                          <button
                            type="submit"
                            className="px-8 py-3 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase tracking-wider text-base font-bold rounded shadow-xl cursor-pointer flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[20px]">send</span>
                            Transmit Specification Ticket to Engineering
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
