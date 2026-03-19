import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ZodiacSign } from '../types';
import { ArrowLeft, RefreshCw, Download } from 'lucide-react';
import { toPng } from 'html-to-image';

interface HoroscopeDetailProps {
  sign: ZodiacSign;
  horoscope: string;
  date: string;
  isLoading: boolean;
  onBack: () => void;
  onRefresh: () => void;
}

export default function HoroscopeDetail({
  sign,
  horoscope,
  date,
  isLoading,
  onBack,
  onRefresh,
}: HoroscopeDetailProps) {
  const exportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!exportRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        width: 1080,
        height: 1350,
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `bad-horoscope-${sign.name.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="self-start flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium mb-12 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Safety
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800" />
        
        <div className="text-8xl mb-6 text-zinc-900 dark:text-zinc-50">{sign.symbol}</div>
        
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-1 uppercase">
          {sign.name}
        </h2>
        
        <div className="text-zinc-500 dark:text-zinc-400 font-medium mb-6">
          {sign.dates}
        </div>
        
        <div className="inline-block px-4 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-sm font-medium mb-10">
          {date}
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-zinc-400 dark:text-zinc-500">
              <RefreshCw className="animate-spin" size={32} />
              <p className="font-medium animate-pulse">Consulting the pessimistic stars...</p>
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 font-serif italic leading-relaxed"
            >
              "{horoscope}"
            </motion.p>
          )}
        </div>

        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <RefreshCw size={16} />
              Another inconvenience?
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} className={isDownloading ? "animate-bounce" : ""} />
              {isDownloading ? 'Saving...' : 'Save Image'}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Hidden export container (4:5 ratio) */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
        <div
          ref={exportRef}
          style={{ width: 1080, height: 1350 }}
          className="bg-white dark:bg-zinc-950 flex flex-col items-center justify-center p-20 text-center relative font-sans"
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-700 dark:to-zinc-800" />
          <div className="text-[140px] mb-8 text-zinc-900 dark:text-zinc-50 leading-none">{sign.symbol}</div>
          <h2 className="text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-4 uppercase">
            {sign.name}
          </h2>
          <div className="text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-10">
            {sign.dates}
          </div>
          <div className="inline-block px-10 py-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-mono text-xl font-medium mb-16">
            {date}
          </div>
          <p className="text-4xl text-zinc-800 dark:text-zinc-200 font-serif italic leading-relaxed max-w-3xl px-8">
            "{horoscope}"
          </p>
          <div className="absolute bottom-16 text-zinc-400 dark:text-zinc-600 font-mono text-xl tracking-widest">
            BAD HOROSCOPES
          </div>
        </div>
      </div>
    </div>
  );
}
