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
  Menu,
  Users,
  Copy,
  QrCode,
  CreditCard,
  Zap,
  MessageSquare,
  Workflow,
  Brain,
  LayoutList,
  ExternalLink,
  TrendingUp as TrendingUpIcon,
  Phone as PhoneIcon,
  CheckCircle2 as CheckCircleIcon,
  Archive as ArchiveIcon,
  Lock
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
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment'>('cart');
  const [selectedPayment, setSelectedPayment] = useState<'yape' | 'plin' | 'bcp' | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const products = [
    // --- COMIDA ---
    { 
      id: 1, 
      name: "Cebiche Clásico", 
      price: 35, 
      image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=800&auto=format&fit=crop", 
      category: "Comida",
      description: "Pescado fresco del día marinado en limón de pica, acompañado de camote glaseado, choclo desgranado y canchita serrana."
    },
    { 
      id: 2, 
      name: "Lomo Saltado", 
      price: 42, 
      image: "https://images.unsplash.com/photo-1594179047519-f347310d3322?w=800&auto=format&fit=crop", 
      category: "Comida",
      description: "Trozos de lomo fino salteados al wok con cebolla roja, tomate, ají amarillo y un toque de cilantro. Servido con papas fritas y arroz blanco."
    },
    { 
      id: 3, 
      name: "Pizza Artesanal", 
      price: 38, 
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop", 
      category: "Comida",
      description: "Masa madre, salsa de tomate italiana, mozzarella fresca, albahaca y aceite de oliva extra virgen."
    },
    { 
      id: 4, 
      name: "Hamburguesa Gourmet", 
      price: 28, 
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop", 
      category: "Comida",
      description: "200g de carne Angus, queso cheddar fundido, tocino crocante, cebolla caramelizada y salsa secreta en pan brioche."
    },

    // --- TECNOLOGÍA ---
    { 
      id: 5, 
      name: "Audífonos Wireless Pro", 
      price: 599, 
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop", 
      category: "Tecnología",
      description: "Cancelación activa de ruido, 40 horas de batería y sonido de alta fidelidad. Diseño ergonómico premium."
    },
    { 
      id: 6, 
      name: "Smartwatch Series X", 
      price: 850, 
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop", 
      category: "Tecnología",
      description: "Monitor de salud avanzado, GPS integrado, resistencia al agua 50m y pantalla Always-On Retina."
    },
    { 
      id: 7, 
      name: "Teclado Mecánico RGB", 
      price: 320, 
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&auto=format&fit=crop", 
      category: "Tecnología",
      description: "Switches mecánicos ultra rápidos, retroiluminación RGB personalizable y estructura de aluminio aeroespacial."
    },
    { 
      id: 8, 
      name: "Cámara Mirrorless 4K", 
      price: 2450, 
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop", 
      category: "Tecnología",
      description: "Sensor Full Frame, grabación 4K a 60fps, enfoque automático por ojo y estabilización de imagen de 5 ejes."
    },

    // --- HOGAR ---
    { 
      id: 9, 
      name: "Lámpara Nórdica", 
      price: 145, 
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop", 
      category: "Hogar",
      description: "Diseño minimalista en madera y metal. Luz cálida regulable, ideal para salas de estar o dormitorios."
    },
    { 
      id: 10, 
      name: "Set de Cerámica", 
      price: 180, 
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop", 
      category: "Hogar",
      description: "Juego de 4 tazas y 4 platos hechos a mano. Acabado mate elegante y resistente al microondas."
    },
    { 
      id: 11, 
      name: "Difusor Ultrasónico", 
      price: 95, 
      image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop", 
      category: "Hogar",
      description: "Humidificador y difusor de aceites esenciales con luces LED de colores. Silencioso y con apagado automático."
    },
    { 
      id: 12, 
      name: "Manta de Algodón", 
      price: 120, 
      image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&auto=format&fit=crop", 
      category: "Hogar",
      description: "Tejido suave 100% algodón orgánico. Perfecta para el sofá, disponible en tonos tierra."
    },

    // --- MASCOTAS ---
    { 
      id: 13, 
      name: "Cama Ortopédica", 
      price: 165, 
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop", 
      category: "Mascotas",
      description: "Espuma viscoelástica para el soporte de articulaciones. Funda lavable y base antideslizante."
    },
    { 
      id: 14, 
      name: "Rascador Multinivel", 
      price: 210, 
      image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&auto=format&fit=crop", 
      category: "Mascotas",
      description: "Torre para gatos con postes de sisal, hamaca y juguetes colgantes. Estructura estable y robusta."
    },
    { 
      id: 15, 
      name: "Dispensador Inteligente", 
      price: 340, 
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop", 
      category: "Mascotas",
      description: "Programación de comidas desde el celular, cámara HD integrada y grabación de voz para llamar a tu mascota."
    },
    { 
      id: 16, 
      name: "Set de Juguetes", 
      price: 45, 
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop", 
      category: "Mascotas",
      description: "Pack de 5 juguetes variados (cuerda, pelota, peluche con sonido). Materiales seguros y duraderos."
    },

    // --- ROPA ---
    { 
      id: 17, 
      name: "Polera Oversize", 
      price: 85, 
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop", 
      category: "Ropa",
      description: "Algodón pesado de alta calidad. Corte moderno y cómodo.",
      hasSizes: true,
      hasColors: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Negro", "Blanco", "Gris", "Azul"]
    },
    { 
      id: 18, 
      name: "Jeans Slim Fit", 
      price: 120, 
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop", 
      category: "Ropa",
      description: "Denim elástico premium. Ajuste perfecto y durabilidad garantizada.",
      hasSizes: true,
      hasColors: true,
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Azul Oscuro", "Celeste", "Negro"]
    },
    { 
      id: 19, 
      name: "Casaca Cortaviento", 
      price: 150, 
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop", 
      category: "Ropa",
      description: "Material impermeable y ligero. Ideal para actividades al aire libre.",
      hasSizes: true,
      hasColors: true,
      sizes: ["S", "M", "L"],
      colors: ["Verde", "Negro", "Rojo"]
    },
    { 
      id: 20, 
      name: "Vestido de Verano", 
      price: 95, 
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop", 
      category: "Ropa",
      description: "Tela fresca y ligera con estampado floral. Diseño femenino y elegante.",
      hasSizes: true,
      hasColors: true,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Rosa", "Azul", "Blanco"]
    },

    // --- ZAPATILLAS ---
    { 
      id: 21, 
      name: "Adidas Samba OG", 
      price: 450, 
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop", 
      category: "Zapatillas",
      description: "Un ícono del fútbol sala convertido en leyenda urbana. Cuero premium y suela de caucho color caramelo.",
      hasSizes: true,
      hasColors: true,
      sizes: ["38", "39", "40", "41", "42", "43"],
      colors: ["Blanco/Negro", "Negro/Blanco", "Verde/Blanco"]
    },
    { 
      id: 22, 
      name: "Nike Air Force 1", 
      price: 480, 
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop", 
      category: "Zapatillas",
      description: "El clásico de clásicos. Amortiguación Air y estilo atemporal en cuero blanco.",
      hasSizes: true,
      hasColors: true,
      sizes: ["38", "39", "40", "41", "42", "43", "44"],
      colors: ["Blanco", "Negro", "Gris"]
    },
    { 
      id: 23, 
      name: "New Balance 550", 
      price: 520, 
      image: "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbb?w=800&auto=format&fit=crop", 
      category: "Zapatillas",
      description: "Estilo retro de básquetbol de los 80. Comodidad y diseño premium para el día a día.",
      hasSizes: true,
      hasColors: true,
      sizes: ["39", "40", "41", "42", "43"],
      colors: ["Blanco/Azul", "Blanco/Verde", "Blanco/Gris"]
    },
    { 
      id: 24, 
      name: "Converse Chuck 70", 
      price: 280, 
      image: "https://images.unsplash.com/photo-1597040966242-488c721aa6f0?w=800&auto=format&fit=crop", 
      category: "Zapatillas",
      description: "La versión premium de las clásicas All Star. Lona más gruesa y plantilla acolchada.",
      hasSizes: true,
      hasColors: true,
      sizes: ["36", "37", "38", "39", "40", "41", "42"],
      colors: ["Negro", "Blanco", "Azul", "Rojo"]
    },
  ];

  const addToCart = (product: any, quantity: number, size?: string, color?: string) => {
    setCart(prev => {
      const cartItemId = `${product.id}-${size || ''}-${color || ''}`;
      const existing = prev.find(item => item.cartItemId === cartItemId);
      
      if (existing) {
        return prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, cantidad: item.cantidad + quantity } 
            : item
        );
      }
      
      return [...prev, { 
        ...product, 
        cartItemId,
        cantidad: quantity,
        selectedSize: size,
        selectedColor: color
      }];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.price * item.cantidad), 0);

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    const itemsSummary = cart.map(item => {
      let details = `${item.cantidad}x ${item.name}`;
      if (item.selectedSize) details += ` (Talla: ${item.selectedSize})`;
      if (item.selectedColor) details += ` (Color: ${item.selectedColor})`;
      details += ` - S/ ${item.price * item.cantidad}.00`;
      return details;
    }).join('\n');

    const paymentInfo = selectedPayment === 'yape' ? 'Yape' : selectedPayment === 'plin' ? 'Plin' : 'Transferencia BCP';
    
    try {
      const { data: insertedOrder, error } = await supabase.from('pedidos').insert([
        {
          cliente_nombre: 'Cliente Demo',
          telefono: 'Demo-999',
          items: JSON.stringify(cart.map(item => ({ 
            nombre: item.name, 
            cantidad: item.cantidad, 
            precio: `S/ ${item.price}.00`,
            talla: item.selectedSize,
            color: item.selectedColor
          }))),
          total: totalCart,
          estado: 'nuevo',
          origen: 'web',
          metodo_pago: paymentInfo
        }
      ]).select();

      if (error) throw error;

      const orderId = insertedOrder?.[0]?.id || 'N/A';
      
      const waMessage = encodeURIComponent(
        `¡Hola MarIA! 👋\n\nID de Pedido: #${orderId}\n\n*Productos:*\n${itemsSummary}\n\n*Total:* S/ ${totalCart}.00\n*Método de Pago:* ${paymentInfo}\n\n_He realizado el pedido y en breve realizaré el pago._`
      );
      const waUrl = `https://wa.me/51975736687?text=${waMessage}`;

      setCart([]);
      setIsCartOpen(false);
      setCheckoutStep('cart');
      setSelectedPayment(null);
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
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedQuantity(1);
                  setSelectedSize('');
                  setSelectedColor('');
                }}
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
                <p className="text-sm lg:text-lg text-text-muted leading-relaxed mb-6 lg:mb-8 font-medium">
                  {selectedProduct.description}
                </p>

                {/* Selection Options */}
                <div className="space-y-6 mb-8">
                  {/* Quantity Selector */}
                  <div>
                    <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-3">Cantidad</div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-text-main" />
                      </button>
                      <span className="text-lg font-black w-8 text-center">{selectedQuantity}</span>
                      <button 
                        onClick={() => setSelectedQuantity(q => q + 1)}
                        className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-text-main" />
                      </button>
                    </div>
                  </div>

                  {/* Size Selector */}
                  {selectedProduct.hasSizes && (
                    <div>
                      <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-3">Talla</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size: string) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${selectedSize === size ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-text-muted hover:bg-gray-100'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selector */}
                  {selectedProduct.hasColors && (
                    <div>
                      <div className="text-[10px] font-bold text-text-light uppercase tracking-widest mb-3">Color</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color: string) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${selectedColor === color ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-text-muted hover:bg-gray-100'}`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 lg:gap-8 border-t border-gray-50 pt-8">
                  <div>
                    <div className="text-[10px] lg:text-xs font-bold text-text-light uppercase tracking-widest mb-1">Total Parcial</div>
                    <div className="text-2xl lg:text-3xl font-black text-primary">S/ {selectedProduct.price * selectedQuantity}.00</div>
                  </div>
                  <button 
                    onClick={() => {
                      if ((selectedProduct.hasSizes && !selectedSize) || (selectedProduct.hasColors && !selectedColor)) {
                        alert('Por favor selecciona talla y color');
                        return;
                      }
                      addToCart(selectedProduct, selectedQuantity, selectedSize, selectedColor);
                      setSelectedProduct(null);
                      setSelectedQuantity(1);
                      setSelectedSize('');
                      setSelectedColor('');
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
                <div className="flex items-center gap-3">
                  {checkoutStep === 'payment' && (
                    <button 
                      onClick={() => setCheckoutStep('cart')}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                  <h3 className="text-2xl font-black text-text-main">
                    {checkoutStep === 'cart' ? 'Tu Canasta' : 'Método de Pago'}
                  </h3>
                </div>
                <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                {checkoutStep === 'cart' ? (
                  cart.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-gray-300" />
                      </div>
                      <p className="text-text-muted font-bold">Tu canasta está vacía</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.cartItemId} className="flex gap-5 bg-gray-50 p-5 rounded-3xl border border-gray-100 group relative">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-text-main">{item.name}</h4>
                            <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-400 hover:text-red-600 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {item.selectedSize && (
                              <span className="text-[9px] font-black bg-white px-2 py-1 rounded-lg border border-gray-100 text-primary uppercase tracking-tighter">Talla: {item.selectedSize}</span>
                            )}
                            {item.selectedColor && (
                              <span className="text-[9px] font-black bg-white px-2 py-1 rounded-lg border border-gray-100 text-secondary uppercase tracking-tighter">Color: {item.selectedColor}</span>
                            )}
                          </div>
                          <div className="text-xs text-text-muted mb-3">S/ {item.price}.00 x {item.cantidad}</div>
                          <div className="font-black text-primary">S/ {item.price * item.cantidad}.00</div>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'yape', label: 'Yape', color: 'bg-[#742284]' },
                        { id: 'plin', label: 'Plin', color: 'bg-[#00D1FF]' },
                        { id: 'bcp', label: 'BCP', color: 'bg-[#002A54]' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id as any)}
                          className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                            selectedPayment === method.id 
                              ? `border-primary bg-primary/5` 
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className={`w-10 h-10 ${method.color} rounded-xl flex items-center justify-center text-white font-black text-[10px]`}>
                            {method.label[0]}
                          </div>
                          <span className="text-[10px] font-black text-text-main uppercase">{method.label}</span>
                        </button>
                      ))}
                    </div>

                    {selectedPayment && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 space-y-6"
                      >
                        {selectedPayment !== 'bcp' ? (
                          <div className="text-center space-y-4">
                            <div className="w-40 h-40 bg-white p-4 rounded-3xl mx-auto shadow-sm border border-gray-100 flex items-center justify-center">
                              <QrCode className="w-32 h-32 text-gray-200" />
                            </div>
                            <div className="space-y-1">
                              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número de Celular</div>
                              <div className="flex items-center justify-center gap-3">
                                <span className="text-xl font-black text-text-main">975 736 687</span>
                                <button 
                                  onClick={() => copyToClipboard('975736687', 'phone')}
                                  className="p-2 hover:bg-white rounded-lg transition-colors text-primary"
                                >
                                  {copied === 'phone' ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="space-y-4">
                              <div className="space-y-1">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número de Cuenta BCP</div>
                                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100">
                                  <span className="font-bold text-text-main">191-98765432-0-12</span>
                                  <button 
                                    onClick={() => copyToClipboard('19198765432012', 'bcp')}
                                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-primary"
                                  >
                                    {copied === 'bcp' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CCI</div>
                                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100">
                                  <span className="font-bold text-text-main">002-19198765432012-54</span>
                                  <button 
                                    onClick={() => copyToClipboard('0021919876543201254', 'cci')}
                                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-primary"
                                  >
                                    {copied === 'cci' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                              <Info className="w-5 h-5 text-blue-500 shrink-0" />
                              <p className="text-[10px] text-blue-700 font-medium leading-tight">
                                Titular: GaorSystem SAC. Recuerda enviar el comprobante por WhatsApp.
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-text-muted">Total a pagar:</span>
                  <span className="text-3xl font-black text-text-main">S/ {totalCart}.00</span>
                </div>
                
                {checkoutStep === 'cart' ? (
                  <button 
                    onClick={() => setCheckoutStep('payment')}
                    disabled={cart.length === 0}
                    className={`w-full py-6 rounded-[24px] font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${
                      cart.length === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary-dark text-white shadow-primary/30'
                    }`}
                  >
                    Confirmar Pedido
                    <ArrowRight className="w-6 h-6" />
                  </button>
                ) : (
                  <button 
                    onClick={handleCheckout}
                    disabled={!selectedPayment || isCheckingOut}
                    className={`w-full py-6 rounded-[24px] font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4 ${
                      isCheckingOut || !selectedPayment
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-secondary hover:bg-secondary-dark text-white shadow-secondary/30'
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Finalizar y Enviar a WhatsApp
                        <MessageCircle className="w-6 h-6" />
                      </>
                    )}
                  </button>
                )}
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
    { role: 'bot', text: '¡Hola! Soy MarIA 👋. Esta es una demostración de cómo recibo y proceso un pedido automáticamente.\n\n¿En qué rubro te gustaría probar mi potencia hoy? (Comida, Tecnología, Ropa, etc.)', time: '10:42 AM' },
  ]);

  // Simulación de flujo multi-rubro
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [...prev, 
          { role: 'user', text: 'Quiero ver cómo manejas un pedido de tecnología.', time: '10:43 AM' },
          { 
            role: 'bot', 
            text: '¡Excelente elección! 💻 Como asistente inteligente, puedo gestionar catálogos complejos, tallas, colores o especificaciones técnicas.\n\nSi haces un pedido en la pestaña "Tienda", verás cómo capturo cada detalle al instante.',
            time: '10:44 AM'
          }
        ]);
        setIsTyping(false);
      }, 2000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
    <DemoGuide 
      title="Cerebro IA: MarIA (Asesora Consultiva)"
      description="MarIA no es un bot común. Utiliza un Agente de IA con Memoria y un flujo consultivo diseñado para escuchar, validar y orientar al cliente antes de ofrecer una solución. Esto genera confianza y ventas naturales."
      steps={[
        "Escuchar: Entiende la necesidad real",
        "Validar: Confirma los puntos de dolor",
        "Orientar: Ofrece la solución ideal",
        "Cerrar: Genera el lead o la venta"
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
                  <img src="https://ais-dev-bbnhhu7v5wsigapxxwldvn-128001582731.us-east1.run.app/logo.png" alt="Logo" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" onError={(e) => { (e.target as any).src = 'https://picsum.photos/seed/maria/100/100' }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1">
                    MarIA Asesora
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
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-text-main">Cerebro Olivia (n8n + AI)</h3>
          </div>
          
          <div className="space-y-8">
            {[
              { t: "Memoria de Corto Plazo", d: "Recuerda el historial de la charla para dar respuestas coherentes y personalizadas.", i: Workflow },
              { t: "Venta Consultiva", d: "Sigue un flujo de 4 pasos: Escuchar, Validar, Orientar y Ofrecer.", i: MessageSquare },
              { t: "Personalidad Olivia", d: "Cálida, breve (máx 4 líneas) y empática. Habla como una persona real.", i: Sparkles }
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
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main">Cerebro IA (MarIA)</h3>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Motor de IA</label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-black text-text-main">GPT-4.1-mini</div>
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Agente con Memoria</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Prompt del Sistema (MarIA)</label>
              <div className="p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-[10px] lg:text-xs text-text-muted leading-relaxed italic">
                  "Eres MarIA, la asistente virtual de esta Demo Suite. Tu objetivo es demostrar que puedes gestionar pedidos de CUALQUIER rubro. Identifícate siempre como una demo tecnológica..."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-text-main">Memoria de Sesión</div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-text-main">Venta Consultiva Natural</div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integraciones Avanzadas */}
        <div className="bg-white border border-gray-100 p-6 lg:p-10 rounded-[30px] lg:rounded-[40px] shadow-sm lg:col-span-2">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-text-main">Integraciones y Automatización</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-text-main">Evolution API</div>
                    <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Conectado</div>
                  </div>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Conexión activa con tu instancia de WhatsApp. MarIA recibe y envía mensajes automáticamente a través de esta API.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Workflow className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-text-main">n8n Workflow</div>
                    <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Activo</div>
                  </div>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Flujos de trabajo automatizados para procesar pedidos, actualizar inventario y enviar notificaciones personalizadas.
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
  const [activeRole, setActiveRole] = useState<'cliente' | 'emprendedor'>('cliente');
  const [activeTab, setActiveTab] = useState('tienda');
  const [crmProspectos, setCrmProspectos] = useState([
    { id: '1', telefono: '+51 987 654 321', interes_web: 'ERP para Constructora', ultimo_mensaje_ia: 'El cliente necesita gestionar 5 obras en simultáneo.', estado: 'Nuevo', puntuacion_calidad: 95 },
    { id: '2', telefono: '+51 912 345 678', interes_web: 'E-commerce de Ropa', ultimo_mensaje_ia: 'Busca integración con pasarelas de pago peruanas.', estado: 'Calificado', puntuacion_calidad: 78 },
    { id: '3', telefono: '+51 955 444 333', interes_web: 'App de Delivery', ultimo_mensaje_ia: 'Solo preguntaba precios por curiosidad.', estado: 'Cerrado', puntuacion_calidad: 45 },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRoleAnnouncement, setShowRoleAnnouncement] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment'>('cart');
  const [selectedPayment, setSelectedPayment] = useState<'yape' | 'plin' | 'bcp' | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Handle role change and set default tab for each role
  const handleRoleChange = (role: 'cliente' | 'emprendedor') => {
    setActiveRole(role);
    setActiveTab(role === 'cliente' ? 'tienda' : 'gestion');
    setIsSidebarOpen(false);
  };

  const verifyPassword = () => {
    if (passwordInput === 'Admin2702') {
      setActiveTab('crm');
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-text-main flex overflow-hidden font-sans relative">
      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-[40px] p-10 relative z-10 shadow-2xl border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-secondary" />
                </div>
                <h2 className="text-2xl font-black text-text-main mb-2 tracking-tighter">Acceso Restringido</h2>
                <p className="text-sm text-text-muted font-medium mb-8">Ingresa la clave maestra para acceder al Panel Administrativo.</p>
                
                <div className="w-full space-y-4">
                  <div className="relative">
                    <input 
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                      placeholder="••••••••"
                      className={`w-full px-6 py-4 bg-gray-50 border-2 rounded-2xl text-center text-xl font-black tracking-[0.5em] outline-none transition-all ${passwordError ? 'border-red-500 animate-shake' : 'border-gray-100 focus:border-secondary focus:bg-white'}`}
                      autoFocus
                    />
                    {passwordError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-2"
                      >
                        Clave incorrecta
                      </motion.div>
                    )}
                  </div>
                  
                  <button 
                    onClick={verifyPassword}
                    className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-sm shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Verificar Clave
                  </button>
                  <button 
                    onClick={() => setShowPasswordModal(false)}
                    className="w-full py-4 text-gray-400 font-black text-xs uppercase tracking-widest hover:text-text-main transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Role Announcement Modal */}
      <AnimatePresence>
        {showRoleAnnouncement && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRoleAnnouncement(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm lg:max-w-md rounded-[32px] lg:rounded-[40px] p-5 lg:p-12 shadow-2xl text-center overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 w-full h-1 lg:h-2 bg-gradient-to-r from-primary to-secondary" />
              
              <div className="w-12 h-12 lg:w-20 lg:h-20 bg-gray-50 rounded-[20px] lg:rounded-[32px] flex items-center justify-center mx-auto mb-4 lg:mb-8 shadow-inner">
                <Users className="w-6 h-6 lg:w-10 lg:h-10 text-primary" />
              </div>

              <h2 className="text-xl lg:text-3xl font-black text-text-main mb-2 lg:mb-4 leading-tight">¡Bienvenido a MarIA!</h2>
              <p className="text-text-muted text-sm lg:text-lg mb-4 lg:mb-10 font-medium leading-relaxed px-2">
                Esta Demo Suite tiene <span className="text-primary font-black">dos modos</span> para que explores todo el potencial:
              </p>

              <div className="grid gap-2 lg:gap-4 mb-6 lg:mb-10 text-left">
                <div className="p-3 lg:p-5 bg-primary/5 rounded-2xl lg:rounded-3xl border border-primary/10 flex items-start gap-3 lg:gap-4">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-primary text-[10px] lg:text-sm uppercase tracking-wider mb-0.5 lg:mb-1">Modo Cliente</div>
                    <p className="text-[9px] lg:text-xs text-text-muted font-medium leading-tight">Interactúa con la IA, mira el catálogo y haz pedidos reales.</p>
                  </div>
                </div>

                <div className="p-3 lg:p-5 bg-secondary/5 rounded-2xl lg:rounded-3xl border border-secondary/10 flex items-start gap-3 lg:gap-4">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-secondary rounded-xl lg:rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-secondary/20">
                    <Briefcase className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-black text-secondary text-[10px] lg:text-sm uppercase tracking-wider mb-0.5 lg:mb-1">Modo Dueño</div>
                    <p className="text-[9px] lg:text-xs text-text-muted font-medium leading-tight">Gestiona ventas, inventario y configura la personalidad de tu IA.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowRoleAnnouncement(false)}
                className="w-full bg-text-main text-white py-3.5 lg:py-5 rounded-[18px] lg:rounded-[24px] font-black text-sm lg:text-lg shadow-xl hover:scale-[1.02] transition-all active:scale-95"
              >
                ¡Entendido!
              </button>
              
              <p className="mt-4 lg:mt-6 text-[8px] lg:text-[11px] font-bold text-text-light uppercase tracking-widest leading-tight">
                Cambia de modo en cualquier momento desde la barra lateral
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
        fixed inset-y-0 left-0 w-72 lg:w-80 bg-white border-r border-gray-100 flex flex-col p-6 lg:p-10 shrink-0 shadow-sm z-[70] transition-transform duration-300 lg:relative lg:translate-x-0
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
                icon={LayoutList} 
                label="CRM Admin" 
                active={activeTab === 'crm'} 
                onClick={() => { 
                  if (activeTab !== 'crm') {
                    setShowPasswordModal(true);
                  }
                  setIsSidebarOpen(false); 
                }} 
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
        <div className="flex-1 overflow-y-auto p-4 lg:p-12 custom-scrollbar">
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
          {activeTab === 'crm' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <DemoGuide 
                title="CRM Admin: El Cierre Maestro"
                description="Aquí es donde MarIA te entrega el trabajo listo. Los prospectos se califican automáticamente por IA y se ordenan por calidad. Tu única tarea es hacer clic en el enlace de WhatsApp y cerrar el contrato. Acceso protegido para tu seguridad."
                steps={[
                  "MarIA califica al prospecto en tiempo real",
                  "Los prospectos calientes (>80) resaltan en verde",
                  "Un clic te lleva directo al cierre en WhatsApp"
                ]}
                color="primary"
              />
              <div className="bg-white border border-gray-100 rounded-[30px] lg:rounded-[40px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-50 bg-gray-50/30">
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Prospecto</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Interés / IA</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Calidad</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                        <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {crmProspectos.map((p) => (
                        <tr key={p.id} className={`transition-all hover:bg-gray-50/50 ${p.estado === 'Cerrado' ? 'opacity-50 grayscale' : ''}`}>
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <PhoneIcon className="w-4 h-4 text-gray-400" />
                              </div>
                              <div className="text-sm font-black text-text-main">{p.telefono}</div>
                            </div>
                          </td>
                          <td className="p-6">
                            <div className="text-xs font-bold text-primary mb-1">{p.interes_web}</div>
                            <div className="text-[10px] text-text-muted italic line-clamp-1">"{p.ultimo_mensaje_ia}"</div>
                          </td>
                          <td className="p-6">
                            <div className="flex items-center gap-2">
                              <div className={`text-lg font-black ${p.puntuacion_calidad > 80 ? 'text-green-500' : 'text-text-main'}`}>
                                {p.puntuacion_calidad}
                              </div>
                              <TrendingUpIcon className={`w-4 h-4 ${p.puntuacion_calidad > 80 ? 'text-green-500' : 'text-gray-300'}`} />
                            </div>
                          </td>
                          <td className="p-6">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border ${
                              p.estado === 'Cerrado' ? 'bg-gray-100 text-gray-400 border-gray-200' :
                              p.estado === 'Nuevo' && p.puntuacion_calidad > 80 ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                              'bg-primary/5 text-primary border-primary/10'
                            }`}>
                              {p.estado}
                            </span>
                          </td>
                          <td className="p-6">
                            <button className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-green-500/20">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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
