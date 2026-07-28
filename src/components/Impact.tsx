import React from 'react';
import { motion } from 'motion/react';
import CountUp from 'react-countup';
import { Map, HeartHandshake, Users, ActivitySquare } from 'lucide-react';

const stats = [
  {
    icon: Map,
    value: 95,
    suffix: " %",
    label: "Zones de santé couvertes",
    color: "text-medical-blue"
  },
  {
    icon: ActivitySquare,
    value: 90,
    suffix: " %",
    label: "Campagnes organisées",
    color: "text-medical-green"
  },
  {
    icon: Users,
    value: 98,
    suffix: " %",
    label: "Personnes sensibilisées",
    color: "text-medical-blue"
  },
  {
    icon: HeartHandshake,
    value: 93,
    suffix: " %",
    label: "Dépistages réalisés",
    color: "text-medical-green"
  }
];

export function Impact() {
  return (
    <section className="py-20 relative bg-medical-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Notre Impact
          </motion.h2>
          <div className="w-20 h-1 bg-medical-green mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 text-center group hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 mx-auto bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className={`w-8 h-8 ${stat.color === 'text-medical-blue' ? 'text-blue-400' : 'text-medical-green'}`} />
              </div>
              
              <div className="text-5xl font-display font-bold text-white mb-3">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
