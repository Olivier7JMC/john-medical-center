import React from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import type { Doctor } from '../types';

const doctors: Doctor[] = [
  {
    id: 'dr-kitambo',
    name: 'Dr Olivier Kitambo',
    specialty: 'MDG',
    bio: 'Dirige et coordonne l\'ensemble des activités de l\'établissement de santé. Il veille à la qualité et à la sécurité des soins, assure une gestion efficace des ressources humaines, financières et matérielles.',
    services: ['Direction médicale', 'Consultation'],
    imageUrl: '/équipe1.jpg.jpeg'
  },
  {
    id: 'dr-kimbien',
    name: 'Dr Augustin Kimbien',
    specialty: 'Anesthésiste réanimateur',
    bio: 'Assure l\'anesthésie des patients avant, pendant et après les interventions chirurgicales. Il surveille en permanence leurs fonctions vitales, prend en charge les situations d\'urgence.',
    services: ['Anesthésie', 'Réanimation'],
    imageUrl: '/équipe2.jpeg',
    imagePosition: 'object-[center_15%]'
  },
  {
    id: 'dr-munzambakani',
    name: 'Dr Rachel Munzambakani',
    specialty: 'Obstétricienne',
    bio: 'Spécialisée dans le suivi de la grossesse, de l\'accouchement et des suites de naissance. Elle veille à la santé de la mère et du bébé, prend en charge les grossesses à risque et intervient en cas de complications obstétricales.',
    services: ['Obstétrique', 'Maternité'],
    imageUrl: '/équipe3.jpg.jpeg'
  },
  {
    id: 'dr-luzolo',
    name: 'Dr Héritier Luzolo',
    specialty: 'Généraliste',
    bio: 'Assure la prévention, le diagnostic, le traitement et le suivi des maladies courantes. Il est le premier interlocuteur des patients, les oriente vers un spécialiste si nécessaire et veille à la continuité de leur prise en charge.',
    services: ['Médecine générale', 'Consultation'],
    imageUrl: '/équipe4.jpg.jpeg'
  },
  {
    id: 'dr-ansum',
    name: 'Dr Bienvenue Ansum',
    specialty: 'Gynécologue',
    bio: 'Spécialiste de la santé de l\'appareil reproducteur féminin. Il assure la prévention, le diagnostic, le traitement des maladies gynécologiques ainsi que le suivi de la santé reproductive de la femme.',
    services: ['Gynécologie', 'Maternité'],
    imageUrl: '/équipe5.jpg.jpeg',
    imagePosition: 'object-[center_15%]'
  },
  {
    id: 'dr-masudi',
    name: 'Dr Masudi',
    specialty: 'Généraliste Expert',
    bio: 'Expérience approfondie dans la prise en charge des patients. Il réalise des diagnostics complexes, assure le traitement et le suivi des maladies, et apporte son expertise pour orienter les patients vers les soins spécialisés lorsque cela est nécessaire.',
    services: ['Médecine générale', 'Consultation'],
    imageUrl: '/équipe6.jpg.jpeg',
    imagePosition: 'object-[center_15%]'
  },
  {
    id: 'dr-amy-ange',
    name: 'Dr Amy Ange',
    specialty: 'Chirurgien',
    bio: 'Spécialiste qui réalise des interventions chirurgicales pour traiter les maladies, les blessures ou les malformations. Il assure l\'évaluation préopératoire, l\'opération, ainsi que le suivi postopératoire afin de garantir le rétablissement du patient.',
    services: ['Chirurgie', 'Consultation'],
    imageUrl: '/equipe7.jpeg',
    imagePosition: 'object-[center_15%]'
  },
  {
    id: 'dr-kapungu',
    name: 'Dr Danny Kapungu',
    specialty: 'Généraliste Second',
    bio: 'Assiste dans la prise en charge médicale des patients sous la supervision de médecins responsables. Il assure les consultations, le suivi des maladies courantes, l\'orientation des patients et contribue au bon fonctionnement du service médical.',
    services: ['Médecine générale', 'Consultation'],
    imageUrl: '/équipe8.jpg.jpeg',
    imagePosition: 'object-[center_15%]'
  },
  {
    id: 'dr-azabo',
    name: 'Dr Bola Azabo',
    specialty: 'Orthopédiste',
    bio: 'Spécialiste de l\'appareil locomoteur. Il diagnostique, traite et prévient les maladies et les blessures qui touchent les os, les articulations, les muscles, les tendons et les ligaments.',
    services: ['Orthopédie', 'Consultation'],
    imageUrl: '/équipe9.jpg.jpeg',
    imagePosition: 'object-[center_15%]'
  }
];

export function Team() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: 'start',
      loop: true,
      slidesToScroll: 1
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="equipe" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-medical-blue/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-medical-green/5 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#0b3b60] mb-6"
            >
              Notre Équipe Médicale
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600"
            >
              Découvrez nos médecins spécialistes. Une équipe pluridisciplinaire engagée pour vous offrir des soins d'excellence dans un cadre humain.
            </motion.p>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-medical-blue hover:text-white hover:border-medical-blue transition-colors shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-medical-blue hover:text-white hover:border-medical-blue transition-colors shadow-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex -ml-6 touch-pan-y py-4">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="pl-6 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] min-w-0"
              >
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 h-full flex flex-col relative">
                  {doctor.imageUrl ? (
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img 
                        src={doctor.imageUrl} 
                        alt={doctor.name} 
                        className={`w-full h-full object-cover ${doctor.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-500 filter grayscale-[20%] group-hover:grayscale-0`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-medical-dark/90 via-medical-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="inline-block px-3 py-1 bg-medical-green text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm">
                          {doctor.specialty}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {doctor.name}
                        </h3>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-[#0b3b60] via-[#0e4875] to-[#082b47] flex flex-col justify-between p-6">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <User className="w-10 h-10 text-medical-green" />
                      </div>
                      
                      <div>
                        <div className="inline-block px-3 py-1 bg-medical-green text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider shadow-sm">
                          {doctor.specialty}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {doctor.name}
                        </h3>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6 flex-1 flex flex-col bg-white relative z-10">
                    <p className="text-slate-600 flex-1 text-sm leading-relaxed text-justify">
                      {doctor.bio}
                    </p>
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
