import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Campaign } from '../types';
import { SmartImage } from './SmartImage';

interface CampaignWithSources extends Campaign {
  sources: string[];
}

const campaigns: CampaignWithSources[] = [
  {
    id: 'vaccination',
    title: 'Campagne de vaccination',
    description: 'Organisation de journées de vaccination contre diverses maladies, notamment pour les enfants et les populations vulnérables.',
    fullDescription: 'Ces campagnes visent à éradiquer les épidémies locales et à renforcer l\'immunité collective. Nos équipes se déploient également dans les zones reculées pour garantir un accès équitable aux vaccins essentiels.',
    imageUrl: '/campagne1.jpg.jpeg',
    sources: [
      '/campagne1.jpg.jpeg',
      'https://images.unsplash.com/photo-1618961734760-466979ce35b0?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'depistage',
    title: 'Dépistages gratuits',
    description: 'Organisation de journées de dépistage du VIH, du paludisme, de la tuberculose et d\'autres maladies fréquentes.',
    fullDescription: 'Un diagnostic précoce est essentiel pour un traitement efficace. Des médecins spécialistes sont présents lors de ces journées pour orienter immédiatement les cas détectés vers les structures de prise en charge adéquates.',
    imageUrl: '/campagne2-depistage.jpg.avif',
    sources: [
      '/campagne2-depistage.jpg.avif',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'sensibilisation',
    title: 'Sensibilisation communautaire',
    description: 'Éducation sur l\'hygiène, la prévention des maladies et la santé reproductive au sein de nos communautés.',
    fullDescription: 'Des ateliers interactifs et des séminaires sont organisés régulièrement pour outiller la population avec des connaissances pratiques. Nous croyons que la prévention commence par une éducation sanitaire de qualité.',
    imageUrl: '/campagne3-sensibilisation.jpeg',
    sources: [
      '/campagne3-sensibilisation.jpeg',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'maternelle',
    title: 'Santé maternelle et infantile',
    description: 'Programme complet de soins de grossesse, consultations prénatales, vaccinations infantiles, suivi nutritionnel et prévention de la mortalité maternelle.',
    fullDescription: 'Nous accompagnons les futures mères tout au long de leur grossesse et au-delà, en assurant un environnement sécurisé pour l\'accouchement. Des séances de conseil en nutrition et en allaitement sont également offertes.',
    imageUrl: '/campagne4-santé maternelle.jpg.jpg',
    sources: [
      '/campagne4-santé maternelle.jpg.jpg',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'banque-sang',
    title: 'Banque du sang',
    description: 'Collecte et don de sang pour sauver des vies et garantir un approvisionnement sûr pour les urgences médicales.',
    fullDescription: 'Notre banque de sang organise régulièrement des collectes pour répondre aux besoins critiques en transfusions. Chaque don compte et permet de traiter les accidentés, les femmes souffrant d\'hémorragies de la délivrance et les patients anémiques.',
    imageUrl: '/banque_du_sang_new.jpg',
    sources: [
      '/banque_du_sang_new.jpg',
      '/banque_du_sang.jpg',
      'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];

export function Campaigns() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', breakpoints: { '(min-width: 768px)': { slidesToScroll: 2 } } },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section id="campagnes" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-slate-100 pb-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-medical-dark mb-4"
            >
              Nos Campagnes de Santé
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Le JMC s'engage activement dans la communauté à travers des programmes de prévention et d'éducation à la santé.
            </motion.p>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex gap-8 touch-pan-y py-4">
            {campaigns.map((camp, i) => (
              <motion.div
                key={camp.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-16px)] min-w-0"
              >
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative shrink-0">
                    <SmartImage 
                      sources={camp.sources} 
                      alt={camp.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-medical-blue flex items-center gap-2 shadow-sm">
                      <Calendar className="w-3 h-3" />
                      Toute l'année
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-medical-dark mb-4 group-hover:text-medical-blue transition-colors">
                      {camp.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {camp.description}
                    </p>

                    <AnimatePresence>
                      {expandedId === camp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-600 leading-relaxed pb-4">
                            {camp.fullDescription}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <button 
                      onClick={() => setExpandedId(expandedId === camp.id ? null : camp.id)}
                      className="flex items-center gap-2 text-medical-green font-semibold w-fit group/btn mt-auto pt-4"
                    >
                      {expandedId === camp.id ? 'Réduire' : 'Lire plus'}
                      <div className="w-8 h-8 rounded-full bg-medical-green/10 flex items-center justify-center group-hover/btn:bg-medical-green group-hover/btn:text-white transition-colors ml-2">
                        <ArrowRight className={cn("w-4 h-4 transition-transform duration-300", expandedId === camp.id ? "-rotate-90" : "")} />
                      </div>
                    </button>
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
