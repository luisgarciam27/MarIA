import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ExternalLink, 
  TrendingUp, 
  Phone, 
  AlertCircle, 
  Loader2,
  Lock,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  ArrowLeft,
  Bell,
  User,
  LogOut,
  Zap,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RealCRM() {
  const [prospectos, setProspectos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [newClientAlert, setNewClientAlert] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      
      const channel = supabase
        .channel('crm_realtime_enhanced')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'crm_prospectos' 
        }, (payload) => {
          handleNewInsert(payload.new);
        })
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'crm_prospectos' 
        }, () => {
          fetchData();
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
  }, [isAuthenticated]);

  const handleNewInsert = (newRecord: any) => {
    setNewClientAlert(newRecord);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked"));
    }
    fetchData();
    // Auto hide alert after 8 seconds
    setTimeout(() => setNewClientAlert(null), 8000);
  };

  const fetchData = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('crm_prospectos')
        .select('*')
        .order('puntuacion_calidad', { ascending: false });

      if (dbError) throw dbError;
      setProspectos(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('crm_prospectos').update({ estado: status }).eq('id', id);
    fetchData();
  };

  const handleLogin = () => {
    if (password === 'Admin2702') {
      setIsAuthenticated(true);
    } else {
      setPassError(true);
      setTimeout(() => setPassError(false), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans selection:bg-blue-500/30">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#0f0f0f] border border-white/5 p-8 lg:p-12 rounded-[40px] shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-inner">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>
          
          <h1 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">
            MarIA CRM <span className="text-blue-500">PRO</span>
          </h1>
          <p className="text-gray-500 text-sm mb-10 font-medium px-4">
            Panel de Alta Conversión para Agencias de Automatización.
          </p>
          
          <div className="space-y-4">
            <div className="relative group">
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Clave Maestra"
                className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-5 text-center text-white text-2xl font-black tracking-[0.5em] outline-none transition-all placeholder:text-gray-700 placeholder:tracking-normal placeholder:text-sm ${passError ? 'border-red-500 animate-shake' : 'border-white/5 focus:border-blue-500 focus:bg-white/[0.08]'}`}
                autoFocus
              />
            </div>
            <button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 group"
            >
              ACCEDER AL PANEL
              <Zap className="w-4 h-4 group-hover:animate-pulse" />
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-gray-700 uppercase tracking-widest">
            <Smartphone className="w-3 h-3" />
            Optimizado para Móvil
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 pb-20 lg:pb-0">
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3" />
      
      {/* New Client Alert Overlay */}
      <AnimatePresence>
        {newClientAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md"
          >
            <div className="bg-blue-600 text-white p-5 rounded-[24px] shadow-2xl flex items-center gap-4 border border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0 animate-bounce">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-80">¡Nuevo Prospecto!</div>
                <div className="font-black text-lg leading-tight">{newClientAlert.telefono}</div>
                <div className="text-xs font-medium opacity-90 line-clamp-1">{newClientAlert.interes_web}</div>
              </div>
              <button 
                onClick={() => setNewClientAlert(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Smartphone className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 lg:px-12 lg:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="lg:hidden p-2 bg-white/5 rounded-xl text-gray-400">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl lg:text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
                MarIA CRM <span className="text-blue-500 hidden sm:inline">PRO</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Live Sync</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white/5 rounded-xl text-gray-400 lg:hidden">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all text-xs font-black uppercase tracking-widest border border-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-12">
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 text-red-400">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="text-sm font-bold">Error: {error}</p>
          </div>
        )}

        {/* Stats Grid (Mobile Friendly) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Leads', val: prospectos.length, color: 'blue' },
            { label: 'Calientes', val: prospectos.filter(p => p.puntuacion_calidad > 80).length, color: 'green' },
            { label: 'Pendientes', val: prospectos.filter(p => p.estado === 'Nuevo').length, color: 'orange' },
            { label: 'Cerrados', val: prospectos.filter(p => p.estado === 'Cerrado').length, color: 'gray' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#0f0f0f] border border-white/5 p-5 rounded-3xl shadow-sm">
              <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</div>
              <div className="text-2xl font-black">{stat.val}</div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-[#0f0f0f] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                  <th className="p-8">Prospecto</th>
                  <th className="p-8">Interés / Contexto IA</th>
                  <th className="p-8 text-center">Calidad</th>
                  <th className="p-8">Estado</th>
                  <th className="p-8 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan={5} className="p-32 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-500" /></td></tr>
                ) : prospectos.length === 0 ? (
                  <tr><td colSpan={5} className="p-32 text-center text-gray-600 font-bold tracking-widest uppercase text-xs">Esperando primer lead...</td></tr>
                ) : prospectos.map((p) => (
                  <tr key={p.id} className={`hover:bg-white/[0.01] transition-all ${p.estado === 'Cerrado' ? 'opacity-30 grayscale' : ''}`}>
                    <td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-black text-base">{p.telefono}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">WhatsApp Lead</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 max-w-md">
                      <div className="text-blue-400 text-sm font-black mb-1">{p.interes_web}</div>
                      <div className="text-xs text-gray-400 italic line-clamp-2 leading-relaxed">"{p.ultimo_mensaje_ia}"</div>
                    </td>
                    <td className="p-8 text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl ${p.puntuacion_calidad > 80 ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/5'}`}>
                        <span className={`text-xl font-black ${p.puntuacion_calidad > 80 ? 'text-green-400' : 'text-gray-400'}`}>{p.puntuacion_calidad}</span>
                        <TrendingUp className={`w-4 h-4 ${p.puntuacion_calidad > 80 ? 'text-green-500' : 'text-gray-700'}`} />
                      </div>
                    </td>
                    <td className="p-8">
                      <select 
                        value={p.estado}
                        onChange={(e) => updateStatus(p.id, e.target.value)}
                        className={`bg-[#1a1a1a] border border-white/10 text-[10px] font-black uppercase tracking-widest p-3 rounded-2xl outline-none focus:border-blue-500 transition-all cursor-pointer ${
                          p.estado === 'Nuevo' && p.puntuacion_calidad > 80 ? 'text-green-400 border-green-500/30' : 'text-white'
                        }`}
                      >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Calificado">Calificado</option>
                        <option value="Cerrado">Cerrado</option>
                      </select>
                    </td>
                    <td className="p-8 text-center">
                      <a 
                        href={`https://wa.me/${p.telefono.replace(/\D/g, '')}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex p-4 bg-green-500 text-white rounded-2xl hover:scale-110 hover:rotate-3 transition-all shadow-xl shadow-green-500/20"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            <div className="p-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-blue-500" /></div>
          ) : prospectos.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-[#0f0f0f] border border-white/5 p-6 rounded-[32px] relative overflow-hidden ${p.estado === 'Cerrado' ? 'opacity-40 grayscale' : ''}`}
            >
              {p.puntuacion_calidad > 80 && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[8px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                  Hot Lead
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="font-black text-lg">{p.telefono}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Calidad: {p.puntuacion_calidad}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-blue-400 text-sm font-black mb-1">{p.interes_web}</div>
                <p className="text-xs text-gray-400 italic line-clamp-3 leading-relaxed">"{p.ultimo_mensaje_ia}"</p>
              </div>

              <div className="flex items-center gap-3">
                <select 
                  value={p.estado}
                  onChange={(e) => updateStatus(p.id, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl outline-none"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Calificado">Calificado</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
                <a 
                  href={`https://wa.me/${p.telefono.replace(/\D/g, '')}`} 
                  target="_blank" 
                  className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 active:scale-90 transition-all"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer (Mobile Floating) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5 p-4 lg:hidden flex justify-around items-center z-50">
        <div className="text-[8px] font-black text-gray-600 uppercase tracking-[0.3em]">
          MarIA CRM Enterprise v2.4
        </div>
      </footer>
    </div>
  );
}
