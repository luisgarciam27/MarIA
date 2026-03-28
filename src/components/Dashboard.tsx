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
  AlertCircle
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

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-primary/30 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trendValue}%
        </div>
      )}
    </div>
    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
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
        // Play notification sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(() => {});
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Derived Stats ---
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
      tasaConversion: '12.5%' // Mocked for demo
    };
  }, [pedidos]);

  // --- Chart Data ---
  const chartData = useMemo(() => {
    // Group by hour for today or last 7 days
    // For demo, let's create a simple distribution
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
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Panel de Gestión</h2>
          <p className="text-gray-400 mt-1 text-sm">Monitoreo en tiempo real de tu negocio.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Hoy: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Ventas Totales" value={stats.totalVentas} icon={DollarSign} trend="up" trendValue="14" color="primary" />
        <StatCard title="Pedidos Hoy" value={stats.pedidosHoy} icon={ShoppingBag} trend="up" trendValue="8" color="blue-500" />
        <StatCard title="Ticket Promedio" value={stats.ticketPromedio} icon={TrendingUp} trend="down" trendValue="2" color="purple-500" />
        <StatCard title="Tasa Conversión" value={stats.tasaConversion} icon={Users} trend="up" trendValue="5" color="green-500" />
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[32px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-white">Flujo de Ventas (Hoy)</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none">
              <option>Últimas 24 horas</option>
              <option>Últimos 7 días</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#8B5CF6' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Pedidos Recientes</h3>
          <div className="flex-1 space-y-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
            {pedidos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                Esperando pedidos...
              </div>
            ) : (
              pedidos.map((p) => (
                <div key={p.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${p.estado === 'pendiente' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                      {p.estado === 'pendiente' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">{p.cliente_nombre}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{p.origen} • {new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white">S/ {p.total}</div>
                </div>
              ))
            )}
          </div>
          <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:bg-white/5 transition-all">
            Ver todos los pedidos
          </button>
        </div>
      </div>

      {/* Inventory Alert (Demo) */}
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-500/20 text-red-500 rounded-2xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Alerta de Inventario Crítico</div>
            <div className="text-xs text-gray-400">3 productos están por debajo del stock mínimo (Cebiche Clásico, Pisco Sour).</div>
          </div>
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-xs font-bold transition-all">
          Reponer Stock
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

