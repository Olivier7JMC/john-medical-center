import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, ExternalLink } from 'lucide-react';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObj)
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        e.currentTarget.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-medical-dark mb-4"
          >
            Contact & Accès
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Notre équipe est à votre disposition pour toute question ou prise de rendez-vous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-2xl sm:col-span-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <MapPin className="w-6 h-6 text-medical-blue" />
                </div>
                <h4 className="font-bold text-medical-dark mb-4">Adresses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-600">
                  <p><strong className="text-medical-dark block mb-1">JMC 1</strong>Avenue Kimwenza 8<br/>Q/ Yolo Sud, Commune de Kalamu</p>
                  <p><strong className="text-medical-dark block mb-1">JMC 2</strong>Avenue Kalu 10 bis<br/>Yolo Nord, Kalamu</p>
                  <p><strong className="text-medical-dark block mb-1">JMC 3</strong>Avenue Lombi, Lemba Salongo<br/>Arrêt Limbaya, Route Bypass</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Phone className="w-6 h-6 text-medical-green" />
                </div>
                <h4 className="font-bold text-medical-dark mb-2">Téléphone</h4>
                <p className="text-slate-600 font-medium">
                  <a href="tel:+243816878808" className="hover:text-medical-blue transition-colors block">+243 81 687 88 08</a>
                  <a href="tel:+243814574426" className="hover:text-medical-blue transition-colors block">+243 81 45 74 426</a>
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Mail className="w-6 h-6 text-medical-blue" />
                </div>
                <h4 className="font-bold text-medical-dark mb-2">Email</h4>
                <p className="text-slate-600 font-medium break-all">
                  <a href="mailto:johnmedicalcente@johnmedicalcenter.com" className="hover:text-medical-blue transition-colors block">johnmedicalcente@johnmedicalcenter.com</a>
                </p>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl sm:col-span-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Clock className="w-6 h-6 text-medical-green" />
                </div>
                <h4 className="font-bold text-medical-dark mb-2">Heures d'ouverture</h4>
                <p className="text-slate-600">Urgences : 24h/24 et 7j/7<br />Consultations : 8h00 - 18h00</p>
              </div>
            </div>

            {/* Carte Google Maps Interactive */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-medical-red flex-shrink-0" />
                  <span className="font-bold text-medical-dark text-sm sm:text-base">Localisation : Bd Kimwenza, Yolo-Sud, Kalamu, Kinshasa</span>
                </div>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Boulevard+Kimwenza+Kalamu+Kinshasa+Congo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-medical-blue text-white rounded-full text-xs font-semibold hover:bg-blue-700 transition-colors self-start sm:self-auto shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Itinéraire GPS
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden h-72 sm:h-80 shadow-md border border-slate-200 relative group">
                <iframe 
                  src="https://maps.google.com/maps?q=Boulevard+Kimwenza+Kalamu+Kinshasa+Congo&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte de géolocalisation John Medical Center"
                ></iframe>
                
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-medical-dark">John Medical Center (Siège Principal)</p>
                    <p className="text-slate-500">Boulevard Kimwenza, Q. Yolo Sud, Kalamu</p>
                  </div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Boulevard+Kimwenza+Kalamu+Kinshasa+Congo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-medical-blue font-bold hover:underline flex items-center gap-1 whitespace-nowrap"
                  >
                    Agrandir <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold text-medical-dark mb-6">Envoyez-nous un message</h3>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="w-16 h-16 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-medical-green" />
                </div>
                <h4 className="text-xl font-bold text-medical-dark mb-2">Message envoyé !</h4>
                <p className="text-slate-600">Nous vous répondrons dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nom complet *</label>
                    <input name="nom" required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Téléphone *</label>
                    <input name="telephone" required type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Sujet *</label>
                  <select name="sujet" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                    <option value="">Sélectionner...</option>
                    <option value="rendez-vous">Demande de rendez-vous</option>
                    <option value="information">Demande d'information</option>
                    <option value="reclamation">Réclamation</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message *</label>
                  <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all resize-none thin-scrollbar"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-medical-blue text-white font-bold text-lg hover:bg-medical-blue-light transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-medical-blue/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
}
