import React from 'react';
import { BRAND_VALUES } from '../data/products';
import { GuidingStar } from './MarineIllustrations';
import './BrandStory.css';

export const BrandStory = () => {
  return (
    <section id="filosofia" className="brand-story-section">
      <div className="container">
        {/* Cabecera de Sección */}
        <div className="section-header-editorial">
          <div className="editorial-pill">FILOSOFÍA DE MARCA</div>
          <h2 className="editorial-heading">EL ALMA DE MAREA VIVA</h2>
          <div className="gold-divider">
            <span className="gold-divider-line"></span>
            <GuidingStar size={16} />
            <span className="gold-divider-line"></span>
          </div>
          <p className="editorial-lead">
            Creemos que una joya de oro auténtico no es simplemente un adorno, 
            sino un ancla de intención personal: un recordatorio tangible de serenidad, 
            rumbo y fortaleza que te acompaña en cada marea de la vida.
          </p>
        </div>

        {/* Pilares de Marca */}
        <div className="pillars-grid">
          {BRAND_VALUES.map((pillar, idx) => (
            <div key={idx} className="pillar-card">
              <div className="pillar-icon-box">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Guía de Cuidado del Oro 18K */}
        <div className="gold-care-card">
          <div className="gold-care-content">
            <span className="gold-care-tag">ORFEBRERÍA & CUIDADO</span>
            <h3 className="gold-care-title">Cómo preservar el brillo eterno de tu Oro 18K</h3>
            <p className="gold-care-text">
              El oro de 18 kilates es noble, noblemente resistente a la oxidación y eterno por naturaleza. 
              Para conservar su resplandor áureo y satinado original:
            </p>
            <div className="care-tips-grid">
              <div className="care-tip">
                <span className="care-tip-num">01</span>
                <div>
                  <strong>Limpieza con suavidad:</strong>
                  <p>Lava periódicamente tus piezas con agua tibia y jabón neutro, secando con un paño de microfibra suave.</p>
                </div>
              </div>
              <div className="care-tip">
                <span className="care-tip-num">02</span>
                <div>
                  <strong>Almacenaje individual:</strong>
                  <p>Conserva cada joya en su bolsa de lino crudo Marea Viva para evitar roces entre metales y gemas.</p>
                </div>
              </div>
              <div className="care-tip">
                <span className="care-tip-num">03</span>
                <div>
                  <strong>Cuidado con químicos:</strong>
                  <p>Aplica perfumes, cremas o lociones antes de colocarte tus joyas de oro para proteger los engastes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
