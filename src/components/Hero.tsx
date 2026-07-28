import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

const slides = [
  {
    id: 1,
    title: 'Bienvenue à JOHN MEDICAL CENTER ET MATERNITÉ',
    description: 'Votre santé est notre priorité. Une équipe dévouée et une infrastructure adaptée pour un accompagnement personnalisé 24h/24.',
    image: '/jmc_facade.jpg',
  },
  {
    id: 2,
    title: 'Des médecins hautement qualifiés',
    description: 'Des soins de qualité en République Démocratique du Congo. Notre expertise au service de votre bien-être au quotidien.',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&q=80&w=2000',
  },
  {
    id: 3,
    title: 'Des équipements médicaux modernes',
    description: 'Diagnostic précis et traitement efficace. Une infrastructure technologique de pointe pour des résultats fiables.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000',
  }
];

export function Hero() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  return (
    <section id="accueil" className="relative min-h-[650px] sm:min-h-[700px] lg:h-screen w-full overflow-hidden bg-medical-dark">
      <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full min-w-0">
              {/* Background Image */}
              <div className="absolute inset-0">
                <SmartImage
                  sources={slide.image.startsWith('/') ? ["/jmc_facade.jpg", "/jmc_façade.jpg.jpeg", "/apropos.jpg.jpeg", "/about_img.jpg"] : [slide.image]}
                  alt={slide.title}
                  className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] lg:object-center transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Overlay for high text contrast while preserving image fidelity */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center pt-24 pb-28 md:pt-32 md:pb-36">
                <div className="container mx-auto px-4 md:px-6 w-full">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="inline-block px-4 py-1.5 mb-4 sm:mb-6 rounded-full bg-medical-green/20 backdrop-blur-md border border-medical-green/30 text-medical-green-light font-medium tracking-wide text-sm"
                    >
                      Excellence Médicale
                    </motion.div>
                    
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-4 sm:mb-6"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-base sm:text-lg md:text-2xl text-gray-200 mb-6 sm:mb-10 max-w-2xl font-light leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <a
                        href="#services"
                        className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-medical-green text-white font-semibold text-base sm:text-lg hover:bg-medical-green-light transition-all duration-300 hover:shadow-lg hover:shadow-medical-green/30 group"
                      >
                        En savoir plus
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Bottom Wave/Curve */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1 pointer-events-none">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          className="w-full h-12 sm:h-20 md:h-28 lg:h-36 max-h-[140px] text-medical-gray fill-current"
        >
          <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
