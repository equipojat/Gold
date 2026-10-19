import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { LuxuryHeartIcon } from './MarineIllustrations';
import './Navbar.css';

export const Navbar = ({
  currentView,
  onNavigate,
  activeCategory
}) => {
  const { totalItems, openCart } = useCart();
  const { totalWishlist, openWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view, category = 'todas') => {
    setIsMobileMenuOpen(false);
    onNavigate(view, category);
  };

  const handlePhilosophyClick = () => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home', 'todas');
      setTimeout(() => {
        const elem = document.getElementById('filosofia');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById('filosofia');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Barra superior de anuncio de lujo */}
      <div className="top-banner">
        <span>✦ ENVÍO ASEGURADO DE CORTESÍA EN TODAS LAS PIEZAS DE ORO 18K ✦</span>
      </div>

      <div className="navbar-container">
        {/* Botón menú móvil */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Navegación izquierda */}
        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
          <button
            className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => handleNav('home', 'todas')}
          >
            Inicio
          </button>

          <button
            className={`nav-link ${currentView === 'catalog' ? 'active' : ''}`}
            onClick={() => handleNav('catalog', 'todas')}
          >
            Catálogo
          </button>

          <button
            className="nav-link mobile-only"
            onClick={handlePhilosophyClick}
          >
            Filosofía
          </button>
        </nav>

        {/* Logotipo Central */}
        <div className="navbar-brand" onClick={() => handleNav('home', 'todas')}>
          <div className="brand-logo-lockup">
            <img src="/images/logo-isotipo.png" alt="Marea Viva Isotipo" className="brand-icon" />
            <div className="brand-text-group">
              <span className="brand-title">MAREA VIVA</span>
              <span className="brand-tagline">JOYAS CON INTENCIÓN</span>
            </div>
          </div>
        </div>

        {/* Acciones derecha */}
        <div className="navbar-actions">
          <button
            className="nav-link desktop-only philosophy-link"
            onClick={handlePhilosophyClick}
          >
            Filosofía
          </button>

          {/* Botón Lista de Deseos / Favoritos */}
          <button
            className="wishlist-trigger-btn"
            onClick={openWishlist}
            aria-label="Ver lista de deseos"
            title="Lista de deseos"
          >
            <div className="wishlist-icon-wrapper">
              <LuxuryHeartIcon
                size={19}
                color={totalWishlist > 0 ? 'var(--color-gold)' : 'var(--color-ocean)'}
                filled={totalWishlist > 0}
              />
              {totalWishlist > 0 && (
                <span className="wishlist-badge animate-fade-in">{totalWishlist}</span>
              )}
            </div>
          </button>

          {/* Botón Bolsa de compra */}
          <button
            className="cart-trigger-btn"
            onClick={openCart}
            aria-label="Ver bolsa de compra"
          >
            <span className="cart-label">Bolsa</span>
            <div className="cart-icon-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalItems > 0 && (
                <span className="cart-badge animate-fade-in">{totalItems}</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
