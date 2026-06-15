import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg text-center space-y-6 relative z-10 glass-panel-glow border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Spray style icon container */}
        <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto shadow-lg shadow-primary/5">
          <HelpCircle className="w-10 h-10 text-primary animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-black text-6xl text-gradient animate-neon-flicker">
            404
          </h1>
          <h2 className="font-display font-bold text-2xl text-white">
            Lost in the Screen Matrix?
          </h2>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you are looking for has been moved, deleted, or never existed in this dimension. Let's get you back to the gallery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-[#121212] font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-accent/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
