import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, CheckCircle2, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export function InternshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/internship", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        e.currentTarget.reset();
        setFileName('');
        setTimeout(() => setIsSuccess(false), 8000);
      } else {
        setErrorMessage("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-dark mb-4">Postuler pour un stage</h2>
            <p className="text-slate-600">Remplissez le formulaire ci-dessous pour soumettre votre candidature.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="w-20 h-20 bg-medical-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-medical-green" />
                </div>
                <h3 className="text-2xl font-bold text-medical-dark mb-2">Candidature envoyée !</h3>
                <p className="text-slate-600">Nous examinerons votre demande et vous contacterons sous peu.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Informations Personnelles */}
                <div>
                  <h3 className="text-xl font-bold text-medical-blue mb-6 border-b border-slate-100 pb-2">Informations Personnelles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Nom *</label>
                      <input name="nom" required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Post-nom</label>
                      <input name="post_nom" type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Prénom *</label>
                      <input name="prenom" required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email *</label>
                      <input name="email" required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Téléphone *</label>
                      <input name="telephone" required type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Date de naissance</label>
                      <input name="date_naissance" type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Genre</label>
                      <select name="genre" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                        <option value="">Sélectionner...</option>
                        <option value="homme">Homme</option>
                        <option value="femme">Femme</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">Adresse</label>
                      <input name="adresse" type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                  </div>
                </div>

                {/* Formation */}
                <div>
                  <h3 className="text-xl font-bold text-medical-blue mb-6 border-b border-slate-100 pb-2">Formation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Niveau d'études *</label>
                      <select name="niveau_etudes" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                        <option value="">Sélectionner...</option>
                        <option value="prepa">Préparatoire</option>
                        <option value="diplome">Diplômé</option>
                        <option value="1grad">1er Graduat</option>
                        <option value="2grad">2ème Graduat</option>
                        <option value="3grad">3ème Graduat</option>
                        <option value="1licence">1ère Licence</option>
                        <option value="2licence">2ème Licence</option>
                        <option value="1doc">1ère Doctorat</option>
                        <option value="2doc">2ème Doctorat</option>
                        <option value="3doc">3ème Doctorat</option>
                        <option value="4doc">4ème Doctorat</option>
                        <option value="perfectionnement">Perfectionnement</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Institution / Université *</label>
                      <input name="institution" required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                  </div>
                </div>

                {/* Informations Stage */}
                <div>
                  <h3 className="text-xl font-bold text-medical-blue mb-6 border-b border-slate-100 pb-2">Informations sur le stage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Type de stage *</label>
                      <select name="type_stage" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                        <option value="">Sélectionner...</option>
                        <option value="medical">Stage Médical</option>
                        <option value="training">Training</option>
                        <option value="admin">Stage Administratif</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Service souhaité</label>
                      <select name="service_souhaite" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all">
                        <option value="">Aucune préférence</option>
                        <option value="chirurgie">Chirurgie</option>
                        <option value="pediatrie">Pédiatrie</option>
                        <option value="maternite">Maternité</option>
                        <option value="med-interne">Médecine interne</option>
                        <option value="admin">Administration Centrale JMC</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Date début souhaitée *</label>
                      <input name="date_debut" required type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Date fin souhaitée *</label>
                      <input name="date_fin" required type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Lettre de motivation *</label>
                    <textarea 
                      name="lettre_motivation"
                      required 
                      rows={5} 
                      maxLength={500}
                      placeholder="Expliquez brièvement pourquoi vous souhaitez effectuer un stage au JMC, vos objectifs d'apprentissage et comment ce stage s'inscrit dans votre parcours professionnel."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-blue/20 focus:border-medical-blue transition-all resize-none thin-scrollbar"
                    ></textarea>
                    <p className="text-xs text-slate-500 text-right">Max 500 caractères</p>
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <h3 className="text-xl font-bold text-medical-blue mb-6 border-b border-slate-100 pb-2">Téléchargement des dossiers</h3>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:bg-slate-50 transition-colors relative">
                    <input 
                      name="fichiers_joints"
                      type="file" 
                      accept=".doc,.docx,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-10 h-10 text-medical-blue/50 mx-auto mb-4" />
                    <p className="font-semibold text-medical-dark mb-1">
                      {fileName ? <span className="text-medical-green">{fileName}</span> : "Joindre les fichiers (CV, Lettre de recommandation)"}
                    </p>
                    <p className="text-sm text-slate-500">Formats acceptés : DOC, DOCX, PDF</p>
                    
                    {!fileName && (
                      <button type="button" className="mt-4 px-6 py-2 rounded-full border border-slate-300 text-slate-700 font-medium hover:border-medical-blue hover:text-medical-blue transition-colors pointer-events-none">
                        Parcourir
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto md:px-12 py-4 rounded-full bg-medical-blue text-white font-bold text-lg hover:bg-medical-blue-light transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-medical-blue/20 hover:shadow-xl hover:shadow-medical-blue/30"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Soumettre la candidature
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
