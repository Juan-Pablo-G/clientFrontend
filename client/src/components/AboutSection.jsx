import React from 'react';
import { buildUrl } from '../api';

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <span className="section-label">Sobre mí</span>
          <h2 className="section-title">Hola, soy artista visual.</h2>
          
          <p className="about-paragraph">
            Combino ilustración, color y armonía para crear piezas que transmiten alegría y cercanía.
          </p>

          <p className="about-paragraph">
            Mi trabajo está pensado para quienes buscan una estética fresca, con detalles originales y un mensaje claro.
          </p>

          <div className="about-highlight">
            <p className="highlight-text">
              Especializada en crear composiciones visuales que capturan emociones y conectan con tu audiencia.
            </p>
          </div>
        </div>

        <div className="about-image-container">
          <img
            src={buildUrl("/images/fotoSol.png")}
            alt="Muestra de trabajo"
            className="about-image"
          />
        </div>
      </div>
    </section>
  );
}
