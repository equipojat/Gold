import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { GuidingStar, LuxuryHeartIcon } from './MarineIllustrations';
import './ProductCard.css';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleWishlist } = useWishlist();

  const isFav = isFavorite(product.id);

  return (
    <article className="product-card">
      <div className="product-media-container" onClick={() => onQuickView(product)}>
        {/* Badges superiores */}
        <div className="product-badges">
          <span className="badge-gold">ORO 18K</span>
          {product.isNew && <span className="badge-new">NUEVA PIEZA</span>}
        </div>

        {/* Botón flotante de lista de deseos */}
        <button
          type="button"
          className={`card-wishlist-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFav ? 'Quitar de lista de deseos' : 'Guardar en lista de deseos'}
        >
          <LuxuryHeartIcon size={16} color={isFav ? 'var(--color-gold)' : 'var(--color-ocean)'} filled={isFav} />
        </button>

        {/* Imagen del producto */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Botón flotante para ver detalle */}
        <div className="product-media-overlay">
          <button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            VER DETALLE
          </button>
        </div>
      </div>

      <div className="product-details">
        {/* Intención / Simbolismo */}
        <div className="product-intention-badge">
          <GuidingStar size={11} />
          <span>{product.intention}</span>
        </div>

        {/* Categoría y Nombre */}
        <span className="product-category-label">{product.categoryName}</span>
        <h3 className="product-title" onClick={() => onQuickView(product)}>
          {product.name}
        </h3>

        {/* Especificación de metal */}
        <p className="product-spec-preview">{product.metal}</p>

        {/* Precio */}
        <div className="product-pricing">
          <span className="product-main-price">{product.formattedPrice}</span>
          <span className="product-usd-price">{product.usdPrice}</span>
        </div>

        {/* Botón Añadir a la bolsa */}
        <button
          className="btn-add-bag"
          onClick={() => addToCart(product, 1)}
          aria-label={`Añadir ${product.name} a la bolsa`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>AÑADIR A LA BOLSA</span>
        </button>
      </div>
    </article>
  );
};
