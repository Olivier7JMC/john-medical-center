import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Briefcase } from 'lucide-react';

export function Internships() {
  return (
    <section id="stages" className="py-24 bg-medical-gray relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0b3b60] mb-6"
          >
            Stages à JOHN MEDICAL CENTER
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            John Medical Center et Maternité offre différents types de stages pour les étudiants et les professionnels dans le domaine de la santé. Nos stages sont conçus pour fournir une expérience pratique et enrichissante dans un environnement de travail réel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: GraduationCap,
              title: "Stages Médicaux",
              desc: "Pour les étudiants en médecine, soins infirmiers, laboratoire, pharmacie, nutrition, etc."
            },
            {
              icon: BookOpen,
              title: "Trainings Médicaux",
              desc: "Destinés aux professionnels de la santé cherchant à perfectionner leurs compétences pratiques."
            },
            {
              icon: Briefcase,
              title: "Stages Administratifs",
              desc: "Opportunités au sein de nos bureaux centraux pour les profils en gestion, RH, et administration."
            }
          ].map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-medical-blue/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-medical-blue transition-colors duration-300">
                <type.icon className="w-8 h-8 text-medical-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-medical-dark mb-3">{type.title}</h3>
              <p className="text-slate-600">{type.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Process Flow */}
        <div className="max-w-5xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center text-medical-dark mb-16"
          >
            Processus de Sélection
          </motion.h3>
          
          <div className="relative">
            {/* Horizontal Line behind steps (visible on md+) */}
            <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-medical-blue/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Adéquation", desc: "Entre votre formation et le stage demandé" },
                { title: "Motivation", desc: "Les objectifs clairs d'apprentissage (Stage)" },
                { title: "Disponibilité", desc: "Évaluation des places disponibles" },
                { title: "Période", desc: "Validation de la période de stage demandée" }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number Circle */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-medical-blue text-medical-blue font-bold text-lg shadow-sm group-hover:bg-medical-blue group-hover:text-white transition-all duration-300 mb-6 z-10">
                    {i + 1}
                    <span className="absolute -inset-1 rounded-full border border-medical-blue/20 scale-105 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  
                  {/* Step Card */}
                  <div className="bg-white px-4 py-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-medical-blue/20 transition-all duration-300 w-full flex flex-col items-center justify-center min-h-[130px]">
                    <h4 className="text-base md:text-lg font-bold text-medical-dark mb-2 group-hover:text-medical-blue transition-colors duration-200 flex items-center gap-2 justify-center">
                      <span className="text-medical-green font-semibold">✓</span> {step.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed text-center">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
