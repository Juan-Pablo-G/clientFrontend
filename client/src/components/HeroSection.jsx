import React from 'react';

export default function HeroSection({ onNavClick, onAdminClick }) {
  return (
    <header className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">ANASOL ART</h1>

        <div className="hero-image-container">
          <img
            src="/images/PORTADA.png"
            alt="Ilustración principal"
            className="hero-image"
          />
        </div>

        <nav className="hero-nav">
          <button 
            className="nav-link"
            onClick={() => onNavClick('sobre-mi')}
          >
            Sobre mí
          </button>
          <button 
            className="nav-link"
            onClick={() => onNavClick('mi-trabajo')}
          >
            Mi trabajo
          </button>
          <button 
            className="nav-link"
            onClick={() => onNavClick('contacto')}
          >
            Contacto
          </button>
          <button
            type="button"
            className="nav-link nav-admin"
            onClick={onAdminClick}
          >
            Administrar
          </button>
        </nav>
      </div>

      <div className="hero-bottom-curve"></div>
    </header>
  );
}
