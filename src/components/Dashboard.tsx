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
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('pedidos')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        if (data) {
          setPedidos(data);
        } else {
          setPedidos([]);
        }
      } catch (err: any) {
        console.error('Error fetching pedidos:', err);
        setError(`Error: ${err.message || 'No se pudo conectar con la base de datos.'}`);
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

  const [selectedPedido, setSelectedPedido] = useState<any | null>(null);

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

  if (error) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 px-6">
      <div className="bg-red-50 p-6 rounded-[32px] border border-red-100 flex flex-col items-center text-center max-w-2xl">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-black text-text-main mb-2">Error de Conexión con la Base de Datos</h3>
        <p className="text-text-muted text-sm mb-6">
          {error.includes('VITE_SUPABASE_URL') 
            ? 'Faltan las variables de entorno de Supabase. Por favor, configúralas en el panel de Secretos.' 
            : 'No se pudo conectar con Supabase. Verifica que la tabla "pedidos" exista y que las credenciales sean correctas.'}
        </p>
        
        <div className="bg-white p-6 rounded-2xl border border-red-50 text-left w-full space-y-4 mb-6">
          <div className="text-xs font-black text-red-500 uppercase tracking-widest">Pasos para solucionar:</div>
          <ol className="text-xs text-text-muted space-y-2 list-decimal ml-4">
            <li>Crea un proyecto en <a href="https://supabase.com" target="_blank" className="text-primary underline">Supabase</a>.</li>
            <li>Crea una tabla llamada <strong>pedidos</strong> con las columnas: 
              <code className="block bg-gray-50 p-2 mt-1 rounded">id (int8), cliente_nombre (text), telefono (text), items (text/json), total (float8), estado (text), origen (text), created_at (timestamptz)</code>
            </li>
            <li>Copia la <strong>URL</strong> y el <strong>Anon Key</strong> de la configuración de API de Supabase.</li>
            <li>Agrégalos como <strong>VITE_SUPABASE_URL</strong> y <strong>VITE_SUPABASE_ANON_KEY</strong> en los Secretos de AI Studio.</li>
          </ol>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-primary-dark transition-all active:scale-95"
        >
          Reintentar Conexión
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DemoGuide 
        title="Panel de Gestión (Dashboard)"
        description="Este es tu centro de mando. Aquí llegan todos los pedidos de la tienda y de MarIA en tiempo real. Puedes gestionar cada orden, ver estadísticas de ventas y controlar tu inventario de forma centralizada."
        steps={[
          "Recibe notificaciones sonoras de nuevos pedidos",
          "Haz clic en un pedido para ver el detalle de productos",
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
        {/* Pedidos Recientes - Principal */}
        <div className="lg:col-span-2 bg-white border border-gray-100 p-10 rounded-[40px] flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-text-main">Pedidos Recientes</h3>
            <div className="flex gap-2">
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">En Vivo</span>
            </div>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto max-h-[500px] pr-3 custom-scrollbar">
            {pedidos.length === 0 ? (
              <div className="text-center py-24 text-gray-400 text-sm font-medium">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                Esperando pedidos en tiempo real...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pedidos.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => setSelectedPedido(p)}
                    className="bg-gray-50 border border-gray-100 p-6 rounded-[32px] flex justify-between items-center hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl ${p.estado === 'pendiente' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                        {p.estado === 'pendiente' ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="text-base font-black text-text-main group-hover:text-primary transition-colors">{p.cliente_nombre}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-gray-100">{p.origen}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-text-main">S/ {p.total}</div>
                      <div className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Ver Detalle →</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="w-full mt-8 py-4 border border-gray-100 rounded-2xl text-xs font-black text-gray-400 hover:bg-primary/5 hover:text-primary transition-all">
            Ver Historial Completo
          </button>
        </div>

        {/* Flujo de Ventas - Secondary */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black text-text-main">Flujo de Ventas</h3>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                  <XAxis dataKey="name" stroke="#999" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#7C3AED', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center text-xs font-bold text-text-muted">
                <span>Pico de ventas:</span>
                <span className="text-primary font-black">20:00 hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-100 p-8 rounded-[40px] shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="text-sm font-black text-text-main">Stock Crítico</div>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-6">3 productos están por debajo del stock mínimo.</p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-[10px] font-black transition-all shadow-lg shadow-red-500/20">
              Reponer Stock
            </button>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedPedido && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-black text-text-main">Detalle del Pedido</h3>
                <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">ID: #{selectedPedido.id.toString().slice(-6)}</p>
              </div>
              <button onClick={() => setSelectedPedido(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <AlertCircle className="w-6 h-6 text-gray-400 rotate-45" />
              </button>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                <div className="text-xs font-bold text-text-muted uppercase">Cliente</div>
                <div className="text-sm font-black text-text-main">{selectedPedido.cliente_nombre}</div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2">Productos</div>
                {JSON.parse(selectedPedido.items || '[]').map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                    <div className="flex gap-2">
                      <span className="font-black text-primary">{item.cantidad}x</span>
                      <span className="text-text-main font-bold">{item.nombre}</span>
                    </div>
                    <div className="font-bold text-text-muted">{item.precio}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-lg font-bold text-text-muted">Total</div>
                <div className="text-3xl font-black text-primary">S/ {selectedPedido.total}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="py-4 bg-gray-100 text-text-muted rounded-2xl font-bold text-sm hover:bg-gray-200 transition-all">
                Imprimir Comprobante
              </button>
              <button className="py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                Marcar como Entregado
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;


