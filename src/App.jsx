import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';
import FloatingFAB from './components/ui/FloatingFAB';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MealDetails from './pages/MealDetails';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col justify-between selection:bg-brand-orange selection:text-white">
      {/* Premium Desktop Mouse Cursor */}
      <CustomCursor />

      {/* Persistent Sticky Navigation Bar */}
      <Navbar />

      {/* Router Switcher */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Floating Action Button (Random Recipe Modal) */}
      <FloatingFAB />

      {/* Persistent Page Footer */}
      <Footer />

      {/* Toast Alert popup dispatcher */}
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#101115',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Outfit, sans-serif',
          },
        }}
      />
    </div>
  );
}
