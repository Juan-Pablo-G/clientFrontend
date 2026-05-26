import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProductsMainSection from '../components/ProductsMainSection';
import ContactSection from '../components/ContactSection';
import LoginModal from '../components/LoginModal.jsx';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [refreshKey, setRefreshKey] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleAdminClick = () => {
    setLoginOpen(true);
  };

  return (
    <div className="landing-page">
      <HeroSection onNavClick={handleNavClick} onAdminClick={handleAdminClick} />

      <main className="sections-container">
        {/* Sección Sobre mí */}
        {activeSection === 'sobre-mi' && (
          <div className="section-wrapper fade-in">
            <AboutSection />
          </div>
        )}

        {/* Sección Mi trabajo - Productos principales */}
        {activeSection === 'mi-trabajo' && (
          <div className="section-wrapper fade-in">
            <ProductsMainSection 
              refreshKey={refreshKey}
            />
          </div>
        )}

        {/* Sección Contacto */}
        {activeSection === 'contacto' && (
          <div className="section-wrapper fade-in">
            <ContactSection />
          </div>
        )}
      </main>

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
        />
      )}

      <footer className="footer">
        <p>&copy; 2026 Muris Art. Ilustraciones y diseño.</p>
      </footer>
    </div>
  );
}