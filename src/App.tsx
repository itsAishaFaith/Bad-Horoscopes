import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZodiacSign } from './types';
import SignGrid from './components/SignGrid';
import HoroscopeDetail from './components/HoroscopeDetail';
import { getBadHoroscope } from './services/geminiService';
import { Moon, Sun } from 'lucide-react';

export default function App() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);
  const [horoscope, setHoroscope] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  const handleSelectSign = async (sign: ZodiacSign) => {
    setSelectedSign(sign);
    setIsLoading(true);
    setHoroscope('');
    const newHoroscope = await getBadHoroscope(sign.name, currentDate);
    setHoroscope(newHoroscope);
    setIsLoading(false);
  };

  const handleBack = () => {
    setSelectedSign(null);
    setHoroscope('');
  };

  const handleRefresh = async () => {
    if (!selectedSign) return;
    setIsLoading(true);
    setHoroscope('');
    const newHoroscope = await getBadHoroscope(selectedSign.name, currentDate);
    setHoroscope(newHoroscope);
    setIsLoading(false);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-900 transition-colors duration-300 relative">
        
        <button
          onClick={() => setIsDark(!isDark)}
          className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <AnimatePresence mode="wait">
          {!selectedSign ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex items-center justify-center"
            >
              <SignGrid onSelectSign={handleSelectSign} />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex items-center justify-center"
            >
              <HoroscopeDetail
                sign={selectedSign}
                horoscope={horoscope}
                date={currentDate}
                isLoading={isLoading}
                onBack={handleBack}
                onRefresh={handleRefresh}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
