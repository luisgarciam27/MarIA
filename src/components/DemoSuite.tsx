import React, { useState, useEffect } from 'react';
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
  Briefcase,
  Info,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Minus,
  X,
  Menu
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
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    { 
      id: 1, 
      name: "Cebiche Clásico", 
      price: 35, 
      image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&auto=format&fit=crop", 
      category: "Entradas",
      description: "Pescado fresco del día marinado en limón de pica, acompañado de camote glaseado, choclo desgranado y canchita serrana."
    },
    { 
      id: 2, 
      name: "Lomo Saltado", 
      price: 42, 
      image: "https://images.unsplash.com/photo-1594179047519-f347310d3322?w=800&auto=format&fit=crop", 
      category: "Fondos",
      description: "Trozos de lomo fino salteados al wok con cebolla roja, tomate, ají amarillo y un toque de cilantro. Servido con papas fritas y arroz blanco."
    },
    { 
      id: 3, 
      name: "Arroz con Mariscos", 
      price: 38, 
      image: "https://images.unsplash.com/photo-1512058560366-cd2427ff56f3?w=800&auto=format&fit=crop", 
      category: "Fondos",
      description: "Arroz meloso con mixtura de mariscos frescos, base de ají panca y un toque de vino blanco. Coronado con salsa criolla."
    },
    { 
      id: 4, 
      name: "Chicha Morada 1L", 
      price: 15, 
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?w=800&auto=format&fit=crop", 
      category: "Bebidas",
      description: "Bebida tradicional peruana a base de maíz morado, piña, manzana y canela. 100% natural."
    },
    { 
      id: 5, 
      name: "Pisco Sour", 
      price: 25, 
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&auto=format&fit=crop", 
      category: "Bebidas",
      description: "Cóctel bandera del Perú. Pisco quebranta, jarabe de goma, limón, clara de huevo y amargo de angostura."
    },
    { 
      id: 6, 
      name: "Suspiro a la Limeña", 
      price: 18, 
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&auto=format&fit=crop", 
      category: "Postres",
      description: "Dulce de leche suave y cremoso coronado con merengue al oporto y una pizca de canela."
    },
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.price * item.cantidad), 0);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    const itemsSummary = cart.map(item => `${item.cantidad}x ${item.name} (S/ ${item.price}.00)` ).join('\n');
    const waMessage = encodeURIComponent(
      `¡Hola! 👋 Quisiera realizar un pedido:\n\n${itemsSummary}\n\n*Total: S/ ${totalCart}.00*\n\nGracias.`
    );
    const waUrl = `https://wa.me/51975736687?text=${waMessage}`;

    try {
      const { error } = await supabase.from('pedidos').insert([
        {
          cliente_nombre: 'Cliente Demo',
          telefono: 'Demo-999',
          items: JSON.stringify(cart.map(item => ({ nombre: item.name, cantidad: item.cantidad, precio: `S/ ${item.price}.00` }))),
          total: totalCart,
          estado: 'pendiente',
          origen: 'web'
        }
      ]);

      if (error) throw error;

      setCart([]);
      setIsCartOpen(false);
      setOrderSuccess(true);
      
      // Redirect to WhatsApp after a short delay to show the success message
      setTimeout(() => {
        window.open(waUrl, '_blank');
        setOrderSuccess(false);
      }, 2000);

    } catch (err: any) {
      console.error('Error al procesar el pedido:', err);
      alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      {orderSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-8 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-4"
        >
          <CheckCircle2 className="w-6 h-6" />
          ¡Pedido enviado con éxito! Ve a la pestaña de Gestión para verlo.
        </motion.div>
      )}
      <DemoGuide 
        title="Vista del Cliente (Tienda Virtual)"
        description="Así se verá tu negocio de cara al cliente. Una tienda profesional donde el proceso de pedido es simple: el cliente elige, pide y la orden llega automáticamente a tu panel de gestión para que puedas prepararla sin demoras."
        steps={[
          "Haz clic en un producto para ver sus detalles",
          "Añade productos a la canasta desde el detalle",
          "Finaliza la compra y mira el Dashboard"
        ]}
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-text-main tracking-tight">Catálogo Digital</h2>
          <p className="text-text-muted mt-1 text-xs lg:text-sm font-medium">Prueba a pedir varios productos para ver el flujo real.</p>
        </div>
        
        {/* Floating Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 lg:relative lg:bottom-0 lg:right-0 z-50 bg-white border border-gray-100 p-4 lg:p-5 rounded-[24px] shadow-2xl lg:shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
        >
          <ShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-primary group-hover:scale-110 transition-transform" />
          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-7 lg:h-7 bg-secondary text-white rounded-full flex items-center justify-center text-[10px] lg:text-xs font-black shadow-lg animate-bounce">
              {cart.reduce((acc, item) => acc + item.cantidad, 0)}
            </div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {products.map((p) => (
          <div 
            key={p.id} 
            onClick={() => setSelectedProduct(p)}
            className="group bg-white border border-gray-100 rounded-[40px] overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute top-5 right-5 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl text-base font-black text-primary shadow-sm border border-gray-100">
                S/ {p.price}.00
              </div>
            </div>
            <div className="p-8">
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-3">{p.category}</div>
              <h3 className="text-2xl font-bold text-text-main mb-8">{p.name}</h3>
              <div className="w-full bg-gray-50 group-hover:bg-primary group-hover:text-white text-text-muted py-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3">
                Ver Detalles
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-[32px] lg:rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 z-10 p-2 lg:p-3 bg-white/80 backdrop-blur-md rounded-2xl hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 lg:w-6 lg:h-6 text-text-main" />
              </button>

              <div className="md:w-1/2 h-64 sm:h-80 md:h-auto relative shrink-0">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="md:w-1/2 p-6 lg:p-14 flex flex-col">
                <div className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 lg:mb-4">{selectedProduct.category}</div>
                <h3 className="text-2xl lg:text-4xl font-black text-text-main mb-4 lg:mb-6 leading-tight">{selectedProduct.name}</h3>
                <p className="text-sm lg:text-lg text-text-muted leading-relaxed mb-8 lg:mb-10 font-medium">
                  {selectedProduct.description}
                </p>
                
                <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:gap-8">
                  <div>
                    <div className="text-[10px] lg:text-xs font-bold text-text-light uppercase tracking-widest mb-1">Precio Unitario</div>
                    <div className="text-2xl lg:text-3xl font-black text-primary">S/ {selectedProduct.price}.00</div>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="w-full sm:w-auto flex-1 bg-primary hover:bg-primary-dark text-white py-5 lg:py-6 rounded-2xl lg:rounded-3xl font-black text-base lg:text-lg transition-all flex items-center justify-center gap-3 lg:gap-4 shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95"
                  >
                    <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7" />
                    Añadir al Pedido
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[70] flex flex-col p-6 lg:p-10"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-text-main">Tu Canasta</h3>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <ArrowLeft className="w-6 h-6 text-gray-400 rotate-180" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-text-muted font-bold">Tu canasta está vacía</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-5 bg-gray-50 p-5 rounded-3xl border border-gray-100 group">
                      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-text-main">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Package className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-text-muted mb-3">S/ {item.price}.00 x {item.cantidad}</div>
                        <div className="font-black text-primary">S/ {item.price * item.cantidad}.00</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-text-muted">Total a pagar:</span>
                  <span className="text-3xl font-black text-text-main">S/ {totalCart}.00</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || isCheckingOut}
                  className={`w-full py-6 rounded-[24px] font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${
                    isCheckingOut || cart.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-primary/30'
                  }`}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      Confirmar Pedido
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const AsistenteView = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: '¡Hola! 👋 Soy MarIA. ¿En qué puedo ayudarte hoy?', time: '10:42 AM' },
    { role: 'user', text: '¿Tienen Cebiche Clásico?', time: '10:43 AM' },
    { role: 'bot', text: '¡Claro que sí! 🍋 Nuestro **Cebiche Clásico** está a **S/ 35.00**. ¿Te gustaría pedir uno?', time: '10:43 AM' },
    { role: 'user', text: 'Sí, por favor. Uno para llevar.', time: '10:44 AM' }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'bot', 
          text: '¡Excelente! 📝 He anotado tu pedido de 1 Cebiche Clásico para llevar. El total es S/ 35.00. ¿Confirmamos para enviarlo a cocina?',
          time: '10:45 AM'
        }]);
        setIsTyping(false);
      }, 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
    <DemoGuide 
      title="Asistente MarIA (WhatsApp Business IA)"
      description="Así es como MarIA atiende a tus clientes directamente en WhatsApp. Ella responde consultas sobre productos, precios y el estado de los pedidos con un lenguaje natural y cercano, cerrando ventas 24/7."
      steps={[
        "El cliente escribe por WhatsApp",
        "MarIA responde al instante con información real",
        "El pedido se confirma y llega a tu dashboard"
      ]}
      color="secondary"
    />
    
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Mobile Phone Mockup */}
      <div className="flex justify-center order-2 lg:order-1">
        <div className="w-full max-w-[360px] aspect-[9/18] bg-black rounded-[40px] lg:rounded-[60px] p-3 lg:p-4 shadow-2xl border-[8px] lg:border-[12px] border-[#1a1a1a] relative overflow-hidden flex flex-col">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 lg:w-40 h-6 lg:h-8 bg-[#1a1a1a] rounded-b-2xl lg:rounded-b-3xl z-20" />
          
          {/* WhatsApp UI Inside Phone */}
          <div className="flex-1 bg-[#e5ddd5] rounded-[30px] lg:rounded-[40px] overflow-hidden flex flex-col relative shadow-inner">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] pt-10 pb-4 px-6 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#075e54] font-black shadow-lg overflow-hidden">
                  <img src="https://ais-dev-bbnhhu7v5wsigapxxwldvn-128001582731.us-east1.run.app/logo.png" alt="Logo" className="w-6 h-6 object-contain" onError={(e) => { (e.target as any).src = 'https://picsum.photos/seed/maria/100/100' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    MarIA Business
                    <CheckCircle2 className="w-3 h-3 text-blue-400 fill-white" />
                  </div>
                  <div className="text-[10px] text-white/80 font-medium">En línea</div>
                </div>
              </div>
              <div className="flex gap-3 text-white/90">
                <Search className="w-4 h-4" />
                <Settings className="w-4 h-4" />
              </div>
            </div>

            {/* Chat Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }} />

            {/* Chat Messages */}
            <div className="flex-1 p-5 space-y-4 overflow-y-auto relative z-10 custom-scrollbar pb-20">
              <div className="flex justify-center mb-4">
                <div className="bg-[#d1ebf2] text-[#1c2e33] text-[9px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">Hoy</div>
              </div>

              {chatMessages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`p-3 rounded-xl shadow-sm relative text-xs text-[#303030] ${
                    msg.role === 'user' 
                      ? 'bg-[#dcf8c6] rounded-tr-none' 
                      : 'bg-white rounded-tl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[8px] mt-1 flex items-center gap-1 ${msg.role === 'user' ? 'text-[#4fc3f7] justify-end' : 'text-gray-400 text-right'}`}>
                      {msg.time}
                      {msg.role === 'user' && (
                        <div className="flex -space-x-1">
                          <CheckCircle2 className="w-2 h-2 fill-current" />
                          <CheckCircle2 className="w-2 h-2 fill-current" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 max-w-[85%]"
                >
                  <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* WhatsApp Input Area */}
            <div className="p-3 bg-[#f0f0f0] flex gap-2 items-center relative z-10">
              <div className="flex-1 bg-white rounded-full px-4 py-2 text-[11px] text-gray-400 shadow-sm">
                Escribe un mensaje...
              </div>
              <div className="w-10 h-10 bg-[#128c7e] rounded-full flex items-center justify-center text-white shadow-lg">
                <MessageCircle className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights / Info Side */}
      <div className="space-y-8">
        <div className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-secondary/10 text-secondary rounded-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-text-main">Inteligencia que Vende</h3>
          </div>
          
          <div className="space-y-8">
            {[
              { t: "Atención 24/7", d: "MarIA nunca duerme. Atiende pedidos a las 3 AM o en hora punta sin cansarse.", i: Clock },
              { t: "Cierre de Ventas", d: "No solo responde, MarIA guía al cliente hasta el pago final.", i: ShoppingBag },
              { t: "Personalidad de Marca", d: "Entrenamos a MarIA para que hable con el tono de tu negocio.", i: MessageCircle }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-secondary/10 transition-colors shrink-0">
                  <item.i className="w-6 h-6 text-gray-400 group-hover:text-secondary transition-colors" />
                </div>
                <div>
                  <div className="text-lg font-bold text-text-main mb-1">{item.t}</div>
                  <div className="text-sm text-text-muted leading-relaxed">{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-secondary/5 border border-secondary/10 p-8 rounded-[40px] space-y-6">
          <h4 className="text-sm font-black text-text-main uppercase tracking-widest flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-secondary" />
            Impacto en el Negocio
          </h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="text-xs font-bold text-text-muted">Conversión de Leads</div>
              <div className="text-sm font-black text-secondary">+35%</div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-secondary" 
              />
            </div>

            <div className="flex justify-between items-end">
              <div className="text-xs font-bold text-text-muted">Ahorro en Soporte</div>
              <div className="text-sm font-black text-blue-500">60%</div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-blue-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

// --- Inventario View Component ---

const InventarioView = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Cebiche Clásico', category: 'Entradas', stock: 5, minStock: 10, price: 35 },
    { id: 2, name: 'Lomo Saltado', category: 'Platos de Fondo', stock: 25, minStock: 15, price: 45 },
    { id: 3, name: 'Pisco Sour', category: 'Bebidas', stock: 8, minStock: 20, price: 25 },
    { id: 4, name: 'Arroz con Mariscos', category: 'Platos de Fondo', stock: 18, minStock: 10, price: 42 },
    { id: 5, name: 'Chicha Morada', category: 'Bebidas', stock: 50, minStock: 30, price: 12 },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [restockAmount, setRestockAmount] = useState(10);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Entradas',
    stock: 0,
    minStock: 10,
    price: 0
  });

  const handleRestock = () => {
    if (!selectedProduct) return;
    setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, stock: p.stock + restockAmount } : p));
    setIsRestockModalOpen(false);
    setSelectedProduct(null);
    setRestockAmount(10);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    const productToAdd = {
      ...newProduct,
      id: products.length + 1
    };
    setProducts([...products, productToAdd]);
    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      category: 'Entradas',
      stock: 0,
      minStock: 10,
      price: 0
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
      <DemoGuide 
        title="Gestión de Inventario Inteligente"
        description="Monitorea tu stock en tiempo real. MarIA te avisará automáticamente cuando un producto esté por agotarse para que nunca pierdas una venta."
        steps={[
          "Visualiza el stock de tus productos",
          "Recibe alertas automáticas de stock bajo",
          "Repón inventario con cantidades exactas"
        ]}
      />

      <div className="bg-white border border-gray-100 rounded-[30px] lg:rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-6 lg:p-10 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-black text-text-main">Catálogo de Productos</h3>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-2xl text-xs font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Añadir Producto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-0">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 lg:px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Producto</th>
                <th className="px-6 lg:px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Categoría</th>
                <th className="px-6 lg:px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Stock Actual</th>
                <th className="px-6 lg:px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 lg:px-10 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 lg:px-10 py-6 lg:py-8">
                    <div className="text-sm lg:text-base font-black text-text-main">{product.name}</div>
                    <div className="text-[10px] lg:text-xs font-bold text-text-muted mt-1">S/ {product.price}.00</div>
                  </td>
                  <td className="px-6 lg:px-10 py-6 lg:py-8">
                    <span className="text-[9px] lg:text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 lg:px-10 py-6 lg:py-8">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="text-sm lg:text-base font-black text-text-main">{product.stock}</div>
                      <div className="text-[10px] lg:text-xs text-gray-400 font-bold">/ {product.minStock} min.</div>
                    </div>
                  </td>
                  <td className="px-6 lg:px-10 py-6 lg:py-8">
                    {product.stock <= product.minStock ? (
                      <div className="flex items-center gap-2 text-red-500 font-black text-[9px] lg:text-[10px] uppercase tracking-widest whitespace-nowrap">
                        <AlertCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                        Stock Crítico
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-green-500 font-black text-[9px] lg:text-[10px] uppercase tracking-widest whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 lg:w-4 lg:h-4" />
                        Saludable
                      </div>
                    )}
                  </td>
                  <td className="px-6 lg:px-10 py-6 lg:py-8 text-right">
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsRestockModalOpen(true);
                      }}
                      className="text-[9px] lg:text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1 ml-auto whitespace-nowrap"
                    >
                      <Plus className="w-3 h-3" />
                      Reponer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-text-main">Nuevo Producto</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre del Producto</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Arroz Chaufa"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Precio (S/)</label>
                    <input 
                      type="number" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Categoría</label>
                    <select 
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30 appearance-none"
                    >
                      <option>Entradas</option>
                      <option>Platos de Fondo</option>
                      <option>Bebidas</option>
                      <option>Postres</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Inicial</label>
                    <input 
                      type="number" 
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Mínimo</label>
                    <input 
                      type="number" 
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct({...newProduct, minStock: Number(e.target.value)})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleAddProduct}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95"
              >
                Crear Producto
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Restock Modal */}
      <AnimatePresence>
        {isRestockModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-text-main">Reponer Stock</h3>
                <button onClick={() => setIsRestockModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="mb-8 text-center">
                <div className="text-sm font-bold text-text-muted mb-2">{selectedProduct.name}</div>
                <div className="text-xs text-gray-400">Stock actual: <span className="font-black text-text-main">{selectedProduct.stock}</span></div>
              </div>

              <div className="flex items-center justify-center gap-6 mb-10">
                <button 
                  onClick={() => setRestockAmount(Math.max(1, restockAmount - 1))}
                  className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-text-main hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <div className="text-4xl font-black text-primary w-16 text-center">{restockAmount}</div>
                <button 
                  onClick={() => setRestockAmount(restockAmount + 1)}
                  className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-text-main hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button 
                onClick={handleRestock}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95"
              >
                Confirmar Ingreso
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Configuracion View Component ---

const ConfiguracionView = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DemoGuide 
        title="Configuración de tu Suite"
        description="Personaliza la identidad de tu negocio y el comportamiento de tu Asistente IA. Aquí es donde defines cómo MarIA interactúa con tus clientes."
        steps={[
          "Define los datos de tu negocio",
          "Personaliza el tono de voz de MarIA",
          "Configura reglas de automatización"
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Perfil del Negocio */}
        <div className="bg-white border border-gray-100 p-6 lg:p-10 rounded-[30px] lg:rounded-[40px] shadow-sm">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main">Perfil del Negocio</h3>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre Comercial</label>
              <input type="text" defaultValue="La Pescadería de Luis" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número de WhatsApp</label>
              <input type="text" defaultValue="+51 975 736 687" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Dirección</label>
              <input type="text" defaultValue="Av. Principal 123, Miraflores, Lima" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30" />
            </div>
            <button className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95">
              Guardar Cambios
            </button>
          </div>
        </div>

        {/* Configuración de IA */}
        <div className="bg-white border border-gray-100 p-6 lg:p-10 rounded-[30px] lg:rounded-[40px] shadow-sm">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main">Personalidad de MarIA</h3>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tono de Voz</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30 appearance-none">
                <option>Amigable y Cercano</option>
                <option>Profesional y Directo</option>
                <option>Elegante y Sofisticado</option>
                <option>Divertido y Enérgico</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Objetivo Principal</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold text-text-main focus:outline-none focus:border-primary/30 appearance-none">
                <option>Cerrar Ventas Rápidamente</option>
                <option>Brindar Soporte al Cliente</option>
                <option>Agendar Citas / Reservas</option>
                <option>Informar sobre Productos</option>
              </select>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-text-main">Respuestas Automáticas</div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-text-main">Sugerencias de Cross-selling</div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <p className="text-xs text-text-muted leading-relaxed italic">
                "MarIA está configurada para saludar cordialmente, ofrecer el menú del día y sugerir bebidas complementarias basándose en el pedido del cliente."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Demo Suite Component ---

export default function DemoSuite() {
  const [activeRole, setActiveRole] = useState<'cliente' | 'emprendedor'>('emprendedor');
  const [activeTab, setActiveTab] = useState('gestion');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle role change and set default tab for each role
  const handleRoleChange = (role: 'cliente' | 'emprendedor') => {
    setActiveRole(role);
    setActiveTab(role === 'cliente' ? 'tienda' : 'gestion');
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-text-main flex overflow-hidden font-sans relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-100 flex flex-col p-8 lg:p-10 shrink-0 shadow-sm z-[70] transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
              <LayoutDashboard className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl lg:text-3xl font-black tracking-tighter block leading-none">Mar<em className="text-primary not-italic">IA</em></span>
              <span className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.25em]">Demo Suite</span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Role Switcher */}
        <div className="bg-gray-50 p-1.5 rounded-2xl flex gap-1 mb-10 lg:mb-12 border border-gray-100">
          <button 
            onClick={() => handleRoleChange('cliente')}
            className={`flex-1 py-3 rounded-xl text-[10px] lg:text-xs font-black transition-all flex items-center justify-center gap-2 ${activeRole === 'cliente' ? 'bg-white text-primary shadow-sm border border-gray-100' : 'text-gray-400 hover:text-text-main'}`}
          >
            <User className="w-4 h-4" />
            Cliente
          </button>
          <button 
            onClick={() => handleRoleChange('emprendedor')}
            className={`flex-1 py-3 rounded-xl text-[10px] lg:text-xs font-black transition-all flex items-center justify-center gap-2 ${activeRole === 'emprendedor' ? 'bg-white text-secondary shadow-sm border border-gray-100' : 'text-gray-400 hover:text-text-main'}`}
          >
            <Briefcase className="w-4 h-4" />
            Dueño
          </button>
        </div>

        {/* Profile Card */}
        <div className="mb-10 lg:mb-12 p-5 lg:p-6 bg-gradient-to-br from-gray-50 to-white rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${activeRole === 'cliente' ? 'bg-primary' : 'bg-secondary'}`}>
              {activeRole === 'cliente' ? 'JD' : 'LG'}
            </div>
            <div>
              <div className="text-sm font-black text-text-main leading-none mb-1">
                {activeRole === 'cliente' ? 'Juan Demo' : 'Luis Garcia'}
              </div>
              <div className="text-[9px] lg:text-[10px] font-bold text-text-muted uppercase tracking-widest">
                {activeRole === 'cliente' ? 'Cliente Potencial' : 'Dueño de Negocio'}
              </div>
            </div>
          </div>
          <div className="text-[9px] lg:text-[10px] text-text-muted leading-relaxed font-medium">
            {activeRole === 'cliente' 
              ? 'Explora la tienda y haz pedidos como lo harían tus clientes reales.' 
              : 'Gestiona ventas, inventario y configura tu IA desde el panel administrativo.'}
          </div>
        </div>

        <nav className="flex-1 space-y-3 lg:space-y-4 overflow-y-auto custom-scrollbar pr-2">
          <div className="text-[10px] lg:text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 lg:mb-8 ml-2">
            {activeRole === 'cliente' ? 'Experiencia Cliente' : 'Panel Administrativo'}
          </div>
          
          {activeRole === 'cliente' ? (
            <>
              <SidebarItem 
                icon={ShoppingBag} 
                label="Tienda Virtual" 
                active={activeTab === 'tienda'} 
                onClick={() => { setActiveTab('tienda'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={MessageCircle} 
                label="Asistente IA" 
                active={activeTab === 'asistente'} 
                onClick={() => { setActiveTab('asistente'); setIsSidebarOpen(false); }} 
              />
            </>
          ) : (
            <>
              <SidebarItem 
                icon={BarChart3} 
                label="Gestión de Ventas" 
                active={activeTab === 'gestion'} 
                onClick={() => { setActiveTab('gestion'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={Package} 
                label="Inventario" 
                active={activeTab === 'inventario'} 
                onClick={() => { setActiveTab('inventario'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={Settings} 
                label="Configuración" 
                active={activeTab === 'configuracion'} 
                onClick={() => { setActiveTab('configuracion'); setIsSidebarOpen(false); }} 
              />
            </>
          )}
        </nav>

        <div className="mt-auto pt-8 lg:pt-10 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-4 text-gray-400 hover:text-primary transition-all text-sm lg:text-base font-bold group">
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
            </div>
            Volver a la Web
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-20 lg:h-28 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu className="w-6 h-6 text-text-main" />
            </button>
            <div className="hidden md:flex items-center gap-5 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3 lg:py-4 w-[300px] lg:w-[500px] focus-within:border-primary/30 focus-within:ring-8 focus-within:ring-primary/5 transition-all">
              <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
              <input type="text" placeholder="Buscar..." className="bg-transparent border-none text-sm lg:text-base focus:outline-none text-text-main w-full font-bold" />
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-10">
            <button className="relative text-gray-400 hover:text-primary transition-colors">
              <Bell className="w-6 h-6 lg:w-7 lg:h-7" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white" />
            </button>
            <div className="h-8 lg:h-12 w-px bg-gray-100" />
            <div className="flex items-center gap-3 lg:gap-5">
              <div className="text-right hidden sm:block">
                <div className="text-sm lg:text-base font-black text-text-main leading-none mb-1">
                  {activeRole === 'cliente' ? 'Juan Demo' : 'Luis Garcia'}
                </div>
                <div className={`text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.2em] ${activeRole === 'cliente' ? 'text-primary' : 'text-secondary'}`}>
                  {activeRole === 'cliente' ? 'Cliente Activo' : 'Administrador Pro'}
                </div>
              </div>
              <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-black border-2 lg:border-4 border-white shadow-xl bg-gradient-to-br ${activeRole === 'cliente' ? 'from-primary to-primary-dark' : 'from-secondary to-secondary-dark'}`}>
                <User className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
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
              {activeTab === 'inventario' && <InventarioView />}
              {activeTab === 'configuracion' && <ConfiguracionView />}
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
