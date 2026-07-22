"use client";

import { useState, useEffect } from 'react';
import { Shield, X, Loader2, Lock, User, Flame } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoading(false);
        setError(null);
        setUsername('');
        setPassword('');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onLogin(username, password);
    } catch {
      setError("Clave incorrecta o socio no reconocido");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      
      {/* 1. Fondo Blur */}
      <div 
        className="absolute inset-0 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* 2. Tarjeta Personalizada */}
      <div className="relative w-full max-w-sm bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* Decoración de fondo */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/10 rounded-full blur-3xl"></div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-600 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Encabezado */}
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-stone-800 to-stone-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg border border-stone-600 mb-4 group hover:border-orange-500 transition-colors">
            <Flame className="text-orange-500 w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-white">Socios del Fuego</h2>
          <p className="text-stone-400 text-xs mt-2 font-mono uppercase tracking-wider">Acceso Exclusivo</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          {/* Input Nombre */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">¿Quién eres?</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-orange-500 transition-colors w-5 h-5" />
              <input 
                type="text" 
                placeholder="Ej: Carlos"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-stone-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all capitalize"
                autoFocus
              />
            </div>
          </div>

          {/* Input Contraseña */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-orange-500 transition-colors w-5 h-5" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-stone-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-xs text-center flex items-center justify-center gap-2 animate-in slide-in-from-top-1">
              <Shield size={12} /> {error}
            </div>
          )}

          {/* Botón Submit */}
          <button 
            type="submit"
            disabled={!username || !password || loading}
            className="w-full bg-stone-100 hover:bg-white disabled:bg-stone-800 disabled:text-stone-600 text-stone-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-900/10"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Conectando...
              </>
            ) : (
              "Entrar a la Parrilla"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
