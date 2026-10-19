import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { InfoModals } from './components/InfoModals';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import './App.css';

function MainShop() {
  const { isCartOpen, isCheckoutOpen } = useCart();
  const { isWishlistOpen } = useWishlist();

  // Inicialización de vista y categoría a partir del hash de la URL
  const parseHash = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash === 'aretes' || hash === 'manillas' || hash === 'cadenas') {
      return { view: 'catalog', category: hash };
    }
    if (hash === 'catalogo') {
      return { view: 'catalog', category: 'todas' };
    }
    return { view: 'home', category: 'todas' };
  };

  const initial = parseHash();
  const [currentView, setCurrentView] = useState(initial.view);
  const [activeCategory, setActiveCategory] = useState(initial.category);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeInfoModal, setActiveInfoModal] = useState(null); // 'shipping' | 'authenticity' | 'care' | null

  // Bloquear scroll de la página de fondo cuando cualquier ventana o modal esté abierta
  useEffect(() => {
    const isAnyOverlayOpen = Boolean(
      isCartOpen || isCheckoutOpen || isWishlistOpen || quickViewProduct || activeInfoModal
    );
    if (isAnyOverlayOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isCartOpen, isCheckoutOpen, isWishlistOpen, quickViewProduct, activeInfoModal]);

  // Escuchar cambios en la URL (botón atrás/adelante del navegador)
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      setCurrentView(parsed.view);
      setActiveCategory(parsed.category);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Manejador centralizado de navegación
  const handleNavigate = (view, category = 'todas') => {
    setCurrentView(view);
    setActiveCategory(category);

    // Sincronizar hash en la URL
    if (view === 'catalog') {
      if (category !== 'todas') {
        window.location.hash = category;
      } else {
        window.location.hash = 'catalogo';
      }
    } else {
      window.location.hash = 'inicio';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* Barra de Navegación con pestañas interactivas */}
      <Navbar
        currentView={currentView}
        activeCategory={activeCategory}
        onNavigate={handleNavigate}
      />

      <main>
        {currentView === 'home' ? (
          <HomeView
            onGoToCatalog={(cat) => handleNavigate('catalog', cat || 'todas')}
            onQuickView={setQuickViewProduct}
          />
        ) : (
          <CatalogView
            activeCategory={activeCategory}
            onSelectCategory={(cat) => handleNavigate('catalog', cat)}
            onGoToHome={() => handleNavigate('home', 'todas')}
            onQuickView={setQuickViewProduct}
          />
        )}
      </main>

      {/* Pie de Página con acceso a modales de confianza */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInfoModal={(type) => setActiveInfoModal(type)}
      />

      {/* Modal QuickView de Producto */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Bolsa de Compra Lateral */}
      <CartDrawer />

      {/* Cajón Lateral de Lista de Deseos (Favoritos) */}
      <WishlistDrawer onQuickView={setQuickViewProduct} />

      {/* Modales de Información y Confianza (Envíos, Autenticidad, Cuidado) */}
      <InfoModals
        modalType={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />

      {/* Modal de Pasarela de Pago Detallada */}
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <MainShop />
      </WishlistProvider>
    </CartProvider>
  );
}
