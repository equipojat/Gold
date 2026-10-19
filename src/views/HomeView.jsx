import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { BrandStory } from '../components/BrandStory';
import { FAQSection } from '../components/FAQSection';
import { GuidingStar } from '../components/MarineIllustrations';
import { PRODUCTS } from '../data/products';
import './HomeView.css';

export const HomeView = ({ onGoToCatalog, onQuickView }) => {
  // 3 piezas insignia para el adelanto de entrada (1 aretes, 1 manilla, 1 cadena)
  const featuredPreview = PRODUCTS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="home-view-wrapper animate-fade-in">
      {/* Portada Editorial Hero */}
      <Hero onExploreClick={() => onGoToCatalog('todas')} />

      {/* Sección Selección de Entrada / Destacados */}
      <section className="home-featured-section">
        <div className="container">
          <div className="home-featured-header">
            <span className="editorial-pill">SELECCIÓN EDITORIAL</span>
            <h2 className="editorial-heading">PIEZAS DE ENTRADA</h2>
            <div className="gold-divider">
              <span className="gold-divider-line"></span>
              <GuidingStar size={16} />
              <span className="gold-divider-line"></span>
            </div>
            <p className="editorial-lead">
              Una cuidada introducción a nuestra orfebrería marina. Descubre los talismanes
              más representativos de nuestra visión en oro macizo de 18 kilates.
            </p>
          </div>

          <div className="home-featured-grid">
            {featuredPreview.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          {/* Botón para navegar a la pestaña de Catálogo Completo */}
          <div className="home-view-all-cta">
            <button
              className="btn-gold btn-explore-all"
              onClick={() => onGoToCatalog('todas')}
            >
              <span>VER TODO EL CATÁLOGO (ARETES, MANILLAS, CADENAS)</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sección Institucional: Filosofía & Cuidado del Oro */}
      <BrandStory />

      {/* Preguntas Frecuentes (FAQ de Lujo) */}
      <FAQSection />

      {/* Banner de Contacto Atelier */}
      <section className="container">
        <div className="custom-order-banner">
          <div className="custom-order-text">
            <h4>✦ ¿Buscas una joya personalizada o una medida especial?</h4>
            <p>
              Nuestros maestros orfebres diseñan piezas a medida en oro amarillo, blanco o rosa de 18K. 
              Contáctanos para forjar tu propia joya de intención.
            </p>
          </div>
          <a
            href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20quisiera%20cotizar%20una%20joya%20personalizada%20en%20oro%2018K."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold custom-order-btn"
          >
            <span>CONSULTAR CON ATELIER</span>
          </a>
        </div>
      </section>
    </div>
  );
};
