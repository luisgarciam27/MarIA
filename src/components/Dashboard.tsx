import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const DemoGuide = ({ title, description, steps }: { title: string, description: string, steps: string[] }) => (
  <div className="bg-white border border-gray-100 p-8 rounded-[32px] mb-10 relative overflow-hidden shadow-sm">
    <div className="relative z-10">
      <div className="flex items-center gap-2 text-primary mb-3">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Info className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Guía de la Demo</span>
      </div>
      <h3 className="text-2xl font-black text-text-main mb-3">{title}</h3>
      <p className="text-base text-text-muted mb-6 max-w-3xl leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <div className="w-6 h-6 bg-primary text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm">{i + 1}</div>
            <span className="text-xs font-bold text-text-main">{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <div className="bg-white border border-gray-100 p-8 rounded-[32px] hover:border-primary/30 transition-all duration-300 group shadow-sm">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-7 h-7" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1.5 text-xs font-black ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trendValue}%
        </div>
      )}
    </div>
    <div className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</div>
    <div className="text-3xl font-black text-text-main">{value}</div>
  </div>
);

const Dashboard = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        if (data) setPedidos(data);
      } catch (err: any) {
        console.error('Error fetching pedidos:', err);
        setError('Error de conexión con Supabase.');
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();

    const channel = supabase
      .channel('pedidos-dashboard')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'pedidos' 
      }, (payload) => {
        setPedidos((prev) => [payload.new, ...prev]);
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(() => {});
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const stats = useMemo(() => {
    const totalVentas = pedidos.reduce((acc, p) => acc + (Number(p.total) || 0), 0);
    const pedidosHoy = pedidos.filter(p => {
      const today = new Date().toISOString().split('T')[0];
      return p.created_at.startsWith(today);
    }).length;
    
    return {
      totalVentas: `S/ ${totalVentas.toLocaleString()}`,
      pedidosHoy,
      ticketPromedio: pedidos.length > 0 ? `S/ ${(totalVentas / pedidos.length).toFixed(2)}` : 'S/ 0',
      tasaConversion: '12.5%'
    };
  }, [pedidos]);

  const chartData = useMemo(() => {
    return [
      { name: '08:00', sales: 120 },
      { name: '10:00', sales: 340 },
      { name: '12:00', sales: 890 },
      { name: '14:00', sales: 560 },
      { name: '16:00', sales: 430 },
      { name: '18:00', sales: 780 },
      { name: '20:00', sales: 920 },
    ];
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DemoGuide 
        title="Panel de Gestión (Dashboard)"
        description="Este es tu centro de mando. Aquí llegan todos los pedidos de la tienda y de MarIA en tiempo real. Puedes gestionar cada orden, ver estadísticas de ventas y controlar tu inventario de forma centralizada."
        steps={[
          "Recibe notificaciones sonoras de nuevos pedidos",
          "Mira cómo crecen tus ventas en los gráficos",
          "Gestiona el estado de cada pedido (Pendiente/Entregado)"
        ]}
      />

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-text-main tracking-tight">Panel de Gestión</h2>
          <p className="text-text-muted mt-1 text-sm font-medium">Monitoreo en tiempo real de tu negocio.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-gray-100 px-5 py-3 rounded-2xl text-xs font-black text-text-muted flex items-center gap-3 shadow-sm">
            <Clock className="w-5 h-5 text-primary" />
            Hoy: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Ventas Totales" value={stats.totalVentas} icon={DollarSign} trend="up" trendValue="14" color="primary" />
        <StatCard title="Pedidos Hoy" value={stats.pedidosHoy} icon={ShoppingBag} trend="up" trendValue="8" color="blue-500" />
        <StatCard title="Ticket Promedio" value={stats.ticketPromedio} icon={TrendingUp} trend="down" trendValue="2" color="purple-500" />
        <StatCard title="Tasa Conversión" value={stats.tasaConversion} icon={Users} trend="up" trendValue="5" color="green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-text-main">Flujo de Ventas (Hoy)</h3>
            <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-xs font-bold text-text-muted focus:outline-none focus:border-primary/30">
              <option>Últimas 24 horas</option>
              <option>Últimos 7 días</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" stroke="#999" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#999" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '16px', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                  itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#7C3AED" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col shadow-sm">
          <h3 className="text-xl font-black text-text-main mb-8">Pedidos Recientes</h3>
          <div className="flex-1 space-y-5 overflow-y-auto max-h-[400px] pr-3 custom-scrollbar">
            {pedidos.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm font-medium">
                Esperando pedidos...
              </div>
            ) : (
              pedidos.map((p) => (
                <div key={p.id} className="bg-gray-50 border border-gray-100 p-5 rounded-3xl flex justify-between items-center hover:border-primary/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${p.estado === 'pendiente' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                      {p.estado === 'pendiente' ? <Clock className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-black text-text-main group-hover:text-primary transition-colors">{p.cliente_nombre}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{p.origen} • {new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-text-main">S/ {p.total}</div>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-8 py-4 border border-gray-100 rounded-2xl text-xs font-black text-gray-400 hover:bg-primary/5 hover:text-primary transition-all">
            Ver todos los pedidos
          </button>
        </div>
      </div>

      <div className="bg-red-50 border border-red-100 p-8 rounded-[32px] flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-base font-black text-text-main">Alerta de Inventario Crítico</div>
            <div className="text-sm text-text-muted">3 productos están por debajo del stock mínimo (Cebiche Clásico, Pisco Sour).</div>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-2xl text-xs font-black transition-all shadow-lg shadow-red-500/20 active:scale-95">
          Reponer Stock
        </button>
      </div>
    </div>
  );
};

export default Dashboard;


