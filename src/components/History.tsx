import React from 'react';
import { motion } from 'motion/react';
import { History as HistoryIcon, Target, Lightbulb, HeartHandshake, CheckCircle2, TrendingUp, Award, Users, BookOpen } from 'lucide-react';

export function History() {
  const achievements = [
    "Pris en charge plusieurs milliers de patients avec professionnalisme et humanisme.",
    "Contribué à améliorer l’accès à des soins médicaux de qualité à un coût abordable.",
    "Participé à la formation pratique de nombreux médecins, infirmiers et autres professionnels de santé.",
    "Développé des collaborations et des activités de formation médicale avec des partenaires et des professionnels en Europe.",
    "Investi dans des équipements médicaux modernes afin d’améliorer le diagnostic et la qualité des soins.",
    "Développé une culture d’innovation, de qualité et d’amélioration continue."
  ];

  const values = [
    { name: "Excellence", icon: <Award className="w-5 h-5" /> },
    { name: "Intégrité", icon: <CheckCircle2 className="w-5 h-5" /> },
    { name: "Compassion", icon: <HeartHandshake className="w-5 h-5" /> },
    { name: "Innovation", icon: <Lightbulb className="w-5 h-5" /> },
    { name: "Professionnalisme", icon: <HistoryIcon className="w-5 h-5" /> },
    { name: "Esprit de service", icon: <Users className="w-5 h-5" /> },
    { name: "Respect de la vie", icon: <HeartHandshake className="w-5 h-5" /> },
    { name: "Travail d’équipe", icon: <Users className="w-5 h-5" /> },
    { name: "Responsabilité", icon: <BookOpen className="w-5 h-5" /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="historique" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-medical-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-medical-green/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-medical-green font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Notre Parcours
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-5xl font-display font-bold text-medical-dark mb-6"
          >
            Historique de <span className="text-medical-blue">John Medical Center</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* History Text */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 space-y-6 text-lg text-slate-600 leading-relaxed"
          >
            <motion.p variants={itemVariants} className="text-justify">
              <strong className="text-medical-dark font-display">John Medical Center (JMC)</strong> est un établissement de santé privé fondé le <strong>14 avril 2018</strong> par le Dr Kitambo Soni Olivier, médecin du Gouvernement de la République Démocratique du Congo et entrepreneur engagé dans le développement du système de santé congolais.
            </motion.p>
            <motion.p variants={itemVariants} className="text-justify">
              Le nom <strong className="text-medical-blue">« John »</strong> est inspiré de Jean, prénom porté à la fois par le père du fondateur et par son fils aîné. Ce choix symbolise la transmission des valeurs familiales, l’intégrité, le service et l’engagement envers la communauté.
            </motion.p>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border-l-4 border-medical-green shadow-sm my-8 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 right-0 w-24 h-24 bg-medical-green/5 rounded-bl-full transform origin-top-right group-hover:scale-110 transition-transform duration-500" />
              <p className="text-base relative z-10 text-justify">
                À sa création, John Medical Center était implanté sur l’avenue Wagenia, dans le quartier Yolo Sud, commune de Kalamu. Face à l’augmentation constante de la fréquentation et afin d’offrir des infrastructures mieux adaptées, l’établissement a été transféré en 2019 sur le boulevard Kimwenza, toujours dans le quartier Yolo Sud.
              </p>
            </motion.div>
            <motion.p variants={itemVariants} className="text-justify">
              Animé par une vision de proximité et d’expansion, le Dr Kitambo a poursuivi le développement du réseau avec l’ouverture de <strong>John Medical Center 2</strong> en septembre 2019, puis de <strong>John Medical Center 3</strong> en avril 2026, renforçant ainsi la capacité de prise en charge des patients et l’accès à des soins de qualité.
            </motion.p>
            <motion.p variants={itemVariants} className="text-justify">
              Depuis sa création, John Medical Center s’est progressivement développé en intégrant plusieurs services médicaux, notamment les consultations spécialisées, la chirurgie, la maternité, les examens de laboratoire, l’imagerie médicale, l’échographie, l’électrocardiographie ainsi que d’autres prestations répondant aux besoins de la population congolaise.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-12 p-8 bg-medical-dark text-white rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-medical-green/20 rounded-bl-full transform origin-top-right group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-medical-blue/20 rounded-tr-full transform origin-bottom-left group-hover:scale-110 transition-transform duration-700 delay-100" />
              <p className="relative z-10 text-xl font-display italic leading-relaxed text-slate-100 text-justify">
                Aujourd’hui, John Medical Center poursuit son développement avec l’ambition de devenir une référence nationale dans le domaine de la santé, en mettant le patient au cœur de toutes ses actions et en contribuant durablement au renforcement du système de santé de la République Démocratique du Congo.
              </p>
            </motion.div>
          </motion.div>

          {/* Mission, Vision, Achievements */}
          <div className="lg:col-span-5 space-y-8">
            {/* Mission & Vision */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-md border border-slate-100 relative overflow-hidden group hover:border-medical-green/30 transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target className="w-24 h-24 text-medical-blue" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-medical-blue/10 flex items-center justify-center text-medical-blue">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-medical-dark">Notre Mission</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8 text-justify">
                  Offrir à chaque patient des soins de santé accessibles, sûrs, modernes et de haute qualité, fondés sur l’excellence médicale, l’éthique professionnelle, l’innovation et le respect de la dignité humaine.
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-medical-green/10 flex items-center justify-center text-medical-green">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-medical-dark">Notre Vision</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-justify">
                  Faire de John Medical Center un réseau de référence en République Démocratique du Congo, présent dans toutes les communes de Kinshasa, puis dans l’ensemble des provinces du pays, tout en devenant un centre d’excellence en soins, en formation des professionnels de santé, en recherche médicale et en innovation technologique au service de la population congolaise.
                </p>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-medical-blue p-8 rounded-3xl shadow-lg text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3 text-white">
                  <Award className="w-7 h-7 text-medical-green" />
                  Nos Réalisations
                </h3>
                <ul className="space-y-4">
                  {achievements.map((achievement, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-medical-green shrink-0 mt-0.5" />
                      <span className="text-slate-100 text-sm leading-relaxed">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Values Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-display font-bold text-[#0b3b60] mb-4">Nos Valeurs Fondamentales</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">Les principes qui guident nos actions quotidiennes et notre engagement envers nos patients.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center gap-3 hover:border-medical-green/50 hover:shadow-md transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-medical-blue">
                  {value.icon}
                </div>
                <span className="font-semibold text-slate-700 text-sm">{value.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
