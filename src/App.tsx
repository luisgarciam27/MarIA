import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShoppingBag, BarChart3, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { supabase } from './lib/supabase';

const Logo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 8 C36 8 24 22 24 40 L24 68 C24 72 27 75 30 75 L70 75 C73 75 76 72 76 68 L76 40 C76 22 64 8 50 8 Z" fill="#7C3AED"/>
    <ellipse cx="50" cy="44" rx="16" ry="20" fill="#34D399"/>
    <circle cx="50" cy="44" r="8" fill="#5B21B6"/>
    <circle cx="46" cy="40" r="2.5" fill="rgba(255,255,255,0.4)"/>
    <path d="M24 58 C14 62 12 72 12 72 C20 70 24 68 24 68 Z" fill="#7C3AED"/>
    <path d="M76 58 C86 62 88 72 88 72 C80 70 76 68 76 68 Z" fill="#7C3AED"/>
    <rect x="36" y="74" width="9" height="12" rx="4" fill="#7C3AED"/>
    <rect x="55" y="74" width="9" height="12" rx="4" fill="#7C3AED"/>
    <path d="M50 8 C44 8 38 14 36 20 L64 20 C62 14 56 8 50 8 Z" fill="#F472B6"/>
  </svg>
);

const Navbar = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10"><Logo /></div>
          <span className="font-display text-xl font-extrabold tracking-tight text-text-main">Mar<em className="text-primary not-italic">IA</em></span>
          <span className="text-[0.65rem] text-text-light tracking-widest font-medium ml-1">by GaorSystem</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#soluciones" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Soluciones</a>
          <a href="#precios" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Precios</a>
          <a href="#faq" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">FAQ</a>
          <button onClick={onOpenWhatsApp} className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5">
            Quiero MarIA 💬
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => (
  <section className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden grad-bg text-center">
    <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px] -top-24 -right-36 animate-drift" />
    <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[80px] -bottom-20 -left-24 animate-drift [animation-direction:reverse]" />
    
    <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="w-20 h-20 animate-float drop-shadow-2xl"><Logo /></div>
        <div className="font-display text-4xl font-extrabold tracking-tighter text-text-main">Mar<em className="text-primary not-italic">IA</em></div>
      </div>

      <div className="inline-flex items-center gap-2 bg-white border border-primary/15 shadow-sm text-primary text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-blink" />
        La suite digital definitiva para emprendedores
      </div>

      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tighter text-text-main mb-8">
        Vende más, <span className="text-primary">atiende mejor</span><br/>
        y recupera tu tiempo.
      </h1>

      <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-2xl mx-auto mb-12">
        MarIA es la inteligencia artificial que gestiona tu tienda, responde a tus clientes y organiza tus ventas. <strong className="text-primary">Todo en automático.</strong>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <button onClick={onOpenWhatsApp} className="btn-primary">
          💬 Quiero MarIA para mi negocio
        </button>
        <a href="#soluciones" className="btn-secondary">
          Ver cómo funciona →
        </a>
      </div>

      {/* 4 Benefit Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {[
          { i: "🚀", t: "Vende en automático", d: "Tu tienda abierta 24/7" },
          { i: "🤖", t: "Atiende con IA", d: "Respuestas al instante" },
          { i: "📊", t: "Control total", d: "Panel de ventas potente" },
          { i: "⏱️", t: "Listo en 48h", d: "Instalación ultra rápida" }
        ].map((card, i) => (
          <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-all">
            <div className="text-3xl mb-3">{card.i}</div>
            <div className="font-bold text-sm text-text-main mb-1">{card.t}</div>
            <div className="text-[0.7rem] text-text-muted uppercase tracking-wider">{card.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-accent bg-accent-bg px-4 py-1.5 rounded-full border border-accent-light/15 mb-5">
          El problema
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main">
          ¿Tu negocio está <em className="font-serif italic font-normal text-accent">estancado</em>?
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            i: "📉",
            t: "Sin tienda profesional",
            d: "Vender por fotos sueltas en WhatsApp te hace ver informal y pierdes ventas por falta de confianza."
          },
          {
            i: "🔍",
            t: "No apareces en Google",
            d: "Si un cliente busca lo que vendes y no te encuentra, le está comprando a tu competencia ahora mismo."
          },
          {
            i: "😴",
            t: "No atiendes 24/7",
            d: "Si tardas más de 5 minutos en responder, el cliente ya se fue. No puedes estar pegado al celular todo el día."
          }
        ].map((item, i) => (
          <div key={i} className="bg-bg-main p-8 rounded-3xl border border-primary/5 relative group hover:border-accent/20 transition-all">
            <div className="text-4xl mb-6">{item.i}</div>
            <h3 className="font-bold text-xl text-text-main mb-4">{item.t}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-24 grad-bg relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
          ¿Cómo funciona MarIA?
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main">
          Tu negocio en <em className="font-serif italic font-normal text-primary">piloto automático</em>
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { n: "01", t: "El cliente entra", d: "Visita tu tienda profesional desde Instagram, Facebook o Google." },
          { n: "02", t: "MarIA atiende", d: "Responde dudas y toma el pedido por WhatsApp al instante." },
          { n: "03", t: "Pago rápido", d: "El cliente paga con Yape o Plin y envía el comprobante." },
          { n: "04", t: "Tú solo despachas", d: "Recibes el pedido listo en tu panel. ¡Venta cerrada!" }
        ].map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-primary/5 shadow-sm relative">
            <div className="font-display text-4xl font-black text-primary/10 absolute top-6 right-8">{step.n}</div>
            <h3 className="font-bold text-lg text-text-main mb-3 mt-4">{step.t}</h3>
            <p className="text-sm text-text-muted leading-relaxed">{step.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pillars = () => (
  <section id="soluciones" className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-20">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
          Los 4 Pilares de MarIA
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main">
          La tecnología que <em className="font-serif italic font-normal text-primary">hace crecer</em> tu empresa
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Pillar 1: Tienda */}
        <div className="bg-bg-main rounded-[40px] p-10 border border-primary/5 hover:border-primary/20 transition-all group">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">🛍️</div>
          <h3 className="font-display text-3xl font-extrabold text-text-main mb-4">Tienda Virtual</h3>
          <p className="text-text-muted leading-relaxed mb-6">Un catálogo profesional que enamora a tus clientes. Carrito de compras, filtros y buscador inteligente.</p>
          <ul className="space-y-3">
            {["Catálogo interactivo", "Carrito de compras", "Pago con Yape/Plin"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 2: Dashboard */}
        <div className="bg-bg-main rounded-[40px] p-10 border border-secondary/5 hover:border-secondary/20 transition-all group">
          <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">📊</div>
          <h3 className="font-display text-3xl font-extrabold text-text-main mb-4">Panel Admin</h3>
          <p className="text-text-muted leading-relaxed mb-6">Control total de tus ventas, clientes y stock. Toma decisiones basadas en datos reales, no en suposiciones.</p>
          <ul className="space-y-3">
            {["Reportes de ventas", "Gestión de pedidos", "Base de clientes"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                <CheckCircle2 className="w-5 h-5 text-secondary" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 3: Bot */}
        <div className="bg-bg-main rounded-[40px] p-10 border border-accent/5 hover:border-accent/20 transition-all group">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">💬</div>
          <h3 className="font-display text-3xl font-extrabold text-text-main mb-4">WhatsApp Bot</h3>
          <p className="text-text-muted leading-relaxed mb-6">Inteligencia Artificial que atiende como un experto. Resuelve dudas, envía precios y cierra ventas 24/7.</p>
          <ul className="space-y-3">
            {["IA con tono peruano", "Atención 24/7", "Cierre de ventas"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                <CheckCircle2 className="w-5 h-5 text-accent" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Pillar 4: Google Maps */}
        <div className="bg-bg-main rounded-[40px] p-10 border border-primary-dark/5 hover:border-primary-dark/20 transition-all group">
          <div className="w-14 h-14 bg-primary-dark rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-lg shadow-primary-dark/20 group-hover:scale-110 transition-transform">📍</div>
          <h3 className="font-display text-3xl font-extrabold text-text-main mb-4">Google Maps</h3>
          <p className="text-text-muted leading-relaxed mb-6">Aparece en los primeros resultados cuando alguien busque tu negocio. Atrae clientes locales a tu tienda física.</p>
          <ul className="space-y-3">
            {["Perfil optimizado", "Gestión de reseñas", "Mayor visibilidad local"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                <CheckCircle2 className="w-5 h-5 text-primary-dark" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const WhatsAppCatalog = () => {
  const products = [
    { name: "Cebiche Clásico", price: "S/ 35.00", image: "https://picsum.photos/seed/cebiche/400/400" },
    { name: "Lomo Saltado", price: "S/ 42.00", image: "https://picsum.photos/seed/lomo/400/400" },
    { name: "Arroz con Mariscos", price: "S/ 38.00", image: "https://picsum.photos/seed/mariscos/400/400" },
    { name: "Chicha Morada 1L", price: "S/ 15.00", image: "https://picsum.photos/seed/chicha/400/400" },
  ];

  const handleAddOrder = async (product: any) => {
    const { error } = await supabase.from('pedidos').insert([
      {
        cliente_nombre: 'Cliente Web',
        telefono: 'Web',
        items: JSON.stringify([{ nombre: product.name, cantidad: 1, precio: product.price }]),
        total: parseFloat(product.price.replace('S/ ', '')),
        estado: 'pendiente',
        origen: 'web'
      }
    ]);

    if (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu pedido.');
    } else {
      alert('¡Pedido enviado al Dashboard!');
    }
  };

  return (
    <section className="py-24 bg-bg-main overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
              Tu tienda en WhatsApp
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main mb-6">
              Catálogo <em className="font-serif italic font-normal text-primary">Interactivo</em>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              Tus clientes podrán navegar por tus productos con fotos reales, precios actualizados y descripciones tentadoras. MarIA se encarga de mostrarlo todo de forma profesional.
            </p>
            <div className="space-y-6">
              {[
                { t: "Sincronización Real", d: "Cambia un precio en tu panel y se actualiza en WhatsApp al instante." },
                { t: "Categorías Inteligentes", d: "Organiza tus productos por tipo para una navegación fluida." },
                { t: "Carrito Integrado", d: "El cliente selecciona lo que quiere y MarIA genera el pedido final." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <div className="font-bold text-text-main text-sm">{item.t}</div>
                    <div className="text-xs text-text-muted">{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative flex justify-center">
            {/* Phone Mockup */}
            <div className="w-[300px] h-[600px] bg-text-main rounded-[3rem] border-[8px] border-text-main shadow-2xl relative overflow-hidden">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] p-4 pt-8 text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg"><Logo /></div>
                <div>
                  <div className="text-xs font-bold">MarIA - Tu Restaurante</div>
                  <div className="text-[0.6rem] opacity-70">En línea</div>
                </div>
              </div>
              
              {/* WhatsApp Content */}
              <div className="bg-[#E5DDD5] h-full p-3 overflow-y-auto pb-20">
                <div className="bg-white rounded-lg p-2 shadow-sm mb-4 text-[0.7rem] max-w-[85%]">
                  ¡Hola! 👋 Aquí tienes nuestra carta de hoy. ¿Qué te gustaría pedir?
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {products.map((p, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border border-black/5">
                      <img src={p.image} alt={p.name} className="w-full h-24 object-cover" referrerPolicy="no-referrer" />
                      <div className="p-2">
                        <div className="text-[0.65rem] font-bold truncate">{p.name}</div>
                        <div className="text-[0.6rem] text-secondary font-bold">{p.price}</div>
                        <button onClick={() => handleAddOrder(p)} className="w-full mt-1 bg-primary/10 text-primary text-[0.55rem] font-bold py-1 rounded">
                          Añadir +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 bg-[#DCF8C6] rounded-lg p-2 shadow-sm ml-auto text-[0.7rem] max-w-[85%]">
                  Quiero un Cebiche Clásico y una Chicha Morada por favor.
                </div>
              </div>
              
              {/* WhatsApp Input */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 flex gap-2 items-center">
                <div className="flex-1 bg-bg-main rounded-full px-3 py-1.5 text-[0.6rem] text-text-light">Escribe un mensaje...</div>
                <div className="w-8 h-8 bg-[#128C7E] rounded-full flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-primary/10 animate-float">
              <div className="text-xs font-bold text-text-main mb-1">Nuevo Pedido! 🔔</div>
              <div className="text-[0.6rem] text-text-muted">Mesa 4 · S/ 50.00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const POS = () => (

  <section className="py-24 grad-bg overflow-hidden">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-primary/5 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="font-display font-bold text-xl">Cierre de Caja</div>
              <div className="text-secondary font-bold">S/ 1,450.00</div>
            </div>
            <div className="space-y-4 mb-8">
              {[
                { l: "Ventas Efectivo", v: "S/ 850.00" },
                { l: "Ventas Yape/Plin", v: "S/ 600.00" },
                { l: "Total Operaciones", v: "24" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-bg-main pb-3">
                  <span className="text-text-muted">{item.l}</span>
                  <span className="font-bold text-text-main">{item.v}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-text-main text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              🔒 Realizar Cierre de Caja
            </button>
          </div>
        </div>
        <div>
          <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
            Para negocios físicos
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main mb-6">
            Punto de Venta <em className="font-serif italic font-normal text-primary">(POS)</em>
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            Si tienes un local físico, MarIA también es para ti. Gestiona tus ventas presenciales, controla tu inventario y realiza cierres de caja perfectos en segundos.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { t: "Inventario", d: "Stock siempre al día" },
              { t: "Boletas", d: "Rápidas y simples" },
              { t: "Caja", d: "Control de ingresos" },
              { t: "Multiusuario", d: "Para todo tu equipo" }
            ].map((item, i) => (
              <div key={i}>
                <div className="font-bold text-text-main mb-1">{item.t}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Numbers = () => (
  <section className="py-24 px-6 text-center grad-bg">
    <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
      Resultados reales
    </div>
    <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-12">
      Los números<br/><em className="font-serif italic font-normal text-primary">hablan solos</em>
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-4xl mx-auto rounded-[20px] overflow-hidden shadow-[0_4px_40px_rgba(124,58,237,0.08)]">
      {[
        { n: "+40%", l: "Aumento promedio en ventas el primer mes", c: "text-primary" },
        { n: "91%", l: "Consultas atendidas automáticamente", c: "text-secondary-dark" },
        { n: "48h", l: "Para tener tu suite completa funcionando", c: "text-accent" },
        { n: "0", l: "Conocimientos técnicos necesarios", c: "text-primary-dark" }
      ].map((item, i) => (
        <div key={i} className="bg-white p-10 hover:bg-primary-bg transition-colors duration-300">
          <div className={`font-display text-4xl md:text-5xl font-extrabold mb-2 ${item.c}`}>{item.n}</div>
          <div className="text-xs text-text-muted leading-relaxed">{item.l}</div>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto text-center">
      <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
        Lo que dicen
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-12">
        Negocios peruanos<br/><em className="font-serif italic font-normal text-primary">que ya despegaron</em>
      </h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { q: "Antes perdía 10 pedidos al día porque no podía responder mientras cocinaba. Ahora MarIA los atiende todos. Mis ventas subieron 40% el primer mes.", n: "José Paredes", b: "🍽️ Cevichería Don Pepe · Lima", i: "JP", c: "primary" },
          { q: "MarIA habla como peruana, no como robot. Mis clientas no notan la diferencia y se quedan fascinadas cuando les cuento que es inteligencia artificial.", n: "Lucía Ríos", b: "✂️ Salón Bella · Arequipa", i: "LR", c: "secondary" },
          { q: "El panel me cambió la vida. Sé exactamente cuánto vendo, qué se mueve más y quiénes son mis mejores clientes. Antes no tenía ni idea.", n: "Miguel García", b: "🛒 Bodega La Esquina · Trujillo", i: "MG", c: "accent" }
        ].map((t, i) => (
          <div key={i} className={`bg-bg-main rounded-[20px] p-8 border border-primary/10 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(124,58,237,0.1)] hover:border-${t.c}/30`}>
            <div className={`text-sm tracking-widest mb-3 text-${t.c === 'secondary' ? 'secondary-dark' : t.c}`}>★★★★★</div>
            <div className="font-serif text-4xl leading-none mb-1 opacity-15 text-primary">"</div>
            <p className="text-sm leading-relaxed text-text-muted italic mb-6">{t.q}</p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${t.c === 'primary' ? 'bg-primary-bg text-primary' : t.c === 'secondary' ? 'bg-secondary-bg text-secondary-dark' : 'bg-accent-bg text-accent'}`}>{t.i}</div>
              <div>
                <div className="font-bold text-sm text-text-main">{t.n}</div>
                <div className="text-xs text-text-light">{t.b}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => (
  <section id="precios" className="py-24 px-6 grad-bg">
    <div className="max-w-6xl mx-auto text-center">
      <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
        Planes y Precios
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main mb-12">
        Elige el plan ideal para <em className="font-serif italic font-normal text-primary">tu crecimiento</em>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Plan Virtual */}
        <div className="bg-white rounded-[40px] p-10 border border-primary/10 shadow-sm hover:shadow-xl transition-all relative overflow-hidden">
          <div className="font-display text-2xl font-extrabold text-text-main mb-2">Plan Virtual</div>
          <p className="text-sm text-text-muted mb-8">Para negocios que venden 100% online.</p>
          <div className="flex items-baseline gap-2 mb-8 justify-center">
            <span className="text-4xl font-extrabold text-primary">S/ 349</span>
            <span className="text-xs text-text-light font-bold uppercase tracking-widest">Pago Único</span>
          </div>
          <ul className="text-left space-y-4 mb-10">
            {["Tienda Virtual completa", "Bot WhatsApp Básico", "Panel de Administración", "URL maria.pe/tunegocio", "Soporte técnico"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-text-main">
                <CheckCircle2 className="w-5 h-5 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <button onClick={onOpenWhatsApp} className="btn-primary w-full">Elegir Plan Virtual</button>
        </div>

        {/* Plan Completo */}
        <div className="bg-text-main rounded-[40px] p-10 border border-primary/20 shadow-2xl relative overflow-hidden transform md:scale-105 z-10">
          <div className="absolute top-0 right-0 bg-primary text-white text-[0.6rem] font-bold px-4 py-1.5 rounded-bl-2xl uppercase tracking-widest">Recomendado</div>
          <div className="font-display text-2xl font-extrabold text-white mb-2">Plan Completo</div>
          <p className="text-sm text-white/60 mb-8">Para negocios con local físico y ambición.</p>
          <div className="flex items-baseline gap-2 mb-8 justify-center">
            <span className="text-4xl font-extrabold text-white">Consultar</span>
          </div>
          <ul className="text-left space-y-4 mb-10">
            {["Todo lo del Plan Virtual", "Punto de Venta (POS)", "Google Maps Optimizado", "Bot WhatsApp Avanzado", "Capacitación VIP"].map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                <CheckCircle2 className="w-5 h-5 text-secondary" /> {f}
              </li>
            ))}
          </ul>
          <button onClick={onOpenWhatsApp} className="bg-primary hover:bg-primary-dark text-white w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2">Consultar por WhatsApp</button>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-16">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
          El Proceso
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-main">
          De cero a digital en <em className="font-serif italic font-normal text-primary">5 pasos</em>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/5 -translate-y-1/2 hidden md:block" />
        <div className="grid md:grid-cols-5 gap-8 relative z-10">
          {[
            { n: "1", t: "Contacto", d: "Hablamos por WhatsApp sobre tu negocio." },
            { n: "2", t: "Configuración", d: "Armamos tu tienda y entrenamos a tu bot." },
            { n: "3", t: "Capacitación", d: "Te enseñamos a usar tu nuevo panel." },
            { n: "4", t: "Pruebas", d: "Validamos que todo funcione perfecto." },
            { n: "5", t: "Lanzamiento", d: "¡Empiezas a vender en automático!" }
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg shadow-primary/20">{step.n}</div>
              <h3 className="font-bold text-text-main mb-2">{step.t}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "¿Necesito saber de tecnología para usar MarIA?", a: "Para nada. Nosotros configuramos todo: la tienda, el bot y el panel. Solo necesitas darnos info de tu negocio y en 48 horas está todo listo. El panel es tan fácil como usar WhatsApp." },
    { q: "¿Mis clientes van a notar que es un bot?", a: "MarIA está entrenada para hablar en español peruano de forma natural y cálida. La gran mayoría de clientes no nota la diferencia. Y cuando una consulta es muy compleja, MarIA te avisa para que intervengas tú." },
    { q: "¿Puedo cambiar mis productos y precios después?", a: "Sí, desde tu panel puedes actualizar el catálogo cuando quieras: agregar productos, cambiar precios, subir fotos. Sin necesitar ayuda técnica." },
    { q: "¿Tienen garantía?", a: "Sí. Si en los primeros 15 días no ves que MarIA ayuda a tu negocio, te devolvemos tu inversión completa. Sin preguntas y sin letras chicas." },
    { q: "¿Para qué tipo de negocios funciona MarIA?", a: "Para cualquier negocio que use WhatsApp: restaurantes, salones, bodegas, tiendas, farmacias, consultorios y más. Si tienes dudas sobre tu rubro, escríbenos y te decimos en minutos." }
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-bg-main">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
          Preguntas frecuentes
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-12">
          Resolvemos tus<br/><em className="font-serif italic font-normal text-primary">dudas ahora</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-primary/10 p-6 shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left font-semibold text-[0.95rem] text-text-main hover:text-primary transition-colors gap-3"
              >
                {faq.q}
                <span className="text-primary text-lg shrink-0">{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-text-muted leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => (
  <section className="py-32 px-6 text-center grad-bg relative overflow-hidden">
    <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    <div className="relative z-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="w-16 h-16 animate-float drop-shadow-xl"><Logo /></div>
        <div className="font-display text-6xl font-extrabold tracking-tighter text-text-main">Mar<em className="text-primary not-italic">IA</em></div>
      </div>
      <div className="text-[0.68rem] tracking-[0.25em] uppercase text-text-light mb-8">by GaorSystem · Perú</div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-text-main mb-4">
        ¿Listo para que tu negocio trabaje solo?
      </h2>
      <p className="text-text-muted leading-relaxed mb-10">
        En <strong className="text-primary">48 horas</strong> tienes tu suite completa funcionando. Sin conocimientos técnicos. Con garantía de devolución.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onOpenWhatsApp} className="btn-primary">
          💬 Empezar ahora por WhatsApp
        </button>
        <a href="#precios" className="btn-secondary">
          Ver planes →
        </a>
      </div>
      <div className="mt-6 text-xs text-text-light">
        ✅ <strong className="text-secondary-dark">15 días de garantía</strong> · Sin contrato · Sin letras chicas
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-10 px-6 bg-white border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-2">
      <div className="w-7 h-7"><Logo /></div>
      <span className="font-display text-lg font-extrabold tracking-tight text-text-main">Mar<em className="text-primary not-italic">IA</em></span>
      <span className="text-[0.65rem] text-text-light ml-1">by GaorSystem</span>
    </div>
    <div className="flex gap-5">
      <a href="#soluciones" className="text-xs text-text-light hover:text-primary transition-colors">Soluciones</a>
      <a href="#precios" className="text-xs text-text-light hover:text-primary transition-colors">Precios</a>
      <a href="#faq" className="text-xs text-text-light hover:text-primary transition-colors">FAQ</a>
      <a href="#" className="text-xs text-text-light hover:text-primary transition-colors">GaorSystem</a>
    </div>
    <div className="text-[0.72rem] text-text-light">© 2025 MarIA · GaorSystem Perú</div>
  </footer>
);

const WhatsAppWidget = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = [
    "¡Hola! Soy MarIA 🚀 ¿Te ayudo?",
    "¿Quieres ver una demo en vivo? ✨",
    "Mira cómo se ve tu carta en WhatsApp 📱",
    "Atiendo a 14 negocios ahora mismo 📈",
    "¡Digitaliza tu local en 48 horas! ⏱️"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="bg-white px-4 py-2.5 rounded-2xl rounded-br-none shadow-xl border border-primary/10 text-xs font-bold text-text-main relative mb-1"
        >
          {messages[currentMessage]}
          <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white border-r border-b border-primary/10 rotate-45" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative">
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white z-10 animate-pulse" />
        <button 
          onClick={onOpenWhatsApp}
          className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-3xl shadow-[0_12px_40px_rgba(37,211,102,0.4)] hover:scale-110 transition-all active:scale-95 group"
        >
          <MessageCircle className="w-8 h-8 text-white fill-white/10 group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const WhatsAppModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  const options = [
    { text: "🚀 ¡Quiero mi tienda MarIA ya!", msg: "Hola! Estoy listo para llevar mi negocio al siguiente nivel con MarIA. ¡Quiero mi tienda ya!" },
    { text: "✨ Ver una demo en vivo", msg: "Hola! Me encantaría ver cómo funciona MarIA en vivo. ¿Me muestran una demo?" },
    { text: "💼 ¿Cómo funciona para mi negocio?", msg: "Hola! Tengo dudas sobre cómo MarIA puede ayudar a mi negocio. ¿Me explican?" },
    { text: "💬 Quiero hablar con un asesor", msg: "Hola! Me gustaría hablar con un asesor para empezar." }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-primary/10"
      >
        <h3 className="font-display text-2xl font-bold text-text-main mb-6">¿En qué te puedo ayudar?</h3>
        <div className="space-y-3">
          {options.map((opt, i) => (
            <a 
              key={i}
              href={`https://wa.me/51975736687?text=${encodeURIComponent(opt.msg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 rounded-xl bg-bg-main hover:bg-primary/10 border border-primary/5 hover:border-primary/20 transition-all text-sm font-bold text-text-main"
            >
              {opt.text}
            </a>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-6 text-xs text-text-muted hover:text-text-main">Cancelar</button>
      </motion.div>
    </div>
  );
};

const LandingPage = ({ onOpenWhatsApp }: { onOpenWhatsApp: () => void }) => (
  <>
    <Navbar onOpenWhatsApp={onOpenWhatsApp} />
    <Hero onOpenWhatsApp={onOpenWhatsApp} />
    <Problem />
    <HowItWorks />
    <Pillars />
    <WhatsAppCatalog />
    <POS />
    <Numbers />
    <Testimonials />
    <Pricing onOpenWhatsApp={onOpenWhatsApp} />
    <Process />
    <FAQ />
    <CTA onOpenWhatsApp={onOpenWhatsApp} />
    <Footer />
    <WhatsAppWidget onOpenWhatsApp={onOpenWhatsApp} />
  </>
);

export default function App() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-main selection:bg-primary/20 selection:text-primary">
        <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />
        
        <Routes>
          <Route path="/" element={<LandingPage onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)} />} />
          <Route path="/demo" element={
            <div className="min-h-screen bg-bg-main">
              <div className="container mx-auto py-6">
                <Link to="/" className="text-primary font-bold hover:underline mb-6 inline-block">← Volver al inicio</Link>
                <Dashboard />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


