import React from 'react';
import { buildUrl } from '../api';

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <span className="section-label">Sobre mí</span>
          <h2 className="section-title">¡Holaaa! Me presento, soy Anasol Granobles</h2>
          
          <p className="about-paragraph">
            Soy ilustradora y diseñadora colombiana con un enfoque en el estilo infantil. Me apasiona dar vida a productos a través de mis ilustraciones, creando piezas llenas de color, ternura y creatividad.
          </p>

          <p className="about-paragraph">
            Si crees que mi estilo puede aportar valor a tu marca, producto o proyecto editorial, ¡contáctame y creemos juntos algo especial!
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
