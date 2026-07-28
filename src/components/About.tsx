import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { SmartImage } from './SmartImage';

export function About() {
  return (
    <section id="a-propos" className="py-24 bg-white relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <SmartImage 
                sources={["/jmc_facade.jpg", "/jmc_façade.jpg.jpeg", "/apropos.jpg.jpeg", "/about_img.jpg"]}
                alt="John Medical Center et Maternité" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-medical-blue/10"></div>
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-medical-blue">15+</div>
                <div className="text-sm font-semibold text-slate-600 leading-tight">
                  Années d'excellence<br/>médicale
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-medical-dark mb-6">
                À Propos de <span className="text-medical-blue">John Medical Center</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed text-justify">
                Les soins de santé primaires constituent une approche de la santé tenant compte de la société dans son ensemble qui vise à garantir le niveau de santé et de bien-être le plus élevé possible et sa répartition équitable en accordant la priorité aux besoins des populations le plus tôt possible tout au long de la chaîne de soins allant de la promotion de la santé et de la prévention des maladies au traitement, à la réadaptation et aux soins palliatifs, et en restant le plus proche possible de l'environnement quotidien des populations. Notre mission est de placer le patient au centre de nos priorités grâce à une approche humaine, éthique et innovante.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Une équipe médicale hautement qualifiée et multidisciplinaire",
                  "Des équipements de diagnostic et de traitement de dernière génération",
                  "Une prise en charge personnalisée et bienveillante",
                  "Des normes d'hygiène et de sécurité internationales"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-medical-green shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
