import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Mail, Clock, ShieldCheck, Lock, KeyRound, LogOut, AlertCircle, ArrowLeft, Home, Download, FileText, Eye, X } from 'lucide-react';

export function AdminDashboard() {
  const [data, setData] = useState<{ contacts: any[], internships: any[] }>({ contacts: [], internships: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'contacts' | 'internships'>('internships');
  const [selectedInternship, setSelectedInternship] = useState<any | null>(null);
  
  const [authCode, setAuthCode] = useState<string>(() => {
    return sessionStorage.getItem('jmc_admin_auth_code') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState('');
  const [authError, setAuthError] = useState('');

  const fetchAdminData = async (codeToUse: string) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const response = await fetch(`/api/admin/data?code=${encodeURIComponent(codeToUse)}`);
      const json = await response.json().catch(() => null);
      
      if (response.ok && json?.success) {
        setData(json.data);
        setIsAuthenticated(true);
        sessionStorage.setItem('jmc_admin_auth_code', codeToUse);
        setAuthCode(codeToUse);
      } else {
        setIsAuthenticated(false);
        setAuthError(json?.error || 'Code d’accès administrateur incorrect.');
        sessionStorage.removeItem('jmc_admin_auth_code');
      }
    } catch (error) {
      console.error("Failed to fetch admin data", error);
      setAuthError('Erreur de connexion au serveur. Veuillez vérifier le code d’accès ou réessayer.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authCode) {
      fetchAdminData(authCode);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      setAuthError('Veuillez saisir votre code d’accès.');
      return;
    }
    fetchAdminData(inputCode.trim());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthCode('');
    setInputCode('');
    sessionStorage.removeItem('jmc_admin_auth_code');
  };

  // Render Login Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 pt-24 pb-16 flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-md w-full border border-slate-100 text-center relative"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-medical-blue transition-colors mb-6 font-medium bg-slate-50 px-3.5 py-1.5 rounded-full border border-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site principal</span>
          </a>

          <div className="w-16 h-16 bg-medical-blue/10 text-medical-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Espace Administration Sécurisé</h2>
          <p className="text-slate-500 text-sm mb-6">
            Accès strictement réservé à la Direction et au personnel autorisé du John Medical Center.
          </p>

          {authError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="password"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-medical-blue focus:border-transparent text-center text-lg tracking-widest font-mono"
                autoFocus
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-medical-blue text-white font-semibold shadow-lg shadow-medical-blue/20 hover:bg-medical-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Déverrouiller le Tableau de Bord
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Session chiffrée & protégée</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Session Authentifiée
              </span>
            </div>
            <h1 className="text-3xl font-bold text-medical-dark flex items-center gap-3">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-slate-500 mt-1">Gérez les demandes de rendez-vous et les candidatures de stage en toute sécurité.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
              <button 
                onClick={() => setActiveTab('internships')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${activeTab === 'internships' ? 'bg-medical-blue text-white shadow-md' : 'text-slate-600 hover:text-medical-dark'}`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Stages ({data.internships.length})
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('contacts')}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${activeTab === 'contacts' ? 'bg-medical-blue text-white shadow-md' : 'text-slate-600 hover:text-medical-dark'}`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Messages ({data.contacts.length})
                </div>
              </button>
            </div>

            <a 
              href="#"
              className="px-4 py-2 rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors text-sm font-medium shadow-sm flex items-center gap-2"
              title="Quitter l'administration et revenir au site public"
            >
              <Home className="w-4 h-4 text-medical-blue" />
              <span className="hidden sm:inline">Retour au site</span>
            </a>

            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-600 text-slate-700 transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-medical-blue rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {/* Contacts Table */}
            {activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Nom & Contact</th>
                      <th className="px-6 py-4 font-semibold">Sujet</th>
                      <th className="px-6 py-4 font-semibold">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.contacts.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                          Aucun message reçu pour le moment.
                        </td>
                      </tr>
                    ) : (
                      data.contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(contact.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-medical-dark">{contact.nom}</div>
                            <div className="text-sm text-slate-500">{contact.telephone}</div>
                            <div className="text-sm text-medical-blue">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-blue/10 text-medical-blue capitalize">
                              {contact.sujet || 'Non spécifié'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700 max-w-md truncate" title={contact.message}>
                            {contact.message}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Internships Table */}
            {activeTab === 'internships' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm border-b border-slate-200">
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Candidat</th>
                      <th className="px-6 py-4 font-semibold">Études</th>
                      <th className="px-6 py-4 font-semibold">Détails du stage</th>
                      <th className="px-6 py-4 font-semibold">Document Joint</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.internships.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                          Aucune candidature de stage pour le moment.
                        </td>
                      </tr>
                    ) : (
                      data.internships.map((intern) => (
                        <tr key={intern.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(intern.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-medical-dark">{intern.nom} {intern.post_nom || ''} {intern.prenom}</div>
                            <div className="text-sm text-slate-500">{intern.telephone}</div>
                            <div className="text-sm text-medical-blue">{intern.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-700 capitalize">{intern.niveau_etudes || intern.niveau}</div>
                            <div className="text-sm text-slate-500">{intern.institution || intern.universite}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <span className="font-semibold text-medical-dark capitalize">{intern.type_stage}</span>
                              <span className="text-slate-500 mx-2">•</span>
                              <span className="capitalize">{intern.service_souhaite || intern.domaine || 'Aucun service spécifié'}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Du {intern.date_debut} au {intern.date_fin}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {intern.fichiers_joints ? (
                              <a 
                                href={intern.fichiers_joints}
                                target="_blank"
                                rel="noopener noreferrer" 
                                download={intern.original_filename || true}
                                className="inline-flex items-center gap-1.5 text-sm text-medical-blue bg-medical-blue/10 hover:bg-medical-blue hover:text-white px-3.5 py-1.5 rounded-full transition-all font-medium shadow-sm group"
                              >
                                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                                <span>Télécharger ({intern.original_filename || 'Fichier PDF/DOC'})</span>
                              </a>
                            ) : (
                              <span className="text-sm text-slate-400 italic">Aucun fichier</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => setSelectedInternship(intern)}
                              className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-medical-blue hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Voir dossier
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Modal Détails Candidature & Lettre de Motivation */}
        <AnimatePresence>
          {selectedInternship && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 overflow-hidden relative max-h-[90vh] flex flex-col"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-medical-blue/10 text-medical-blue rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Candidature de {selectedInternship.nom} {selectedInternship.prenom}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Soumise le {new Date(selectedInternship.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedInternship(null)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-y-auto space-y-6 pr-2">
                  {/* Personal info summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl text-sm">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Téléphone</span>
                      <span className="font-semibold text-slate-800">{selectedInternship.telephone}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Email</span>
                      <span className="font-semibold text-medical-blue break-all">{selectedInternship.email}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Niveau d'études</span>
                      <span className="font-semibold text-slate-800 capitalize">{selectedInternship.niveau_etudes || selectedInternship.niveau}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Institution</span>
                      <span className="font-semibold text-slate-800">{selectedInternship.institution || selectedInternship.universite}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Type de stage</span>
                      <span className="font-semibold text-slate-800 capitalize">{selectedInternship.type_stage}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">Période souhaitée</span>
                      <span className="font-semibold text-slate-800">{selectedInternship.date_debut} au {selectedInternship.date_fin}</span>
                    </div>
                  </div>

                  {/* Lettre de motivation */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-medical-blue" />
                      Lettre de Motivation
                    </h4>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedInternship.lettre_motivation || selectedInternship.motivation || "Aucune lettre de motivation rédigée."}
                    </div>
                  </div>

                  {/* Document Joint */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 mb-2">Document CV / Attestation</h4>
                    {selectedInternship.fichiers_joints ? (
                      <a 
                        href={selectedInternship.fichiers_joints}
                        target="_blank"
                        rel="noopener noreferrer" 
                        download={selectedInternship.original_filename || true}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-medical-blue text-white font-medium hover:bg-medical-dark transition-colors shadow-md shadow-medical-blue/20"
                      >
                        <Download className="w-5 h-5" />
                        <span>Télécharger {selectedInternship.original_filename || 'le fichier attaché'}</span>
                      </a>
                    ) : (
                      <p className="text-sm text-slate-400 italic">Aucun document joint pour cette candidature.</p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedInternship(null)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

