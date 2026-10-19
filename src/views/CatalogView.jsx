import React, { useState, useMemo, useEffect } from 'react';
import { CatalogControls } from '../components/CatalogControls';
import { ProductCard } from '../components/ProductCard';
import { GuidingStar } from '../components/MarineIllustrations';
import { PRODUCTS, PRICE_RANGES } from '../data/products';
import './CatalogView.css';

export const CatalogView = ({
  activeCategory,
  onSelectCategory,
  onGoToHome,
  onQuickView
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Cada vez que cambia la categoría, limpiamos la búsqueda si se desea, o mantenemos
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeCategory]);

  // Conteos por categoría
  const categoryCounts = useMemo(() => {
    const counts = {
      todas: PRODUCTS.length,
      aretes: 0,
      manillas: 0,
      cadenas: 0
    };
    PRODUCTS.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  // Filtrado por categoría, precio y búsqueda
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    // 1. Filtro por categoría
    if (activeCategory !== 'todas') {
      list = list.filter(p => p.category === activeCategory);
    }

    // 2. Filtro por rango de precio / inversión
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find(r => r.id === selectedPriceRange);
      if (range) {
        list = list.filter(p => p.price >= range.min && p.price < range.max);
      }
    }

    // 3. Búsqueda por término (nombre, intención, descripción, metal)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.intention.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q)
      );
    }

    // 4. Ordenación
    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      // featured: new first, then featured
      sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return sorted;
  }, [activeCategory, selectedPriceRange, searchTerm, sortBy]);

  const categoryTitles = {
    todas: 'Catálogo Completo de Oro 18K',
    aretes: 'Aretes & Candongas de Oro 18K',
    manillas: 'Manillas & Pulseras de Oro 18K',
    cadenas: 'Cadenas & Medallones de Oro 18K'
  };

  const categoryDescriptions = {
    todas: 'Explora nuestra colección integral de aretes, manillas y cadenas forjados en oro de 18 kilates con inspiración en la majestuosidad oceánica.',
    aretes: 'Topos, candongas y aretes largos que iluminan tu rostro con el brillo eterno del oro y perlas barrocas naturales.',
    manillas: 'Pulseras de eslabones pulidos a mano y brazaletes rígidos con zafiro y amuletos marinos concebidos para acompañar tu vida.',
    cadenas: 'Cadenas resistentes y medallones cincelados con luna, estrellas y fauna marina portadores de intención.'
  };

  return (
    <div className="catalog-view-wrapper animate-fade-in">
      <div className="container">
        {/* Migas de pan de lujo */}
        <nav className="catalog-breadcrumb" aria-label="Ruta de navegación">
          <button className="breadcrumb-link" onClick={onGoToHome}>
            Inicio
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            Catálogo 2026 {activeCategory !== 'todas' ? `• ${categoryTitles[activeCategory].split(' ')[0]}` : ''}
          </span>
        </nav>

        {/* Encabezado del Catálogo con dimensiones estables */}
        <div className="catalog-view-header">
          <span className="catalog-pill">ORFEBRERÍA EXCLUSIVA 2026</span>

          <div className="catalog-title-box">
            <div key={`title-${activeCategory}`} className="category-crossfade-node">
              <h1 className="catalog-title">{categoryTitles[activeCategory]}</h1>
            </div>
          </div>

          <div className="gold-divider">
            <span className="gold-divider-line"></span>
            <GuidingStar size={16} />
            <span className="gold-divider-line"></span>
          </div>

          <div className="catalog-subtitle-box">
            <div key={`desc-${activeCategory}`} className="category-crossfade-node">
              <p className="catalog-subtitle">
                {categoryDescriptions[activeCategory]}
              </p>
            </div>
          </div>
        </div>

        {/* Controles avanzados del catálogo (Categorías, Buscador, Ordenación, Rango de Inversión) */}
        <CatalogControls
          activeCategory={activeCategory}
          onSelectCategory={onSelectCategory}
          selectedPriceRange={selectedPriceRange}
          onSelectPriceRange={setSelectedPriceRange}
          counts={categoryCounts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* Grilla o Estado Vacío */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-no-results animate-fade-in">
            <div className="no-results-symbol">✦</div>
            <h3 className="no-results-title">No encontramos piezas con estos filtros</h3>
            <p className="no-results-text">
              Intenta ajustar el rango de inversión, buscar otros términos como <em>"oro"</em>, <em>"zafiro"</em>, <em>"perla"</em> o explorar otra categoría.
            </p>
            <button
              className="btn-gold"
              onClick={() => {
                setSearchTerm('');
                setSelectedPriceRange('all');
                onSelectCategory('todas');
              }}
            >
              RESTABLECER TODOS LOS FILTROS
            </button>
          </div>
        ) : (
          <div className="products-grid-wrapper">
            <div
              key={`grid-${activeCategory}-${sortBy}-${searchTerm}`}
              className="products-grid category-crossfade-node"
            >
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Banner de Asesoría en Atelier */}
        <div className="custom-order-banner">
          <div className="custom-order-text">
            <h4>✦ Asesoría Personalizada y Pedidos a Medida</h4>
            <p>
              ¿Tienes en mente una joya con kilataje, longitud o gema específica?
              Nuestro asesor y maestros joyeros están a tu disposición.
            </p>
          </div>
          <a
            href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20deseo%20asesoria%20para%20adquirir%20una%20joya%20del%20catalogo."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold custom-order-btn"
          >
            <span>HABLAR CON UN ASESOR</span>
          </a>
        </div>
      </div>
    </div>
  );
};
