import React from 'react';

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-content">
          <span className="section-label">Contacto</span>
          <h2 className="section-title">Hablemos de tu próximo proyecto</h2>
          
          <p className="contact-paragraph">
            Estoy disponible para comisiones, colaboraciones y ventas de ilustraciones.
          </p>

          <div className="contact-buttons">
            <a 
              href="https://www.instagram.com/solecito_.30/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-button instagram-button"
            >
              <span className="button-icon">📷</span>
              Instagram
            </a>
            <a 
              href="mailto:Sol.ilustra.estudio@gmail.com"
              className="contact-button email-button"
            >
              <span className="button-icon">✉️</span>
              Correo electrónico
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
