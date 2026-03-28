import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  BarChart3, 
  MessageCircle, 
  ArrowLeft, 
  LayoutDashboard, 
  Package, 
  Settings,
  Bell,
  Search,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { supabase } from '../lib/supabase';

// --- Components for Demo Suite ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const TiendaView = () => {
  const products = [
    { id: 1, name: "Cebiche Clásico", price: 35, image: "https://picsum.photos/seed/cebiche/400/400", category: "Entradas" },
    { id: 2, name: "Lomo Saltado", price: 42, image: "https://picsum.photos/seed/lomo/400/400", category: "Fondos" },
    { id: 3, name: "Arroz con Mariscos", price: 38, image: "https://picsum.photos/seed/mariscos/400/400", category: "Fondos" },
    { id: 4, name: "Chicha Morada 1L", price: 15, image: "https://picsum.photos/seed/chicha/400/400", category: "Bebidas" },
    { id: 5, name: "Pisco Sour", price: 25, image: "https://picsum.photos/seed/pisco/400/400", category: "Bebidas" },
    { id: 6, name: "Suspiro a la Limeña", price: 18, image: "https://picsum.photos/seed/suspiro/400/400", category: "Postres" },
  ];

  const handleAddOrder = async (product: any) => {
    const { error } = await supabase.from('pedidos').insert([
      {
        cliente_nombre: 'Cliente Demo',
        telefono: 'Demo-999',
        items: JSON.stringify([{ nombre: product.name, cantidad: 1, precio: `S/ ${product.price}.00` }]),
        total: product.price,
        estado: 'pendiente',
        origen: 'web'
      }
    ]);

    if (error) {
      console.error('Error:', error);
    } else {
      // Notification sound or toast could go here
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">Catálogo Digital</h2>
          <p className="text-gray-400 mt-1 text-sm">Simula un pedido para ver el dashboard actualizarse.</p>
        </div>
        <div className="flex gap-2">
          {['Todos', 'Entradas', 'Fondos', 'Bebidas'].map((cat) => (
            <button key={cat} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            <div className="relative h-48 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                S/ {p.price}.00
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{p.category}</div>
              <h3 className="text-lg font-bold text-white mb-4">{p.name}</h3>
              <button 
                onClick={() => handleAddOrder(p)}
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/30"
              >
                <ShoppingBag className="w-4 h-4" />
                Añadir al Pedido
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AsistenteView = () => (
  <div className="h-[calc(100vh-180px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-white">Asistente MarIA</h2>
      <p className="text-gray-400 mt-1 text-sm">Inteligencia Artificial atendiendo a tus clientes 24/7.</p>
    </div>
    
    <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col relative">
      {/* Chat Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">M</div>
        <div>
          <div className="text-sm font-bold text-white">MarIA AI Assistant</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            En línea ahora
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">M</div>
          <div className="bg-white/10 border border-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-gray-200">
            ¡Hola! 👋 Soy MarIA, tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo mostrarte nuestra carta, tomar tu pedido o resolver cualquier duda.
          </div>
        </div>
        
        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white shrink-0">U</div>
          <div className="bg-primary p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-primary/20">
            ¿Tienen Cebiche Clásico? ¿A cuánto está?
          </div>
        </div>

        <div className="flex gap-3 max-w-[80%]">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">M</div>
          <div className="bg-white/10 border border-white/10 p-4 rounded-2xl rounded-tl-none text-sm text-gray-200">
            ¡Claro que sí! 🍋 Nuestro **Cebiche Clásico** es el favorito de la casa. Está preparado con pesca del día, limón de Chulucanas y ají limo. <br/><br/>
            Su precio es de **S/ 35.00**. ¿Te gustaría que lo añada a tu pedido?
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white/5 border-t border-white/10 flex gap-3">
        <input 
          type="text" 
          placeholder="Escribe un mensaje a MarIA..." 
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
        />
        <button className="bg-primary hover:bg-primary-dark text-white p-3 rounded-xl transition-all">
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Demo Suite Component ---

export default function DemoSuite() {
  const [activeTab, setActiveTab] = useState('gestion'); // 'tienda', 'gestion', 'asistente'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-right border-white/5 flex flex-col p-6 shrink-0">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <span className="font-display text-xl font-black tracking-tighter">Mar<em className="text-primary not-italic">IA</em> Suite</span>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Principal</div>
          <SidebarItem 
            icon={ShoppingBag} 
            label="Tienda Virtual" 
            active={activeTab === 'tienda'} 
            onClick={() => setActiveTab('tienda')} 
          />
          <SidebarItem 
            icon={BarChart3} 
            label="Gestión de Ventas" 
            active={activeTab === 'gestion'} 
            onClick={() => setActiveTab('gestion')} 
          />
          <SidebarItem 
            icon={MessageCircle} 
            label="Asistente IA" 
            active={activeTab === 'asistente'} 
            onClick={() => setActiveTab('asistente')} 
          />
          
          <div className="pt-8 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">Configuración</div>
          <SidebarItem icon={Package} label="Inventario" active={false} onClick={() => {}} />
          <SidebarItem icon={Settings} label="Ajustes" active={false} onClick={() => {}} />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Volver a la Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-96">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Buscar pedidos, productos..." className="bg-transparent border-none text-sm focus:outline-none text-white w-full" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-[#0a0a0a]" />
            </button>
            <div className="h-8 w-px bg-white/5" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white">Luis Garcia</div>
                <div className="text-[10px] text-gray-500">Admin Pro</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold border-2 border-white/10">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'tienda' && <TiendaView />}
              {activeTab === 'gestion' && <Dashboard />}
              {activeTab === 'asistente' && <AsistenteView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
