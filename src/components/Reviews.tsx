import React from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Star, Quote } from 'lucide-react';
import type { Review } from '../types';

const reviews: Review[] = [
  {
    id: '1',
    name: 'Marie L.',
    rating: 5,
    comment: 'Un service exceptionnel à la maternité. Les infirmières et les médecins ont été à l\'écoute et très professionnels. Je me suis sentie en totale sécurité.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '2',
    name: 'Paul K.',
    rating: 5,
    comment: 'L\'équipement d\'imagerie est très moderne et les résultats ont été rapides. Le Dr Kitambo a pris le temps de tout m\'expliquer en détail.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '3',
    name: 'Sarah M.',
    rating: 4,
    comment: 'Excellente prise en charge en pédiatrie pour mon fils. Le cadre est rassurant pour les enfants et l\'équipe est formidable.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: '4',
    name: 'Brigitte Sangu',
    rating: 5,
    comment: 'Je recommande vivement le service de dentisterie. Hygiène irréprochable et soins sans douleur. Merci à toute l\'équipe.',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200'
  }
];

export function Reviews() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center', breakpoints: { '(min-width: 768px)': { slidesToScroll: 1, align: 'start' } } },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <section className="py-24 bg-medical-gray relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-medical-dark mb-6"
          >
            Avis de nos patients
          </motion.h2>
        </div>

        <div className="overflow-hidden -mx-4 px-4 pb-12" ref={emblaRef}>
          <div className="flex gap-6 touch-pan-y items-stretch">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:border-medical-green/30 hover:shadow-md transition-all h-full relative flex flex-col justify-between">
                  <div>
                    <Quote className="absolute top-6 right-8 w-12 h-12 text-medical-blue/10 pointer-events-none" />
                    
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-5 h-5 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-100 text-slate-100'}`} />
                      ))}
                    </div>
                    
                    <p className="text-slate-600 mb-8 italic leading-relaxed relative z-10 text-base">
                      "{review.comment}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                    <img 
                      src={review.imageUrl} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-medical-dark text-base">{review.name}</h4>
                      <p className="text-sm text-slate-500 font-medium">Patient(e)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
