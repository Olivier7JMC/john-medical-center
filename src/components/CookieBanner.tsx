import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X, Settings2, Check } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('jmc-cookie-consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      } catch (e) {
        // Handle old string format or error
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('jmc-cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleDeclineAll = () => {
    const allDeclined = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    setPreferences(allDeclined);
    localStorage.setItem('jmc-cookie-consent', JSON.stringify(allDeclined));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('jmc-cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
          >
            <div className="container mx-auto max-w-5xl">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <button 
                  onClick={handleDeclineAll}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start gap-4 pr-8 md:pr-0">
                  <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center shrink-0">
                    <Info className="w-5 h-5 text-medical-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-medical-dark mb-1">Gestion des cookies</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Nous utilisons des cookies afin d'améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. En continuant, vous acceptez notre utilisation des cookies.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
                  <button 
                    onClick={handleDeclineAll}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors flex-1 md:flex-none text-sm"
                  >
                    Refuser
                  </button>
                  <button 
                    onClick={() => setShowPreferences(true)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors flex-1 md:flex-none text-sm inline-flex items-center justify-center gap-2"
                  >
                    <Settings2 className="w-4 h-4" />
                    Personnaliser
                  </button>
                  <button 
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 rounded-full bg-medical-blue text-white font-semibold hover:bg-medical-blue-light transition-colors shadow-md shadow-medical-blue/20 w-full md:w-auto text-sm"
                  >
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-medical-blue" />
                  </div>
                  <h3 className="font-bold text-xl text-medical-dark">Préférences de cookies</h3>
                </div>
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-medical-dark hover:bg-slate-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-6 thin-scrollbar">
                <p className="text-slate-600 text-sm">
                  Lors de votre navigation sur notre site, des cookies sont déposés sur votre terminal. Vous pouvez à tout moment vous informer et paramétrer vos cookies pour les accepter ou les refuser.
                </p>

                <div className="space-y-4">
                  {/* Necessary */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-medical-dark mb-1">Cookies strictement nécessaires</h4>
                        <p className="text-sm text-slate-600">Ces cookies sont indispensables au bon fonctionnement du site web et ne peuvent pas être désactivés. Ils sont généralement établis en tant que réponse à des actions que vous avez effectuées.</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full inline-flex items-center gap-1 border border-emerald-200">
                          <Check className="w-3 h-3" /> Toujours actif
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-medical-dark mb-1">Cookies d'analyse et de performance</h4>
                        <p className="text-sm text-slate-600">Ces cookies nous permettent de déterminer le nombre de visites et les sources du trafic, afin de mesurer et d’améliorer les performances de notre site web.</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.analytics}
                            onChange={() => togglePreference('analytics')}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-medical-dark mb-1">Cookies de fonctionnalités</h4>
                        <p className="text-sm text-slate-600">Ces cookies permettent d’améliorer et de personnaliser les fonctionnalités du site Web. Ils peuvent être activés par nos équipes, ou par des tiers dont les services sont utilisés sur les pages de notre site Web.</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.preferences}
                            onChange={() => togglePreference('preferences')}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="p-4 rounded-xl border border-slate-200">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-medical-dark mb-1">Cookies publicitaires</h4>
                        <p className="text-sm text-slate-600">Ces cookies peuvent être mis en place au sein de notre site Web par nos partenaires publicitaires. Ils peuvent être utilisés par ces entreprises pour établir un profil de vos intérêts et vous proposer des annonces pertinentes sur d'autres sites Web.</p>
                      </div>
                      <div className="shrink-0 pt-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={preferences.marketing}
                            onChange={() => togglePreference('marketing')}
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-medical-blue"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center gap-3 justify-end shrink-0">
                <button 
                  onClick={handleDeclineAll}
                  className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto"
                >
                  Tout refuser
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-full border border-medical-blue text-medical-blue font-medium hover:bg-medical-blue/5 transition-colors w-full sm:w-auto"
                >
                  Tout accepter
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="px-6 py-2.5 rounded-full bg-medical-blue text-white font-semibold hover:bg-medical-blue-light transition-colors shadow-md shadow-medical-blue/20 w-full sm:w-auto"
                >
                  Enregistrer mes choix
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
