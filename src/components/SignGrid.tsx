import React from 'react';
import { motion } from 'motion/react';
import { ZODIAC_SIGNS, ZodiacSign } from '../types';
import Logo from './Logo';

interface SignGridProps {
  onSelectSign: (sign: ZodiacSign) => void;
}

export default function SignGrid({ onSelectSign }: SignGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12 flex flex-col items-center">
        <Logo className="w-24 h-24 mb-6" />
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 mb-4">
          PETTY FATE
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-md mx-auto">
          Select your sign to discover today's minor inconvenience.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {ZODIAC_SIGNS.map((sign, index) => (
          <motion.button
            key={sign.id}
            onClick={() => onSelectSign(sign)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all group"
          >
            <div className="text-5xl mb-4 text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
              {sign.symbol}
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">{sign.name}</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{sign.dates}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
