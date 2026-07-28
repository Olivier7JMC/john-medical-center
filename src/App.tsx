import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { History } from './components/History';
import { Services } from './components/Services';
import { Team } from './components/Team';
import { Gallery } from './components/Gallery';
import { Internships } from './components/Internships';
import { InternshipForm } from './components/InternshipForm';
import { Campaigns } from './components/Campaigns';
import { Impact } from './components/Impact';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (isAdmin) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>Administration | John Medical Center</title>
        </Helmet>
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow">
            <AdminDashboard />
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>John Medical Center et Maternité | Hôpital de référence</title>
        <meta name="description" content="John Medical Center et Maternité (JMC). Des médecins hautement qualifiés et des soins de qualité en République Démocratique du Congo. Chirurgie, Maternité, Pédiatrie et plus." />
        <meta name="keywords" content="Hôpital, Clinique, Maternité, JMC, John Medical Center, Soins médicaux, Médecin, Santé, Chirurgie, Pédiatrie" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jmc-hopital.com/" />
        <meta property="og:title" content="John Medical Center et Maternité" />
        <meta property="og:description" content="Votre santé est notre priorité. Soins médicaux de qualité en République Démocratique du Congo." />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jmc-hopital.com/" />
        <meta property="twitter:title" content="John Medical Center et Maternité" />
        <meta property="twitter:description" content="Votre santé est notre priorité. Soins médicaux de qualité en République Démocratique du Congo." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        
        <main className="flex-grow">
          <Hero />
          <About />
          <History />
          <Services />
          <Team />
          <Gallery />
          <Internships />
          <InternshipForm />
          <Campaigns />
          <Impact />
          <Reviews />
          <Contact />
        </main>
        
        <Footer />
        <CookieBanner />
      </div>
    </HelmetProvider>
  );
}
