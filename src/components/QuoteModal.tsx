import React, { useState } from 'react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
  onSuccess: (ticketId: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  onSuccess,
}) => {
  const [equipmentCategory, setEquipmentCategory] = useState(
    preselectedProduct || 'Motorized Coil Lifter'
  );
  const [swl, setSwl] = useState(30);
  const [engineerName, setEngineerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedTicket = 'RFQ-2024-' + Math.floor(1000 + Math.random() * 9000);
    setTicketId(generatedTicket);
    setSubmitted(true);
    onSuccess(generatedTicket);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#1a1c1f] border-2 border-[#ff6a1a]/60 rounded shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#1e2023] px-6 py-4 border-b border-[#333538] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 bg-[#ff6a1a] rounded-sm"></span>
            <div>
              <span className="font-label-sm text-[10px] text-[#ff6a1a] uppercase font-mono tracking-widest block">
                DIRECT MILL RFQ CONSOLE
              </span>
              <h2 className="font-headline-sm text-headline-sm uppercase text-[#e2e2e6] tracking-wider leading-none">
                Request Engineering GA &amp; Quote
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#111316] hover:bg-[#333538] text-[#e2e2e6] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#ff6a1a]/20 border-2 border-[#ff6a1a] mx-auto flex items-center justify-center text-[#ff6a1a]">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-[#fabc4d] font-mono tracking-widest uppercase block">
                  TRANSMISSION CONFIRMED // 4-HOUR SLA ACTIVE
                </span>
                <h3 className="font-headline-lg text-headline-lg uppercase text-[#e2e2e6] tracking-wide mt-1">
                  RFQ TICKET #{ticketId}
                </h3>
                <p className="font-body-sm text-body-sm text-[#e2bfb2] max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-[#e2e2e6]">{engineerName || 'Engineer'}</strong>. Your application specifications for <strong className="text-[#ff6a1a]">{equipmentCategory} ({swl} MT)</strong> have been routed directly to our Senior Design Engineers at Ballabgarh Works.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-[#ff6a1a] text-[#591e00] font-headline-sm uppercase tracking-wider rounded font-bold transition-all shadow cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#111316] rounded border border-[#333538] text-body-sm text-[#e2bfb2]">
                <span className="text-[#fabc4d] font-semibold">ENGINEERING SLA:</span> Receive a customized CAD General Arrangement (GA) drawing and calibrated commercial proposal within 4 operating hours.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Equipment Category *
                  </label>
                  <select
                    value={equipmentCategory}
                    onChange={(e) => setEquipmentCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-label-md text-sm rounded cursor-pointer"
                  >
                    <option value="Motorized Coil Lifter">Motorized Coil Lifter</option>
                    <option value="30 MT Coil Upender Tilter">30 MT Coil Upender Tilter</option>
                    <option value="Heavy Slab Tong">Automatic Heavy Slab Tong</option>
                    <option value="Ingot & Billet Tong">Ingot &amp; Billet Tong</option>
                    <option value="Rail Coil Transfer Car">Rail Coil Transfer Car</option>
                    <option value="Sheet Pack Lifter">Sheet Pack Lifter</option>
                    <option value="Mechanical C-Hook">Mechanical C-Hook</option>
                    <option value="Vacuum Sheet Lifter">Vacuum Plate Lifter</option>
                    <option value="De-bricking & Furnace Rig">Blast Furnace De-bricking Rig</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Required SWL [Tonnes] *
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="180"
                    value={swl}
                    onChange={(e) => setSwl(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-mono text-sm rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Engineer / Lead Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Bhattacharya"
                    value={engineerName}
                    onChange={(e) => setEngineerName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-label-md text-sm rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Steel Mill / Plant Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tata Steel / JSW Vijayanagar"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-label-md text-sm rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="engineer@steelmill.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-label-md text-sm rounded"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm uppercase text-[#e2bfb2]">
                    Direct Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#111316] border border-[#333538] focus:border-[#ff6a1a] focus:outline-none text-[#e2e2e6] font-label-md text-sm rounded"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#333538] flex items-center justify-between">
                <a
                  href="https://wa.me/911294008822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#fabc4d] hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  Instant WhatsApp Desk
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#ff6a1a] hover:bg-[#ff843d] text-[#591e00] px-5 py-2.5 rounded font-headline-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_16px_rgba(255,106,26,0.35)] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Submit RFQ
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
