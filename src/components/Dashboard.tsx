import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Dashboard = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Cargar los pedidos iniciales
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
        setError('No se pudieron cargar los pedidos. Verifica tu conexión a Supabase.');
      }
    };
    fetchPedidos();

    // 2. Suscripción en tiempo real
    const channel = supabase
      .channel('pedidos-channel')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'pedidos' 
      }, (payload) => {
        setPedidos((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="py-24 bg-bg-main">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white p-10 rounded-[40px] border border-primary/10 shadow-xl">
          <h2 className="text-3xl font-display font-extrabold mb-8 text-text-main">
            Dashboard de Pedidos <em className="font-serif italic font-normal text-primary">en Tiempo Real</em>
          </h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {pedidos.length === 0 && !error && (
              <div className="text-center py-12 text-text-muted">
                <p>Esperando nuevos pedidos...</p>
                <p className="text-sm mt-2">Prueba añadiendo productos desde el catálogo web.</p>
              </div>
            )}
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="bg-bg-main p-6 rounded-2xl border border-primary/5 shadow-sm flex justify-between items-center hover:border-primary/20 transition-all">
                <div>
                  <div className="font-bold text-text-main">{pedido.cliente_nombre}</div>
                  <div className="text-xs text-text-muted mt-1">Origen: {pedido.origen} | Estado: {pedido.estado}</div>
                </div>
                <div className="text-primary font-bold text-lg">S/ {pedido.total}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
