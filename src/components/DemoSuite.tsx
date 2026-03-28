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
  User,
  Info,
  ArrowRight,
  Sparkles
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
        : 'text-gray-500 hover:bg-primary/5 hover:text-primary'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-bold text-sm">{label}</span>
  </button>
);

const DemoGuide = ({ title, description, steps, color = "primary" }: { title: string, description: string, steps: string[], color?: string }) => (
  <div className={`bg-white border border-gray-100 p-8 rounded-[32px] mb-10 relative overflow-hidden shadow-sm`}>
    <div className={`absolute top-0 right-0 p-6 opacity-5`}>
      <Sparkles className={`w-32 h-32 text-${color}`} />
    </div>
    <div className="relative z-10">
      <div className={`flex items-center gap-2 text-${color} mb-3`}>
        <div className={`p-1.5 rounded-lg bg-${color}/10`}>
          <Info className="w-4 h-4" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Guía de la Demo</span>
      </div>
      <h3 className="text-2xl font-black text-text-main mb-3">{title}</h3>
      <p className="text-base text-text-muted mb-6 max-w-3xl leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
            <div className={`w-6 h-6 bg-${color} text-white rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm`}>{i + 1}</div>
            <span className="text-xs font-bold text-text-main">{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
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
      alert(`¡Pedido de ${product.name} enviado! Ahora revisa la pestaña de Gestión de Ventas para ver cómo llega.`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DemoGuide 
        title="Vista del Cliente (Tienda Virtual)"
        description="Así se verá tu negocio de cara al cliente. Una tienda profesional donde el proceso de pedido es simple: el cliente elige, pide y la orden llega automáticamente a tu panel de gestión para que puedas prepararla sin demoras."
        steps={[
          "El cliente navega por tu carta digital",
          "Añade productos al carrito con un toque",
          "El pedido se sincroniza con tu panel al instante"
        ]}
      />

      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-text-main tracking-tight">Catálogo Digital</h2>
          <p className="text-text-muted mt-1 text-sm font-medium">Prueba a pedir algo para ver el flujo completo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="group bg-white border border-gray-100 rounded-[40px] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
            <div className="relative h-64 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-base font-black text-primary shadow-sm border border-gray-100">
                S/ {p.price}.00
              </div>
            </div>
            <div className="p-8">
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-3">{p.category}</div>
              <h3 className="text-2xl font-bold text-text-main mb-8">{p.name}</h3>
              <button 
                onClick={() => handleAddOrder(p)}
                className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
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
  <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
    <DemoGuide 
      title="Asistente MarIA (Inteligencia Artificial)"
      description="MarIA atiende a tus clientes por WhatsApp 24/7. Ella responde consultas sobre productos, precios y el estado de los pedidos. Si un cliente quiere comprar, MarIA toma el pedido y lo envía directamente a tu dashboard."
      steps={[
        "Resuelve dudas sobre ingredientes o precios",
        "Toma los datos del cliente y confirma el pedido",
        "Informa al cliente sobre el estado de su delivery"
      ]}
      color="secondary"
    />
    
    <div className="flex-1 bg-white border border-gray-100 rounded-[40px] overflow-hidden flex flex-col relative shadow-sm">
      {/* Chat Header */}
      <div className="bg-gray-50/50 border-b border-gray-100 p-8 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-primary/20 text-xl">M</div>
          <div>
            <div className="text-lg font-black text-text-main">MarIA AI Assistant</div>
            <div className="text-[11px] text-green-500 font-bold flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              Atendiendo en tiempo real
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary/10 hover:text-primary transition-all"><Settings className="w-6 h-6" /></button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-10 space-y-8 overflow-y-auto bg-[#fafafa] custom-scrollbar">
        <div className="flex gap-5 max-w-[85%]">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">M</div>
          <div className="bg-white border border-gray-100 p-6 rounded-[32px] rounded-tl-none text-base text-text-muted shadow-sm leading-relaxed">
            ¡Hola! 👋 Soy MarIA, tu asistente virtual. ¿En qué puedo ayudarte hoy? Puedo mostrarte nuestra carta, tomar tu pedido o decirte cómo va tu orden.
          </div>
        </div>
        
        <div className="flex gap-5 max-w-[85%] ml-auto flex-row-reverse">
          <div className="w-12 h-12 rounded-2xl bg-gray-200 flex items-center justify-center text-sm font-black text-gray-500 shrink-0">U</div>
          <div className="bg-primary p-6 rounded-[32px] rounded-tr-none text-base text-white shadow-2xl shadow-primary/20 font-medium">
            ¿Tienen Cebiche Clásico? ¿A cuánto está?
          </div>
        </div>

        <div className="flex gap-5 max-w-[85%]">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-sm font-black text-primary shrink-0">M</div>
          <div className="bg-white border border-gray-100 p-6 rounded-[32px] rounded-tl-none text-base text-text-muted shadow-sm leading-relaxed">
            ¡Claro que sí! 🍋 Nuestro **Cebiche Clásico** es el favorito de la casa. Está preparado con pesca del día, limón de Chulucanas y ají limo. <br/><br/>
            Su precio es de **S/ 35.00**. ¿Te gustaría que lo añada a tu pedido ahora mismo?
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-8 bg-white border-t border-gray-100 flex gap-5">
        <input 
          type="text" 
          placeholder="Escribe un mensaje a MarIA..." 
          className="flex-1 bg-gray-50 border border-gray-100 rounded-3xl px-8 py-5 text-base text-text-main focus:outline-none focus:border-primary focus:ring-8 focus:ring-primary/5 transition-all"
        />
        <button className="bg-primary hover:bg-primary-dark text-white p-5 rounded-3xl transition-all shadow-xl shadow-primary/20 active:scale-95">
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  </div>
);

// --- Main Demo Suite Component ---

export default function DemoSuite() {
  const [activeTab, setActiveTab] = useState('gestion'); // 'tienda', 'gestion', 'asistente'

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-text-main flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col p-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="font-display text-3xl font-black tracking-tighter block leading-none">Mar<em className="text-primary not-italic">IA</em></span>
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">Suite Emprendedor</span>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          <div className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 ml-2">Panel de Control</div>
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
          
          <div className="pt-12 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 ml-2">Negocio</div>
          <SidebarItem icon={Package} label="Inventario" active={false} onClick={() => {}} />
          <SidebarItem icon={Settings} label="Configuración" active={false} onClick={() => {}} />
        </nav>

        <div className="mt-auto pt-10 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-4 text-gray-400 hover:text-primary transition-all text-base font-bold group">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            Volver a la Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-28 bg-white border-b border-gray-100 flex items-center justify-between px-12 shrink-0">
          <div className="flex items-center gap-5 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 w-[500px] focus-within:border-primary/30 focus-within:ring-8 focus-within:ring-primary/5 transition-all">
            <Search className="w-6 h-6 text-gray-400" />
            <input type="text" placeholder="Buscar pedidos, productos, clientes..." className="bg-transparent border-none text-base focus:outline-none text-text-main w-full font-bold" />
          </div>

          <div className="flex items-center gap-10">
            <button className="relative text-gray-400 hover:text-primary transition-colors">
              <Bell className="w-7 h-7" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-white" />
            </button>
            <div className="h-12 w-px bg-gray-100" />
            <div className="flex items-center gap-5">
              <div className="text-right hidden sm:block">
                <div className="text-base font-black text-text-main leading-none mb-1">Luis Garcia</div>
                <div className="text-[11px] font-bold text-primary uppercase tracking-[0.2em]">Administrador Pro</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black border-4 border-white shadow-xl">
                <User className="w-7 h-7" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-7xl mx-auto"
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
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f9fa;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e9ecef;
          border-radius: 12px;
          border: 3px solid #f8f9fa;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dee2e6;
        }
      `}} />
    </div>
  );
}
