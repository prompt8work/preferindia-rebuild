/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode, VideoTape } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { CadModal } from './components/CadModal';
import { QuoteModal } from './components/QuoteModal';
import { Toast, ToastMessage } from './components/Toast';

import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { ProductDetailView } from './views/ProductDetailView';
import { VideosView } from './views/VideosView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [activeVideo, setActiveVideo] = useState<VideoTape | null>(null);
  const [isCadModalOpen, setIsCadModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotePreselectedProduct, setQuotePreselectedProduct] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVideo = (video: VideoTape) => {
    setActiveVideo(video);
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  const handleOpenCad = () => {
    setIsCadModalOpen(true);
  };

  const handleCloseCad = () => {
    setIsCadModalOpen(false);
  };

  const handleOpenQuote = (productName?: string) => {
    setQuotePreselectedProduct(productName);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteModalOpen(false);
    setQuotePreselectedProduct(undefined);
  };

  const handleOpenDoc = (docName: string) => {
    addToast('Document Download', `${docName} package prepared for download.`, 'success');
  };

  const handleQuoteSuccess = (ticketId: string) => {
    addToast('Engineering RFQ Allocated', `Ticket #${ticketId} dispatched to Ballabgarh Works.`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#111316] text-[#e2e2e6] selection:bg-[#ff6a1a] selection:text-[#591e00] flex flex-col justify-between font-sans">
      {/* Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuote()}
      />

      {/* Main View Area */}
      <main className="w-full pt-20 flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenVideo={handleOpenVideo}
            onOpenCad={handleOpenCad}
            onOpenQuote={handleOpenQuote}
            onAddToast={addToast}
          />
        )}

        {currentView === 'products' && (
          <CategoryView
            onNavigate={handleNavigate}
            onOpenVideo={handleOpenVideo}
            onOpenCad={handleOpenCad}
            onOpenQuote={handleOpenQuote}
            onAddToast={addToast}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailView
            onNavigate={handleNavigate}
            onOpenVideo={handleOpenVideo}
            onOpenCad={handleOpenCad}
            onOpenQuote={handleOpenQuote}
            onAddToast={addToast}
          />
        )}

        {currentView === 'videos' && (
          <VideosView
            onNavigate={handleNavigate}
            onOpenVideo={handleOpenVideo}
            onOpenQuote={handleOpenQuote}
            onAddToast={addToast}
          />
        )}

        {currentView === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
            onAddToast={addToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDoc={handleOpenDoc}
      />

      {/* Modals & Overlays */}
      <VideoModal
        video={activeVideo}
        onClose={handleCloseVideo}
        onOpenDoc={handleOpenDoc}
      />

      <CadModal
        isOpen={isCadModalOpen}
        onClose={handleCloseCad}
        onOpenDoc={handleOpenDoc}
      />

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuote}
        preselectedProduct={quotePreselectedProduct}
        onSuccess={handleQuoteSuccess}
      />

      {/* Toast Notification Banner */}
      <Toast
        toasts={toasts}
        onDismiss={dismissToast}
      />
    </div>
  );
}
