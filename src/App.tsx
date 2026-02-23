import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ShoppingBag, BarChart3, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

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

const Navbar = () => {
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
          <a href="https://wa.me/51999999999" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/30 hover:-translate-y-0.5">
            Quiero MarIA 💬
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden grad-bg text-center">
    <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[80px] -top-24 -right-36 animate-drift" />
    <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[80px] -bottom-20 -left-24 animate-drift [animation-direction:reverse]" />
    <div className="absolute w-[300px] h-[300px] rounded-full bg-accent/10 blur-[60px] top-[40%] left-[40%] animate-drift [animation-delay:3s]" />

    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="w-24 h-24 animate-float drop-shadow-2xl"><Logo /></div>
        <div className="font-display text-5xl font-extrabold tracking-tighter text-text-main">Mar<em className="text-primary not-italic">IA</em></div>
      </div>

      <div className="inline-flex items-center gap-2 bg-white border border-primary/15 shadow-sm text-primary text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
        <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-blink" />
        Suite digital completa para negocios peruanos
      </div>

      <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold leading-[1.02] tracking-tighter text-text-main mb-6">
        <span className="text-primary">Tienda virtual.</span>
        <span className="text-secondary-dark"> Bot inteligente.</span>
        <span className="text-accent"> Panel potente.</span>
        <span className="block font-serif italic font-normal text-[0.62em] text-text-muted tracking-tight mt-2">Todo integrado. Listo en 48 horas.</span>
      </h1>

      <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto mb-12">
        <strong className="text-primary">MarIA</strong> transforma tu negocio en una operación digital profesional. Tu cliente compra en la tienda, el bot confirma el pedido y el panel te avisa. Automático, sin que toques el celular.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <a href="https://wa.me/51999999999" className="btn-primary">
          💬 Quiero MarIA para mi negocio
        </a>
        <a href="#soluciones" className="btn-secondary">
          Ver las 3 soluciones →
        </a>
      </div>

      <div className="flex justify-center gap-10 flex-wrap pt-8 border-t border-primary/10 w-full">
        {[
          { n: "48h", l: "Tiempo instalación" },
          { n: "24/7", l: "Bot activo siempre" },
          { n: "S/350", l: "Desde este precio" },
          { n: "15 días", l: "Garantía devolución" }
        ].map((item, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-3xl font-extrabold text-primary">{item.n}</div>
            <div className="text-[0.7rem] text-text-light tracking-widest uppercase mt-1">{item.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="soluciones" className="py-24 bg-bg-main relative">
    <div className="text-center px-6 max-w-3xl mx-auto mb-16">
      <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-5">
        Las 3 soluciones de MarIA
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-5">
        Todo lo que tu negocio necesita,<br/><em className="font-serif italic font-normal text-primary">en un solo lugar</em>
      </h2>
      <p className="text-text-muted leading-relaxed">Tres herramientas poderosas, completamente integradas. Cuando un cliente compra en tu tienda, el bot lo confirma y el panel te avisa. Todo automático.</p>
    </div>

    <div className="container mx-auto px-6 max-w-6xl flex flex-col gap-12">
      {/* Sol 1: Tienda */}
      <div className="bg-white rounded-[28px] overflow-hidden grid md:grid-cols-2 min-h-[520px] relative shadow-[0_4px_40px_rgba(30,27,75,0.06)] border border-primary/10 border-t-[3px] border-t-primary hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.1)] transition-all duration-300">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-primary/5 blur-[60px] -right-24 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="p-10 md:p-12 flex flex-col justify-center relative z-10">
          <div className="text-[0.62rem] font-bold tracking-[0.25em] uppercase text-text-light mb-4">01 · Primera solución</div>
          <div className="inline-flex items-center gap-2.5 bg-primary-bg border border-primary/20 rounded-2xl px-4 py-2.5 mb-6 w-fit">
            <div className="w-8 h-8"><Logo /></div>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">Tienda Virtual</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-4">
            Tienda Virtual<br/><em className="not-italic text-primary">Super Profesional</em>
          </h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6">Tu negocio merece una tienda que convierta visitas en ventas. Catálogo visual impecable, carrito de compras, pago con Yape y Plin, perfecta en celular.</p>
          <ul className="flex flex-col gap-2.5">
            {[
              "Catálogo con foto, precio y descripción",
              "Carrito de compras con total automático",
              "Pago directo con Yape y Plin",
              "Filtros por categoría y buscador",
              "Diseño 100% responsive en celular",
              "URL propia: tunegocio.maria.pe"
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-primary-bg text-primary flex items-center justify-center text-[0.6rem] font-extrabold shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-10 relative z-10 flex items-center justify-center grad-bg">
          <div className="bg-white rounded-2xl overflow-hidden w-full shadow-[0_8px_32px_rgba(124,58,237,0.1)] border border-primary/10">
            <div className="bg-[#F9F8FF] p-3 flex items-center gap-1.5 border-b border-primary/10">
              <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <div className="flex-1 bg-primary/5 rounded px-2.5 py-1 text-[0.62rem] text-text-light ml-2">🔒 donpepe.maria.pe</div>
            </div>
            <div className="p-3.5">
              <div className="bg-gradient-to-r from-primary-bg to-primary-bg/30 rounded-xl p-3 mb-3 flex items-center justify-between">
                <div>
                  <div className="font-serif text-base italic text-primary">Cevichería Don Pepe</div>
                  <div className="text-[0.56rem] text-text-light mt-0.5">🛵 Delivery · Los Olivos</div>
                </div>
                <div className="text-[0.56rem] bg-secondary text-white px-2 py-1 rounded-full font-bold">ABIERTO</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                {[
                  { i: "🐟", n: "Ceviche Clásico", p: "S/ 28" },
                  { i: "🦐", n: "Ceviche Mixto", p: "S/ 38" },
                  { i: "🍲", n: "Arroz Mariscos", p: "S/ 32" },
                  { i: "🐙", n: "Pulpo al Olivo", p: "S/ 45" }
                ].map((p, i) => (
                  <div key={i} className="bg-bg-main rounded-lg overflow-hidden border border-primary/5">
                    <div className="h-12 flex items-center justify-center text-xl bg-primary-bg">{p.i}</div>
                    <div className="p-2">
                      <div className="text-[0.6rem] font-semibold mb-1 text-text-main">{p.n}</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.65rem] text-primary font-bold">{p.p}</span>
                        <span className="text-[0.5rem] bg-primary rounded-full px-2 py-1 text-white font-bold">+ Add</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-text-main rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <div className="text-[0.65rem] font-bold text-white">🛒 2 productos · S/ 66</div>
                  <div className="text-[0.55rem] text-primary-light">💜 Pagar con Yape / Plin</div>
                </div>
                <div className="text-sm text-white">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-8" />

      {/* Sol 2: Bot */}
      <div className="bg-white rounded-[28px] overflow-hidden grid md:grid-cols-2 min-h-[520px] relative shadow-[0_4px_40px_rgba(30,27,75,0.06)] border border-primary/10 border-t-[3px] border-t-secondary-dark hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.1)] transition-all duration-300">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[60px] -left-24 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="p-10 relative z-10 flex items-center justify-center grad-bg order-2 md:order-1">
          <div className="bg-white rounded-[26px] overflow-hidden w-[220px] shadow-[0_24px_60px_rgba(124,58,237,0.15)] border-[1.5px] border-primary/10">
            <div className="bg-[#F9F8FF] p-2 flex justify-center border-b border-primary/5">
              <div className="w-12 h-1 bg-primary-light rounded opacity-40" />
            </div>
            <div className="bg-primary p-2.5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0"><div className="w-5 h-5"><Logo /></div></div>
              <div>
                <div className="text-[0.7rem] font-bold text-white">MarIA 🚀 · Don Pepe</div>
                <div className="text-[0.58rem] text-white/65">● en línea ahora</div>
              </div>
            </div>
            <div className="bg-[#F3F4F6] p-2 min-h-[200px] flex flex-col gap-1.5">
              <div className="max-w-[86%] p-2 rounded-md text-[0.62rem] leading-relaxed bg-white rounded-tl-none self-start text-text-main shadow-sm">
                ¡Hola! Soy <b>MarIA</b> 🚀<br/>¿En qué te ayudo?<br/>1️⃣ Carta 2️⃣ Pedido 3️⃣ Precios
              </div>
              <div className="max-w-[86%] p-2 rounded-md text-[0.62rem] leading-relaxed bg-primary rounded-tr-none self-end text-white">
                cuánto cuesta el ceviche?
              </div>
              <div className="max-w-[86%] p-2 rounded-md text-[0.62rem] leading-relaxed bg-white rounded-tl-none self-start text-text-main shadow-sm">
                🐟 Clásico <b>S/ 28</b><br/>🦐 Mixto <b>S/ 38</b><br/>¿Te pedimos uno? 😊
              </div>
              <div className="max-w-[86%] p-2 rounded-md text-[0.62rem] leading-relaxed bg-primary rounded-tr-none self-end text-white">
                sí el mixto con delivery!
              </div>
              <div className="max-w-[86%] p-2 rounded-md text-[0.62rem] leading-relaxed bg-white rounded-tl-none self-start text-text-main shadow-sm">
                🎉 Total: <b>S/ 43</b><br/>💜 Yapea al 999-999-999<br/>🛵 Llega en 30-40 min
              </div>
            </div>
            <div className="bg-white p-2 flex items-center gap-1.5 border-t border-primary/10">
              <input className="flex-1 bg-bg-main rounded-full border border-primary/10 px-2.5 py-1 text-[0.6rem] outline-none text-text-main" placeholder="Escribe un mensaje..." />
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-[0.65rem] shrink-0">➤</div>
            </div>
          </div>
        </div>
        <div className="p-10 md:p-12 flex flex-col justify-center relative z-10 order-1 md:order-2">
          <div className="text-[0.62rem] font-bold tracking-[0.25em] uppercase text-text-light mb-4">02 · Segunda solución</div>
          <div className="inline-flex items-center gap-2.5 bg-secondary-bg border border-secondary/30 rounded-2xl px-4 py-2.5 mb-6 w-fit">
            <div className="w-8 h-8"><Logo /></div>
            <span className="text-xs font-bold tracking-widest uppercase text-secondary-dark">Bot Inteligente</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-4">
            Bot que Responde<br/><em className="not-italic text-secondary-dark">por Ti — 24/7</em>
          </h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6">MarIA atiende a tus clientes por WhatsApp las 24 horas sin que toques el celular. IA real que habla en español peruano, cálido y natural.</p>
          <ul className="flex flex-col gap-2.5">
            {[
              "Responde preguntas de productos y precios",
              "Toma pedidos completos y coordina el pago",
              "Info de Yape, Plin y delivery automática",
              "Habla en español peruano — natural y cálido",
              "Te avisa cuando hay un pedido urgente",
              "Activo 24h — incluso cuando estás durmiendo"
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-secondary-bg text-secondary-dark flex items-center justify-center text-[0.6rem] font-extrabold shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent mx-8" />

      {/* Sol 3: Admin */}
      <div className="bg-white rounded-[28px] overflow-hidden grid md:grid-cols-2 min-h-[520px] relative shadow-[0_4px_40px_rgba(30,27,75,0.06)] border border-primary/10 border-t-[3px] border-t-accent hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(30,27,75,0.1)] transition-all duration-300">
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-[60px] -right-24 top-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="p-10 md:p-12 flex flex-col justify-center relative z-10">
          <div className="text-[0.62rem] font-bold tracking-[0.25em] uppercase text-text-light mb-4">03 · Tercera solución</div>
          <div className="inline-flex items-center gap-2.5 bg-accent-bg border border-accent-light/30 rounded-2xl px-4 py-2.5 mb-6 w-fit">
            <div className="w-8 h-8"><Logo /></div>
            <span className="text-xs font-bold tracking-widest uppercase text-accent">Panel Admin</span>
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-4">
            Panel de Control<br/><em className="not-italic text-accent">Súper Potente</em>
          </h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6">Todo tu negocio en la palma de tu mano. Ventas en tiempo real, gestión de pedidos con un toque, catálogo editable y base de clientes que crece sola.</p>
          <ul className="flex flex-col gap-2.5">
            {[
              "Dashboard: ventas del día, semana y mes",
              "Gestión pedidos: nuevo → proceso → entregado",
              "Edita productos y precios en segundos",
              "Base de datos de clientes automática",
              "Reportes y estadísticas de tu negocio",
              "Configura a MarIA según tu temporada"
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-accent-bg text-accent flex items-center justify-center text-[0.6rem] font-extrabold shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-10 relative z-10 flex items-center justify-center grad-bg">
          <div className="bg-white rounded-[18px] overflow-hidden w-full shadow-[0_8px_32px_rgba(244,114,182,0.1)] border border-accent-light/10">
            <div className="bg-accent-bg p-2.5 flex items-center gap-1.5 border-b border-accent-light/10">
              <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <div className="w-2 h-2 rounded-full bg-[#28C840]" />
              <div className="text-[0.62rem] text-text-muted ml-1.5 font-semibold">⚙️ Panel MarIA · Don Pepe</div>
            </div>
            <div className="grid grid-cols-[42px_1fr] min-h-[260px]">
              <div className="bg-[#F9F8FF] py-2.5 border-r border-primary/5 flex flex-col items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-primary-bg flex items-center justify-center text-[0.82rem]">📊</div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[0.82rem]">📦</div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[0.82rem]">🍽️</div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[0.82rem]">👥</div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[0.82rem]">🤖</div>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                  <div className="bg-bg-main rounded-lg p-2 border border-primary/5">
                    <div className="font-display text-base font-extrabold text-primary">S/348</div>
                    <div className="text-[0.52rem] text-text-light mt-px">Ventas hoy</div>
                  </div>
                  <div className="bg-bg-main rounded-lg p-2 border border-primary/5">
                    <div className="font-display text-base font-extrabold text-secondary-dark">12</div>
                    <div className="text-[0.52rem] text-text-light mt-px">Pedidos</div>
                  </div>
                  <div className="bg-bg-main rounded-lg p-2 border border-primary/5">
                    <div className="font-display text-base font-extrabold text-accent">91%</div>
                    <div className="text-[0.52rem] text-text-light mt-px">IA atendió</div>
                  </div>
                </div>
                <div className="bg-bg-main rounded-lg p-2 mb-2 border border-primary/5">
                  <div className="text-[0.52rem] text-text-light tracking-widest uppercase mb-1.5">Ventas esta semana</div>
                  <div className="flex items-end gap-1 h-11">
                    <div className="flex-1 rounded-t-sm bg-primary-bg h-[50%]" />
                    <div className="flex-1 rounded-t-sm bg-primary-bg h-[64%]" />
                    <div className="flex-1 rounded-t-sm bg-primary-bg h-[55%]" />
                    <div className="flex-1 rounded-t-sm bg-primary-bg h-[88%]" />
                    <div className="flex-1 rounded-t-sm bg-primary-bg h-[78%]" />
                    <div className="flex-1 rounded-t-sm bg-primary h-full" />
                    <div className="flex-1 rounded-t-sm bg-primary/10 h-[6%]" />
                  </div>
                </div>
                <div className="bg-bg-main rounded-lg overflow-hidden border border-primary/5">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 p-1.5 bg-primary-bg text-primary font-bold text-[0.57rem]">
                    <span>Pedido</span><span>Total</span><span>Estado</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 p-1.5 border-b border-primary/5 text-[0.57rem] items-center text-text-main">
                    <span>#P-041 · María R.</span><span>S/97</span><span className="bg-[#FDE8D8] text-[#C2440E] px-1.5 py-0.5 rounded-full font-bold text-[0.52rem]">Nuevo</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 p-1.5 border-b border-primary/5 text-[0.57rem] items-center text-text-main">
                    <span>#P-040 · Carlos M.</span><span>S/76</span><span className="bg-primary-bg text-primary px-1.5 py-0.5 rounded-full font-bold text-[0.52rem]">Proceso</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 p-1.5 text-[0.57rem] items-center text-text-main">
                    <span>#P-039 · Ana L.</span><span>S/100</span><span className="bg-secondary-bg text-secondary-dark px-1.5 py-0.5 rounded-full font-bold text-[0.52rem]">Listo ✓</span>
                  </div>
                </div>
              </div>
            </div>
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

const Pricing = () => (
  <section id="precios" className="py-24 px-6 grad-bg">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
        Oferta Exclusiva
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-6">
        Un solo pago.<br/><em className="font-serif italic font-normal text-primary">Acceso de por vida.</em>
      </h2>
      <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto">
        Olvídate de las mensualidades y comisiones abusivas. Obtén la suite completa de MarIA con un único pago y empieza a vender en automático hoy mismo.
      </p>
      
      <div className="bg-white rounded-[32px] p-8 md:p-12 relative transition-all duration-300 hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] border-2 border-primary max-w-2xl mx-auto">
        <div className="absolute top-0 inset-x-0 bg-primary text-white text-center text-[0.75rem] font-extrabold tracking-widest py-2 rounded-t-[28px]">
          ⭐ LICENCIA LIFETIME (PAGO ÚNICO)
        </div>
        
        <div className="mt-6 mb-8">
          <div className="font-display text-2xl font-extrabold tracking-tight text-text-main mb-2">Suite Completa MarIA</div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl text-text-light line-through font-bold">S/ 1,200</span>
            <span className="font-display text-6xl font-extrabold text-primary tracking-tight">S/ 349</span>
          </div>
          <div className="text-sm text-secondary-dark font-bold bg-secondary-bg inline-block px-3 py-1 rounded-full">
            ¡Ahorras S/ 851 hoy!
          </div>
        </div>

        <div className="h-px bg-primary/10 my-8" />
        
        <div className="grid sm:grid-cols-2 gap-4 text-left mb-10">
          {[
            "Catálogo digital interactivo",
            "Bot WhatsApp 24/7 (Básico)",
            "Info Yape/Plin automática",
            "URL: maria.pe/tunegocio",
            "Carrito de compras integrado",
            "Panel de administración total",
            "El mejor vendedor para enganchar a tus clientes",
            "Soporte técnico incluido"
          ].map((f, j) => (
            <div key={j} className="flex items-start gap-3 text-sm text-gray-800 font-medium leading-relaxed">
              <span className="text-secondary-dark font-bold shrink-0 text-lg leading-none">✓</span> {f}
            </div>
          ))}
        </div>
        
        <a href="https://wa.me/51999999999?text=Hola!%20Quiero%20aprovechar%20la%20oferta%20de%20S/349%20pago%20único" className="block w-full text-center py-5 rounded-full text-lg font-bold transition-all bg-primary text-white hover:bg-primary-dark hover:-translate-y-1 shadow-xl shadow-primary/30">
          🚀 QUIERO MI SISTEMA AHORA
        </a>
        <div className="mt-4 text-xs text-text-muted font-medium">
          Pago 100% seguro. Activación en 48 horas.
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
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block text-[0.7rem] font-bold tracking-[0.2em] uppercase text-primary bg-primary-bg px-4 py-1.5 rounded-full border border-primary/15 mb-4">
          Preguntas frecuentes
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.08] text-text-main mb-12">
          Resolvemos tus<br/><em className="font-serif italic font-normal text-primary">dudas ahora</em>
        </h2>
        <div className="max-w-2xl mx-auto text-left">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-primary/10">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex items-center justify-between text-left font-semibold text-[0.92rem] text-text-main hover:text-primary transition-colors gap-3"
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
                    <p className="pb-5 text-sm text-text-muted leading-relaxed">{faq.a}</p>
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

const CTA = () => (
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
        En <strong className="text-primary">48 horas</strong> tienes tu tienda virtual, tu bot y tu panel funcionando. Sin conocimientos técnicos. Con garantía de devolución.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="https://wa.me/51999999999" className="btn-primary">
          💬 Empezar ahora por WhatsApp
        </a>
        <a href="#precios" className="btn-secondary">
          Ver precios →
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

export default function App() {
  return (
    <div className="min-h-screen bg-bg-main selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Solutions />
      <Numbers />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <a href="https://wa.me/51999999999" className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-2xl shadow-[0_8px_28px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform animate-[waPulse_2.5s_infinite]">
        💬
      </a>
    </div>
  );
}
