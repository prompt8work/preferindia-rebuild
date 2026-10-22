import React, { useState } from 'react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: ViewMode) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#111316]/95 backdrop-blur-md border-b border-[#333538]">
        <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 shrink-0 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#ff6a1a] shadow-inner group-hover:border-[#ff6a1a] transition-colors">
              <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
            </div>
            <div className="flex flex-col border-l border-[#333538] pl-3">
              <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-[#e2e2e6] leading-none group-hover:text-[#ff6a1a] transition-colors">
                Prefer India
              </span>
              <span className="font-label-sm text-label-sm text-[#e2bfb2] uppercase tracking-widest text-[10px] pt-0.5">
                Heavy Mill Cranes &amp; Lifters
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 h-full font-label-md text-label-md uppercase tracking-wider">
            <button
              onClick={() => handleNav('home')}
              className={`h-full flex items-center transition-colors border-b-2 px-1 cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#ff6a1a] border-[#ff6a1a] font-semibold'
                  : 'text-[#e2bfb2] hover:text-[#e2e2e6] border-transparent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('products')}
              className={`h-full flex items-center transition-colors border-b-2 px-1 cursor-pointer ${
                currentView === 'products'
                  ? 'text-[#ff6a1a] border-[#ff6a1a] font-semibold'
                  : 'text-[#e2bfb2] hover:text-[#e2e2e6] border-transparent'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => handleNav('product-detail')}
              className={`h-full flex items-center transition-colors border-b-2 px-1 cursor-pointer ${
                currentView === 'product-detail'
                  ? 'text-[#ff6a1a] border-[#ff6a1a] font-semibold'
                  : 'text-[#e2bfb2] hover:text-[#e2e2e6] border-transparent'
              }`}
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fabc4d]"></span>
                30 MT Upender
              </span>
            </button>
            <button
              onClick={() => handleNav('videos')}
              className={`h-full flex items-center transition-colors border-b-2 px-1 cursor-pointer ${
                currentView === 'videos'
                  ? 'text-[#ff6a1a] border-[#ff6a1a] font-semibold'
                  : 'text-[#e2bfb2] hover:text-[#e2e2e6] border-transparent'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => {
                if (currentView !== 'home') {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('clientele-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                } else {
                  document.getElementById('clientele-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="h-full flex items-center text-[#e2bfb2] hover:text-[#e2e2e6] transition-colors border-b-2 border-transparent px-1 cursor-pointer"
            >
              Clientele
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={`h-full flex items-center transition-colors border-b-2 px-1 cursor-pointer ${
                currentView === 'contact'
                  ? 'text-[#ff6a1a] border-[#ff6a1a] font-semibold'
                  : 'text-[#e2bfb2] hover:text-[#e2e2e6] border-transparent'
              }`}
            >
              Contact &amp; RFQ
            </button>
          </nav>

          {/* Action Row */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Phone */}
            <a
              href="tel:+911294008822"
              className="hidden sm:flex items-center gap-2 bg-[#1e2023] border border-[#333538] hover:border-[#fabc4d] px-3 py-1.5 rounded transition-colors group"
            >
              <span className="material-symbols-outlined text-[#fabc4d] text-[16px]">call</span>
              <span className="font-label-sm text-label-sm text-[#e2e2e6] group-hover:text-[#ffb597] transition-colors tracking-wider font-mono">
                +91 (0) 129 400 8822
              </span>
            </a>

            {/* Quote Action */}
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-1.5 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] px-4 py-2 rounded font-headline-sm text-headline-sm uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(255,106,26,0.35)] cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">request_quote</span>
              <span>Get a Quote</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 rounded bg-[#1e2023] border border-[#333538] flex items-center justify-center text-[#e2e2e6] hover:text-[#ff6a1a] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer Menu */}
          <div className="fixed top-20 right-0 w-80 max-w-[85vw] h-[calc(100vh-5rem)] bg-[#1e2023] border-l border-[#333538] p-6 flex flex-col justify-between overflow-y-auto z-50">
            <div className="space-y-6">
              <div className="pb-3 border-b border-[#333538]">
                <div className="font-label-sm text-label-sm text-[#ff6a1a] uppercase font-mono tracking-widest">
                  NAVIGATION DECK
                </div>
                <div className="font-headline-sm text-[#e2e2e6] uppercase">
                  Ballabgarh Engineering Division
                </div>
              </div>

              <nav className="flex flex-col gap-2 font-headline-sm text-headline-sm uppercase tracking-wider">
                <button
                  onClick={() => handleNav('home')}
                  className={`text-left p-2.5 rounded transition-colors flex items-center justify-between ${
                    currentView === 'home'
                      ? 'bg-[#ff6a1a]/15 text-[#ff6a1a] border border-[#ff6a1a]/40 font-semibold'
                      : 'text-[#e2e2e6] hover:bg-[#282a2d]'
                  }`}
                >
                  <span>Home Portal</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
                <button
                  onClick={() => handleNav('products')}
                  className={`text-left p-2.5 rounded transition-colors flex items-center justify-between ${
                    currentView === 'products'
                      ? 'bg-[#ff6a1a]/15 text-[#ff6a1a] border border-[#ff6a1a]/40 font-semibold'
                      : 'text-[#e2e2e6] hover:bg-[#282a2d]'
                  }`}
                >
                  <span>Coil Equipment Catalog</span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
                <button
                  onClick={() => handleNav('product-detail')}
                  className={`text-left p-2.5 rounded transition-colors flex items-center justify-between ${
                    currentView === 'product-detail'
                      ? 'bg-[#ff6a1a]/15 text-[#ff6a1a] border border-[#ff6a1a]/40 font-semibold'
                      : 'text-[#e2e2e6] hover:bg-[#282a2d]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#fabc4d]"></span>
                    30 MT Upender (CU-30)
                  </span>
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
                <button
                  onClick={() => handleNav('videos')}
                  className={`text-left p-2.5 rounded transition-colors flex items-center justify-between ${
                    currentView === 'videos'
                      ? 'bg-[#ff6a1a]/15 text-[#ff6a1a] border border-[#ff6a1a]/40 font-semibold'
                      : 'text-[#e2e2e6] hover:bg-[#282a2d]'
                  }`}
                >
                  <span>Plant Videos (24 Tapes)</span>
                  <span className="material-symbols-outlined text-[18px]">videocam</span>
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className={`text-left p-2.5 rounded transition-colors flex items-center justify-between ${
                    currentView === 'contact'
                      ? 'bg-[#ff6a1a]/15 text-[#ff6a1a] border border-[#ff6a1a]/40 font-semibold'
                      : 'text-[#e2e2e6] hover:bg-[#282a2d]'
                  }`}
                >
                  <span>Contact &amp; RFQ Console</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </nav>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#333538]">
              <div className="p-3 bg-[#111316] rounded border border-[#333538] space-y-1">
                <span className="font-label-sm text-[10px] text-[#9299a7] uppercase tracking-wider block">
                  EMERGENCY PLANT HOTLINE
                </span>
                <a href="tel:+911294008820" className="font-mono text-[#ffb4ab] font-bold block text-sm">
                  +91 129 400 8820
                </a>
              </div>
              <a
                href="https://wa.me/911294008822"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#bd8718]/20 border border-[#bd8718] text-[#fabc4d] rounded font-label-md text-label-md uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp Application Desk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
