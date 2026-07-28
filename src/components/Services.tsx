import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, Activity, Eye, Baby, Syringe, 
  HeartPulse, Pill, Microscope, ArrowRight, X 
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { Service } from '../types';
import { SmartImage } from './SmartImage';

import chirurgieImage from '../assets/images/chirurgie_securisee_new_1784750692315.jpg';

const servicesData: Service[] = [
  {
    id: 'chirurgie',
    title: 'Chirurgie sécurisée',
    description: 'Interventions chirurgicales de pointe dans des blocs opératoires ultra-modernes.',
    longDescription: 'Notre département de chirurgie est équipé des dernières technologies pour garantir des interventions sûres et efficaces. Notre équipe de chirurgiens expérimentés couvre un large éventail de spécialités, de la chirurgie générale aux interventions mini-invasives, avec un suivi post-opératoire rigoureux pour une récupération optimale.',
    iconName: 'Activity',
    imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'consultation',
    title: 'Consultation médicale',
    description: 'Diagnostic précis et prise en charge personnalisée par nos médecins spécialistes.',
    longDescription: 'Nous offrons des consultations dans diverses spécialités médicales. Nos médecins prennent le temps d\'écouter vos symptômes, de réaliser des examens cliniques complets et de prescrire les traitements appropriés, tout en mettant l\'accent sur la prévention.',
    iconName: 'Stethoscope',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'imagerie',
    title: 'Imagerie médicale',
    description: 'Équipements de dernière génération pour des diagnostics rapides et précis.',
    longDescription: 'Notre centre d\'imagerie médicale dispose d\'échographes, de scanners (TDM) et d\'appareils de radiologie numérique de pointe. Nos radiologues experts fournissent des interprétations rapides et détaillées pour orienter efficacement les décisions médicales.',
    iconName: 'Microscope',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'medecine-interne',
    title: 'Médecine interne',
    description: 'Prise en charge globale des maladies de l\'adulte et pathologies complexes.',
    longDescription: 'Nos spécialistes en médecine interne excellent dans le diagnostic et le traitement des maladies complexes affectant plusieurs organes. Ils assurent une coordination des soins pour les patients atteints de maladies chroniques (diabète, hypertension, etc.).',
    iconName: 'HeartPulse',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'dentisterie',
    title: 'Dentisterie',
    description: 'Soins dentaires complets, de la prévention à la chirurgie maxillo-faciale.',
    longDescription: 'Le service de dentisterie propose des soins conservateurs, des prothèses, de l\'orthodontie et de la chirurgie dentaire. Nous utilisons des équipements stérilisés selon les normes internationales pour garantir votre sécurité et votre confort.',
    iconName: 'Pill',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'gyn-obs',
    title: 'Gynécologie Obstétrique',
    description: 'Suivi de la femme à toutes les étapes de sa vie, de la puberté à la ménopause.',
    longDescription: 'Nous accompagnons les femmes pour leur suivi gynécologique régulier, le dépistage des cancers féminins, la prise en charge de l\'infertilité et le traitement des pathologies de l\'appareil reproducteur.',
    iconName: 'Baby',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'maternite',
    title: 'Maternité',
    description: 'Accompagnement de la grossesse et accouchements dans des conditions optimales.',
    longDescription: 'Notre maternité offre un cadre rassurant et sécurisé pour accueillir votre enfant. Nous proposons des consultations prénatales, des salles d\'accouchement équipées, un service de néonatologie et un accompagnement post-partum dédié.',
    iconName: 'HeartPulse',
    imageUrl: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pediatrie',
    title: 'Pédiatrie',
    description: 'Soins dédiés aux nourrissons, enfants et adolescents avec douceur et expertise.',
    longDescription: 'L\'équipe pédiatrique assure le suivi de la croissance, les vaccinations, ainsi que le traitement des maladies infantiles. Notre approche est adaptée à l\'enfant pour minimiser son anxiété lors des consultations.',
    iconName: 'Baby',
    imageUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ophtalmologie',
    title: 'Ophtalmologie',
    description: 'Correction de la vision, traitement des maladies de l\'œil et chirurgie oculaire.',
    longDescription: 'Nous diagnostiquons et traitons les troubles de la vision (myopie, astigmatisme, presbytie) et les pathologies oculaires (cataracte, glaucome). Notre service est équipé pour réaliser des bilans complets et des interventions chirurgicales de précision.',
    iconName: 'Eye',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  }
];

