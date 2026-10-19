import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { GuidingStar, LuxuryHeartIcon } from './MarineIllustrations';
import './WishlistDrawer.css';

export const WishlistDrawer = ({ onSelectProduct }) => {
  const { wishlistItems, isWishlistOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    closeWishlist();
    openCart();
  };

  const handleShareWishlistWhatsApp = () => {
    if (wishlistItems.length === 0) return;
    const itemsList = wishlistItems
      .map((item, idx) => `${idx + 1}. *${item.name}* (${item.formattedPrice})`)
      .join('\n');

    const text = encodeURIComponent(
      `Hola Marea Viva, he guardado mis piezas favoritas de oro 18K en mi Lista de Deseos:\n\n${itemsList}\n\n¿Podrían darme más detalles sobre disponibilidad y personalización?`
    );
    window.open(`https://wa.me/573001234567?text=${text}`, '_blank');
  };

  return (
    <div className="wishlist-backdrop" onClick={closeWishlist}>
      <aside
        className="wishlist-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera */}
        <div className="wishlist-drawer-header">
          <div className="wishlist-header-title-group">
            <LuxuryHeartIcon size={18} color="var(--color-gold)" filled={true} />
            <h3 className="wishlist-header-title">LISTA DE DESEOS</h3>
            <span className="wishlist-header-count">({wishlistItems.length})</span>
          </div>
          <button
            className="wishlist-close-btn"
            onClick={closeWishlist}
            aria-label="Cerrar lista de deseos"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        {wishlistItems.length === 0 ? (
          <div className="wishlist-empty-state">
            <div className="empty-heart-icon">
              <LuxuryHeartIcon size={44} color="rgba(201, 162, 74, 0.4)" />
            </div>
            <h4>Tu lista de deseos está vacía</h4>
            <p>
              Explora nuestra colección en oro 18K y pulsa el corazón ♡ en las piezas que desees conservar para ocasiones especiales.
            </p>
            <button className="btn-gold" onClick={closeWishlist}>
              <span>EXPLORAR JOYAS</span>
            </button>
          </div>
        ) : (
          <div className="wishlist-body">
            <div className="wishlist-items-list">
              {wishlistItems.map((product) => (
                <div key={product.id} className="wishlist-item-card">
                  <div
                    className="wishlist-item-image-wrapper"
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(product);
                        closeWishlist();
                      }
                    }}
                  >
                    <img src={product.image} alt={product.name} className="wishlist-item-img" />
                  </div>

                  <div className="wishlist-item-info">
                    <span className="wishlist-item-intention">{product.intention}</span>
                    <h4
                      className="wishlist-item-title"
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(product);
                          closeWishlist();
                        }
                      }}
                    >
                      {product.name}
                    </h4>
                    <span className="wishlist-item-metal">{product.metal}</span>
                    <div className="wishlist-item-price">{product.formattedPrice}</div>

                    <div className="wishlist-item-actions">
                      <button
                        className="btn-gold btn-wishlist-add"
                        onClick={() => handleMoveToCart(product)}
                      >
                        <span>AÑADIR A BOLSA</span>
                      </button>
                      <button
                        className="btn-wishlist-remove"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Quitar de favoritos"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer de la Wishlist */}
            <div className="wishlist-drawer-footer">
              <button
                className="btn-outline-gold wishlist-btn-share"
                onClick={handleShareWishlistWhatsApp}
              >
                <span>COMPARTIR MIS DESEOS POR WHATSAPP</span>
              </button>
              <p className="wishlist-disclaimer">
                ✦ Tus piezas favoritas quedan guardadas en tu navegador para tu próxima visita.
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
