import React from 'react';
import {
  SeaTurtleOrnament,
  CoralOrnament,
  WhaleOrnament,
  GuidingStar
} from './MarineIllustrations';
import './Hero.css';

export const Hero = ({ onExploreClick }) => {
  return (
    <section className="hero-section">
      {/* Marco perimetral fino que evoca la lámina editorial de catálogo */}
      <div className="hero-editorial-frame">
        {/* Ilustraciones lineales en las esquinas */}
        <div className="corner-ornament top-left" aria-hidden="true">
          <SeaTurtleOrnament />
        </div>

        <div className="corner-ornament bottom-left" aria-hidden="true">
          <CoralOrnament />
        </div>

        <div className="corner-ornament bottom-right" aria-hidden="true">
          <WhaleOrnament />
        </div>

        {/* Contenido Central Protagonista */}
        <div className="hero-core-content">
          {/* Logotipo Maestro Oficial Marea Viva proporcionado por la marca */}
          <div className="hero-master-logo-container animate-fade-in">
            <h1 className="sr-only">MAREA VIVA - Joyas que llevan tu intención</h1>
            <img
              src="/images/logo-marea-viva.png"
              alt="Marea Viva - Joyas que llevan tu intención"
              className="hero-master-logo"
            />
          </div>

          <p className="hero-manifesto-subtext">
            Joyería fina en oro de 18 kilates forjada con devoción artesanal, 
            calma marina y un diseño minimalista concebido para trascender.
          </p>

          {/* Botones de acción */}
          <div className="hero-cta-group animate-fade-in">
            <button className="btn-gold" onClick={onExploreClick}>
              <span>EXPLORAR CATÁLOGO 2026</span>
              <span className="btn-arrow">→</span>
            </button>
            <a href="#filosofia" className="btn-outline-gold">
              <span>NUESTRA FILOSOFÍA</span>
            </a>
          </div>

          {/* Pie de Portada: Catálogo 2026 con estrella dorada */}
          <div className="hero-catalog-badge">
            <GuidingStar size={14} />
            <span className="catalog-label">CATÁLOGO EXCLUSIVO 2026</span>
            <GuidingStar size={14} />
          </div>
        </div>
      </div>

      {/* Franja de exhibición editorial de las piezas */}
      <div className="hero-editorial-showcase container">
        <div className="showcase-card">
          <div className="showcase-image-wrapper">
            <img
              src="/images/hero-collection.jpg"
              alt="Colección Marea Viva en Oro 18K"
              className="showcase-image"
            />
            <div className="showcase-overlay">
              <span className="showcase-tag">COLECCIÓN MAREAS PERPETUAS</span>
              <p className="showcase-quote">
                "El oro no envejece; como el mar profundo, permanece eterno y puro."
              </p>
            </div>
          </div>

          <div className="showcase-stats">
            <div className="stat-item">
              <span className="stat-number">18K</span>
              <span className="stat-label">Oro Amarillo Certificado</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Orfebrería Hecha a Mano</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Líneas: Aretes, Manillas, Cadenas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