const iconMap: Record<string, React.ElementType> = {
  Stethoscope, Activity, Eye, Baby, Syringe, HeartPulse, Pill, Microscope
};

export function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getServiceImageConfig = (serviceId: string) => {
    const service = servicesData.find(s => s.id === serviceId);
    if (!service) return null;

    const localSources = [
      `/${serviceId}.jpg`,
      `/${serviceId}.png`,
      `/${serviceId}.jpeg`,
      `/${serviceId}.jpg.jpeg`,
      `/${serviceId}.jpg.png`,
      `/${service.title.toLowerCase()}.jpg`,
      `/${service.title.toLowerCase()}.png`,
      `/${service.title.toLowerCase()}.jpg.png`
    ];

    if (serviceId === 'chirurgie') {
      return {
        sources: [
          '/chirurgie securisée.jpg.png',
          '/chirurgie_securisee.png',
          '/chirurgie_securisee.jpg',
          '/chirurgie.png',
          '/chirurgie.jpg',
          '/chirurgie.jpeg',
          chirurgieImage,
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_22%]'
      };
    }

    if (serviceId === 'consultation') {
      return {
        sources: [
          '/services2.jpg.jpeg',
          '/services2.jpg',
          '/consultation.jpg',
          '/consultation.jpeg',
          '/consultation.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_15%]'
      };
    }

    if (serviceId === 'imagerie') {
      return {
        sources: [
          '/imagerie -medicle.jpg.jpeg',
          '/imagerie_medicale.jpg',
          '/imagerie_medicale.jpeg',
          '/imagerie_medicale.png',
          '/imagerie.jpg',
          '/imagerie.jpeg',
          '/imagerie.png',
          '/imagerie.jpg.jpeg',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_20%]'
      };
    }

    if (serviceId === 'medecine-interne') {
      return {
        sources: [
          '/service3.jpg.jpeg',
          '/service3.jpg',
          '/service4.jpg',
          '/service4.jpg.jpeg',
          '/medecine-interne.jpg',
          '/medecine-interne.jpeg',
          '/medecine-interne.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_18%]'
      };
    }

    if (serviceId === 'dentisterie') {
      return {
        sources: [
          '/dentisterie.jpg.jpeg',
          '/dentisterie.jpg',
          '/dentisterie.jpeg',
          '/dentisterie.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_20%]'
      };
    }

    if (serviceId === 'gyn-obs') {
      return {
        sources: [
          '/gynécologie.jpg.jpeg',
          '/gyn-obs.jpg.jpeg',
          '/gyn-obs.jpg',
          '/gyn-obs.jpeg',
          '/gynecologie.jpg',
          '/gynecologie.jpg.jpeg',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_18%]'
      };
    }

    if (serviceId === 'maternite') {
      return {
        sources: [
          '/maternité.jpg.jpeg',
          '/maternite.jpg.jpeg',
          '/maternite.jpg',
          '/maternite.jpeg',
          '/maternite.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_20%]'
      };
    }

    if (serviceId === 'pediatrie') {
      return {
        sources: [
          '/pediatrie.jpg.jpeg',
          '/pédiatrie.jpg.jpeg',
          '/pediatrie.jpg',
          '/pediatrie.jpeg',
          '/pediatrie.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_20%]'
      };
    }

    if (serviceId === 'ophtalmologie') {
      return {
        sources: [
          '/ophtalmologie.jpg.jpeg',
          '/ophtalmologie.jpg',
          '/ophtalmologie.jpeg',
          '/ophtalmologie.png',
          ...localSources,
          service.imageUrl
        ],
        position: 'object-[center_22%]'
      };
    }

    const positionMap: Record<string, string> = {
      'imagerie': 'object-[center_20%]',
      'medecine-interne': 'object-[center_18%]',
      'dentisterie': 'object-[center_25%]',
      'gyn-obs': 'object-[center_18%]',
      'maternite': 'object-[center_20%]',
      'pediatrie': 'object-[center_20%]',
      'ophtalmologie': 'object-[center_22%]'
    };

    return {
      sources: [
        ...localSources,
        service.imageUrl
      ],
      position: positionMap[serviceId] || 'object-[center_20%]'
    };
  };

  return (
    <section id="services" className="py-24 bg-medical-gray relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-medical-blue mb-6"
          >
            Nos Services Médicaux
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            Nous offrons une gamme complète de services de santé, soutenue par une technologie de pointe et une équipe d'experts dévoués.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Stethoscope;
            const imageConfig = getServiceImageConfig(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
              >
                {imageConfig ? (
                  <div className="h-52 overflow-hidden relative">
                    <div className="absolute inset-0 bg-medical-blue/20 group-hover:bg-transparent transition-colors z-10" />
                    <SmartImage 
                      sources={imageConfig.sources} 
                      alt={service.title} 
                      className={cn(
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-700",
                        imageConfig.position
                      )}
                    />
                    <div className="absolute bottom-0 right-0 bg-white p-4 rounded-tl-2xl z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                      <div className="bg-medical-blue/10 p-3 rounded-xl text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-6 px-6 flex items-center justify-between">
                    <div className="bg-medical-blue/10 p-3.5 rounded-xl text-medical-blue group-hover:bg-medical-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-medical-dark mb-3 group-hover:text-medical-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-6 flex-1">
                    {service.description}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="flex items-center gap-2 text-medical-green font-semibold mt-auto group/btn w-fit"
                  >
                    Lire plus
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-medical-dark/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1, y: 0 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full backdrop-blur-md text-slate-800 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
              
              {getServiceImageConfig(selectedService.id) ? (
                <div className="h-56 sm:h-72 relative shrink-0">
                  <SmartImage 
                    sources={getServiceImageConfig(selectedService.id)!.sources} 
                    alt={selectedService.title} 
                    className={cn("w-full h-full object-cover", getServiceImageConfig(selectedService.id)!.position)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/80 to-transparent flex items-end p-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                      {React.createElement(iconMap[selectedService.iconName] || Stethoscope, { className: "w-8 h-8 text-medical-green" })}
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-medical-blue to-teal-800 p-6 sm:p-8 text-white shrink-0 pr-14">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md text-medical-green shrink-0">
                      {React.createElement(iconMap[selectedService.iconName] || Stethoscope, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
              )}
              
              <div className="p-6 sm:p-8 overflow-y-auto thin-scrollbar">
                <p className="text-lg text-slate-700 leading-relaxed">
                  {selectedService.longDescription}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a 
                    href="#contact-form"
                    onClick={(e) => {
                      const serviceTitle = selectedService.title;
                      setSelectedService(null);
                      setTimeout(() => {
                        const select = document.querySelector('select[name="sujet"]') as HTMLSelectElement;
                        if (select) {
                          select.value = 'rendez-vous';
                        }
                        const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                        if (textarea) {
                          textarea.value = `Bonjour, je souhaite prendre un rendez-vous pour le service : ${serviceTitle}.`;
                          textarea.focus();
                        }
                      }, 500);
                    }}
                    className="inline-flex justify-center w-full sm:w-auto items-center gap-2 px-8 py-3 rounded-full bg-medical-blue text-white font-semibold hover:bg-medical-blue-light transition-colors"
                  >
                    Prendre rendez-vous pour ce service
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
