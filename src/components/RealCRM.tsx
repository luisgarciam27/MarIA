import React, { useEffect, useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Configuración de Supabase (Usa tus variables de entorno)
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const channel = supabase
        .channel('crm_realtime')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'crm_prospectos' }, () => {
          fetchData();
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isAuthenticated]);

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-[#0f0f0f] border border-white/5 p-10 rounded-[40px] shadow-2xl text-center">
          <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2 tracking-tighter uppercase">MarIA CRM <span className="text-blue-500">PRO</span></h1>
          <p className="text-gray-500 text-sm mb-10 font-medium">Acceso restringido a la Agencia de Automatización.</p>
          
          <div className="space-y-4">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Clave Maestra"
              className={`w-full bg-white/5 border-2 rounded-2xl px-6 py-4 text-center text-white text-xl font-black tracking-[0.5em] outline-none transition-all ${passError ? 'border-red-500 animate-shake' : 'border-white/5 focus:border-blue-500'}`}
              autoFocus
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              ENTRAR AL PANEL
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link to="/" className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-black tracking-tighter uppercase">MarIA CRM <span className="text-blue-500">PRO</span></h1>
          </div>
          <p className="text-gray-500 text-sm font-medium ml-12">Panel Real de Gestión de Prospectos</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Live Sync Activo</span>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-gray-400">
            <Archive className="w-5 h-5" />
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-7xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 text-red-400">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p className="text-sm font-bold">Error de Base de Datos: {error}. Verifica que la tabla 'crm_prospectos' exista en Supabase.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto bg-[#0f0f0f] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
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
                <tr><td colSpan={5} className="p-32 text-center text-gray-600 font-bold">No hay prospectos reales aún. MarIA está lista para capturarlos.</td></tr>
              ) : prospectos.map((p) => (
                <tr key={p.id} className={`hover:bg-white/[0.01] transition-all ${p.estado === 'Cerrado' ? 'opacity-30 grayscale' : ''}`}>
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                        <Phone className="w-5 h-5 text-gray-400" />
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
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
        <span>© 2026 Agencia de Automatización MarIA</span>
        <span>Versión 2.4.0 - Enterprise</span>
      </div>
    </div>
  );
}
