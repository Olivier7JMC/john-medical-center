import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, X as XIconLucide, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SmartImage } from './SmartImage';

// Using simple SVG icons for TikTok and X since they might not be in older Lucide versions
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.63-1.07 5.3-2.92 7.15-1.92 1.93-4.8 2.87-7.46 2.38-2.61-.48-4.88-2.14-5.96-4.56-.84-1.89-1.03-4.13-.34-6.09.73-2.07 2.39-3.74 4.41-4.51 1.75-.66 3.74-.68 5.53-.13v4.06c-1.34-.33-2.82-.12-3.95.73-.85.64-1.35 1.68-1.43 2.75-.06 1.05.34 2.15 1.05 2.92.83.91 2.21 1.25 3.39.92 1.28-.35 2.19-1.43 2.4-2.73.07-.46.06-.92.06-1.38V.02z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'legal' | null>(null);
  const [logoError, setLogoError] = useState(false);

  return (
    <>
      <footer className="bg-medical-dark text-white pt-20 pb-10 border-t-4 border-medical-green">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden p-2 flex items-center justify-center shadow-lg shadow-black/10 hover:scale-105 transition-transform duration-300 shrink-0">
                  <SmartImage 
                    sources={["/logo.png", "/logo.png.jpeg"]} 
                    alt="John Medical Center Logo" 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer"
                    fallbackNode={<Building2 className="w-10 h-10 text-medical-blue" />}
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base xl:text-lg leading-tight tracking-wide text-white">
                    JOHN MEDICAL CENTER
                  </h3>
                  <p className="font-display font-bold text-xs xl:text-sm leading-tight tracking-wide text-white/90 mt-1 uppercase">
                    Et Maternité
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Le John Medical Center et Maternité est votre partenaire de confiance pour des soins de santé de qualité en République Démocratique du Congo, avec une approche humaine et personnalisée.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61552465460579" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all active:scale-95">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all active:scale-95">
                  <XIcon />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all active:scale-95">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://vm.tiktok.com/ZS9rueDUxqRKC-Iw4wv/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-medical-blue hover:text-white transition-all active:scale-95">
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Liens rapides</h4>
              <ul className="space-y-3">
                <li><a href="#accueil" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Accueil</a></li>
                <li><a href="#historique" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Historique</a></li>
                <li><a href="#equipe" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Notre Équipe</a></li>
                <li><a href="#campagnes" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Campagnes</a></li>
                <li><a href="#stages" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Stages</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Nos Services</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Consultation médicale</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Chirurgie sécurisée</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Médecine interne</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Gynécologie Obstétrique</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Maternité</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Pédiatrie</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Dentisterie</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Ophtalmologie</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-medical-green transition-colors text-sm">Imagerie médicale</a></li>
              </ul>
            </div>

            {/* Partners */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-block">Nos Partenaires</h4>
              <div className="flex flex-wrap items-center gap-4 justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-all duration-300 w-36 h-20 flex items-center justify-center overflow-hidden">
                  <SmartImage 
                    sources={["/croix_rouge_logo.png", "/croix rouge-logo.jpg.png"]}
                    alt="Croix-Rouge" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-all duration-300 w-36 h-20 flex items-center justify-center overflow-hidden">
                  <SmartImage 
                    sources={["/msf_logo.png", "/medecin-logo.jpg.png"]}
                    alt="Médecins Sans Frontières" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-all duration-300 w-36 h-20 flex items-center justify-center overflow-hidden">
                  <SmartImage 
                    sources={["/oms_logo_new.svg", "/oms_logo.png", "/oms-logo.jpg.gif"]}
                    alt="Organisation Mondiale de la Santé (OMS)" 
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Politique de confidentialité</button>
              <button onClick={() => setActiveModal('legal')} className="hover:text-white transition-colors">Mentions légales</button>
              <a href="#admin" className="hover:text-white transition-colors text-gray-600 hover:underline">Espace Administration</a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; 2012 - {new Date().getFullYear()} John Medical Center et Maternité. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold text-medical-dark">
                  {activeModal === 'privacy' ? 'Politique de confidentialité' : 'Mentions légales'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <XIconLucide className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto text-gray-600 prose prose-sm max-w-none thin-scrollbar">
                {activeModal === 'privacy' ? (
                  <div className="space-y-6">
                    <p>
                      Chez John Medical Center et Maternité (JMC), nous accordons une importance primordiale à la confidentialité et à la sécurité de vos données personnelles et médicales.
                    </p>
                    
                    <h4 className="font-bold text-gray-900 text-lg">1. Collecte des informations</h4>
                    <p>Nous recueillons des informations lorsque vous utilisez nos formulaires de contact, postulez pour un stage ou utilisez nos services médicaux. Les informations recueillies incluent votre nom, adresse e-mail, numéro de téléphone, et toute information médicale pertinente à votre prise en charge.</p>
                    
                    <h4 className="font-bold text-gray-900 text-lg">2. Utilisation des informations</h4>
                    <p>Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
                      <li>Améliorer la qualité de nos soins médicaux</li>
                      <li>Vous contacter au sujet de vos rendez-vous ou résultats</li>
                      <li>Traiter vos demandes de stage ou d'emploi</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 text-lg">3. Confidentialité et Secret Médical</h4>
                    <p>Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles et médicales ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement, en dehors de ce qui est nécessaire pour répondre à une demande médicale ou légale.</p>
                    
                    <h4 className="font-bold text-gray-900 text-lg">4. Protection des informations</h4>
                    <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. L'accès aux données sensibles est strictement limité au personnel médical autorisé.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h4 className="font-bold text-gray-900 text-lg">1. Éditeur du site</h4>
                    <p>
                      Le présent site web est édité par :<br />
                      <strong>John Medical Center et Maternité</strong><br /><br />
                      <strong>JMC 1</strong><br />
                      Avenue Kimwenza 8<br />
                      Q/ Yolo Sud, Commune de Kalamu<br /><br />
                      <strong>JMC 2</strong><br />
                      Avenue Kalu 10 bis<br />
                      Yolo Nord, Commune Kalamu<br /><br />
                      <strong>JMC 3</strong><br />
                      Avenue Lombi, Lemba Salongo<br />
                      Arrêt Limbaya, Route Bypass<br /><br />
                      Téléphone : +243 81 687 88 08 / +243 81 45 74 426<br />
                      Email : johnmedicalcente@johnmedicalcenter.com
                    </p>

                    <h4 className="font-bold text-gray-900 text-lg">2. Directeur de la publication</h4>
                    <p>Le directeur de la publication du site est la Direction Générale de John Medical Center.</p>

                    <h4 className="font-bold text-gray-900 text-lg">3. Hébergement</h4>
                    <p>Ce site est hébergé par : [Nom de l'hébergeur]</p>

                    <h4 className="font-bold text-gray-900 text-lg">4. Propriété intellectuelle</h4>
                    <p>L'ensemble de ce site relève de la législation sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>

                    <h4 className="font-bold text-gray-900 text-lg">5. Avertissement médical</h4>
                    <p>Les informations fournies sur ce site le sont à titre purement indicatif. Elles ne sauraient remplacer une consultation médicale auprès d'un professionnel de santé qualifié. En cas d'urgence médicale, veuillez vous rendre immédiatement au centre ou contacter les urgences.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
