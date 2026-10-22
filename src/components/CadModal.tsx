import React, { useState } from 'react';

interface CadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDoc: (docName: string) => void;
}

export const CadModal: React.FC<CadModalProps> = ({ isOpen, onClose, onOpenDoc }) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#0d141f] border-2 border-[#38bdf8]/40 rounded shadow-2xl flex flex-col overflow-hidden">
        {/* CAD Blueprint Header */}
        <div className="bg-[#111827] px-4 py-3 border-b border-[#38bdf8]/30 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#38bdf8] text-[22px]">architecture</span>
            <div>
              <div className="font-headline-sm text-headline-sm uppercase tracking-wider text-white">
                30 MT COIL UPENDER — DWG NO: CU30-GA-001 REV 03
              </div>
              <div className="font-label-sm text-[10px] text-gray-400 font-mono">
                SCALE: 1:25 // MATERIAL: SSS3J2G3 // STATUS: APPROVED FOR FABRICATION
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
              className="px-2.5 py-1 bg-[#1e293b] hover:bg-[#334155] text-white rounded font-mono text-xs flex items-center gap-1 cursor-pointer"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_in</span>
              +
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="px-2.5 py-1 bg-[#1e293b] hover:bg-[#334155] text-white rounded font-mono text-xs flex items-center gap-1 cursor-pointer"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[16px]">zoom_out</span>
              -
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2.5 py-1 bg-[#1e293b] hover:bg-[#334155] text-white rounded font-mono text-xs cursor-pointer"
              title="Reset Zoom"
            >
              100%
            </button>

            <button
              onClick={() => onOpenDoc('CU30-GA-001 AutoCAD DWG Package.zip')}
              className="px-3 py-1 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] font-headline-sm uppercase text-xs tracking-wider rounded font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Export DWG/STEP
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded bg-[#1e293b] hover:bg-[#334155] text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
              aria-label="Close CAD viewer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Blueprint Canvas Area */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#090d16] relative select-none">
          {/* Subtle CAD grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

          <div 
            className="transition-transform duration-200 origin-center max-w-full max-h-full flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src="/assets/aistudio/Image_4_2c20ea0e.jpeg"
              alt="30 MT Coil Upender Model CU-30 Technical General Arrangement Drawing"
              className="max-w-none w-auto max-h-[75vh] object-contain border border-[#38bdf8]/30 rounded shadow-2xl"
            />
          </div>
        </div>

        {/* Bottom Technical Key Details */}
        <div className="bg-[#111827] px-4 py-2 border-t border-[#38bdf8]/20 flex flex-wrap items-center justify-between text-xs text-gray-300 font-mono">
          <div className="flex items-center gap-4">
            <span>WIDTH: 2400mm</span>
            <span>CRADLE LENGTH: 2100mm</span>
            <span>TILTING ANGLE: 90°</span>
            <span className="text-[#38bdf8]">CYLINDER: Ø160/110</span>
          </div>
          <div className="text-[#fabc4d]">
            PREFER INDIA BALLABGARH WORKS // QA DRAWING RELEASE
          </div>
        </div>
      </div>
    </div>
  );
};
