import React from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
  onOpenDoc: (docName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDoc }) => {
  return (
    <footer className="w-full bg-[#0c0e11] border-t border-[#333538] text-[#e2e2e6]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-[#333538]">
          {/* Col 1: Identity & Plant Telemetry */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-headline-md text-headline-md text-[#e2e2e6] uppercase tracking-wider font-bold">
                Prefer India
              </span>
              <span className="bg-[#bd8718]/20 text-[#fabc4d] border border-[#bd8718] px-2 py-0.5 rounded font-label-sm text-label-sm font-semibold">
                EST. 1968
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#e2bfb2] leading-relaxed">
              Engineered custom heavy-duty material handling equipment from 4 MT to 120 MT since 1968. Precision metallurgy tooling, high-integrity structural fixtures, and plant safety engineering for tier-1 steel mills worldwide.
            </p>
            <div className="pt-2 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a1a] animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-[#e2e2e6] tracking-wider uppercase font-mono font-medium">
                BALLABGARH PLANT OPERATIONAL
              </span>
            </div>
          </div>

          {/* Col 2: Equipment Lines */}
          <div className="space-y-4">
            <h3 className="font-headline-sm text-headline-sm uppercase text-[#e2e2e6] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#ff6a1a]"></span>
              Equipment Lines
            </h3>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 text-[#e2bfb2] hover:text-[#ffb597] transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">chevron_right</span>
                  Motorized Coil Lifters (Horizontal / Vertical)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 text-[#e2bfb2] hover:text-[#ffb597] transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">chevron_right</span>
                  Automatic Slab Tongs &amp; Billet Grabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 text-[#e2bfb2] hover:text-[#ffb597] transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">chevron_right</span>
                  Sheet Pack &amp; Ingot Handling Lifters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="flex items-center gap-2 text-[#e2bfb2] hover:text-[#ffb597] transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">chevron_right</span>
                  Heavy Mill Transfer Cars (Up to 120 MT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('product-detail')}
                  className="flex items-center gap-2 text-[#e2bfb2] hover:text-[#ffb597] transition-colors text-left cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#ff6a1a]">chevron_right</span>
                  Industrial Vacuum Lifters &amp; C-Hooks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Documentation */}
          <div className="space-y-4">
            <h3 className="font-headline-sm text-headline-sm uppercase text-[#e2e2e6] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#fabc4d]"></span>
              Technical Documentation
            </h3>
            <p className="font-body-sm text-body-sm text-[#e2bfb2]">
              Direct certified engineering schematics and QA compliance sheets.
            </p>
            <div className="space-y-2.5">
              <div
                onClick={() => onOpenDoc('Product Catalog 2024 (PDF • 18.4 MB)')}
                className="flex items-center justify-between p-2.5 bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] transition-all group rounded cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ff6a1a] text-[20px]">description</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-[#e2e2e6] uppercase group-hover:text-[#ffb597] transition-colors font-semibold">
                      Product Catalog 2024
                    </div>
                    <div className="font-label-sm text-[10px] text-[#9299a7] font-mono">PDF • 18.4 MB</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9299a7] group-hover:text-[#ff6a1a] text-[18px]">download</span>
              </div>

              <div
                onClick={() => onOpenDoc('ISO 9001:2015 Spec Sheet (PDF • 2.1 MB)')}
                className="flex items-center justify-between p-2.5 bg-[#1a1c1f] border border-[#333538] hover:border-[#ff6a1a] transition-all group rounded cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#fabc4d] text-[20px]">verified</span>
                  <div>
                    <div className="font-label-sm text-label-sm text-[#e2e2e6] uppercase group-hover:text-[#ffb597] transition-colors font-semibold">
                      ISO 9001:2015 Spec Sheet
                    </div>
                    <div className="font-label-sm text-[10px] text-[#9299a7] font-mono">PDF • 2.1 MB</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9299a7] group-hover:text-[#ff6a1a] text-[18px]">download</span>
              </div>
            </div>
          </div>

          {/* Col 4: Plant & Headquarters */}
          <div className="space-y-4">
            <h3 className="font-headline-sm text-headline-sm uppercase text-[#e2e2e6] tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#ffb597]"></span>
              Plant &amp; Headquarters
            </h3>
            <div className="font-body-sm text-body-sm text-[#e2bfb2] space-y-1">
              <p className="text-[#e2e2e6] font-semibold">Prefer India Works Facility</p>
              <p>Plot 48, Sector 25, Ballabgarh Industrial Zone</p>
              <p>Faridabad, Haryana 121004, India</p>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[#ffb4ab] text-[16px]">warning</span>
                <span className="text-[#9299a7] uppercase">Emergency Plant Line:</span>
                <a className="text-[#ffb4ab] hover:underline font-mono font-bold" href="tel:+911294008820">
                  +91 129 400 8820
                </a>
              </div>
              <a
                className="inline-flex items-center gap-2 bg-[#1e2023] border border-[#333538] hover:border-[#fabc4d] px-3 py-1.5 rounded transition-all text-[#e2e2e6] hover:text-[#fabc4d] font-label-sm text-label-sm uppercase tracking-wider"
                href="https://wa.me/911294008822"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px] text-[#fabc4d]">chat</span>
                Instant WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Spec Tags */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-body-sm text-body-sm text-[#9299a7]">
              © {new Date().getFullYear()} Prefer India. All rights reserved. Heavy Material Handling Division.
            </span>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm text-[#9299a7] font-mono">
            <span className="px-2 py-0.5 bg-[#1e2023] border border-[#333538] text-[#c0c7d5] rounded uppercase tracking-wider">
              SPEC: ISO 9001-CERTIFIED
            </span>
            <span className="px-2 py-0.5 bg-[#1e2023] border border-[#333538] text-[#c0c7d5] rounded uppercase tracking-wider">
              BUILD: V4.1.0-STABLE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
