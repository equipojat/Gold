import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { GuidingStar, LuxuryHeartIcon } from './MarineIllustrations';
import { SizeGuideModal } from './SizeGuideModal';
import './ProductModal.css';

export const ProductModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedLength, setSelectedLength] = useState(product?.length || '');
  const [addedToast, setAddedToast] = useState(false);

  const gallery = product?.gallery && product.gallery.length > 0 ? product.gallery : [product?.image];
  const [activeImage, setActiveImage] = useState(gallery[0] || product?.image);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Grabado opcional
  const [enableEngraving, setEnableEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [engravingFont, setEngravingFont] = useState('romana');

  useEffect(() => {
    if (product) {
      setActiveImage(product.gallery?.[0] || product.image);
      setQuantity(1);
      setSelectedLength(product.length || '');
      setEnableEngraving(false);
      setEngravingText('');
    }
  }, [product]);

  if (!product) return null;

  const isFav = isFavorite(product.id);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      length: selectedLength,
      engraving: enableEngraving && engravingText.trim() ? { text: engravingText.trim(), font: engravingFont } : null
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleWhatsAppConsult = () => {
    const text = encodeURIComponent(
      `Hola Marea Viva, estoy interesado/a en la pieza *${product.name}* en ${product.metal} (${product.formattedPrice}). ¿Me podrían brindar más información sobre la disponibilidad y medidas personalizadas?`
    );
    window.open(`https://wa.me/573001234567?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-container animate-fade-in"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Botón cerrar */}
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>

          <div className="modal-body">
            {/* Lado izquierdo: Galería y Fotografía con Lupa */}
            <div className="modal-image-col">
              <div
                className={`modal-image-wrapper ${isZooming ? 'zooming' : ''}`}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className="modal-image"
                  style={
                    isZooming
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                          transform: 'scale(2.2)'
                        }
                      : {}
                  }
                />
                <div className="modal-image-seal">
                  <GuidingStar size={14} />
                  <span>Oro 18K Certificado</span>
                </div>
                <div className="zoom-hint-badge">
                  <span>🔍 {isZooming ? 'Explorando orfebrería' : 'Pasa el cursor para zoom'}</span>
                </div>
              </div>

              {/* Tira de miniaturas de la galería */}
              {gallery.length > 1 && (
                <div className="modal-gallery-thumbs">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-thumb-btn ${activeImage === img ? 'active' : ''}`}
                      onClick={() => setActiveImage(img)}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Lado derecho: Información detallada */}
            <div className="modal-info-col">
              <div className="modal-header-top-row">
                <div className="modal-intention-header">
                  <GuidingStar size={13} />
                  <span>INTENCIÓN: {product.intention}</span>
                </div>
                {/* Botón favorito en modal */}
                <button
                  type="button"
                  className={`modal-fav-toggle-btn ${isFav ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={isFav ? 'Quitar de lista de deseos' : 'Guardar en lista de deseos'}
                >
                  <LuxuryHeartIcon size={18} color="var(--color-gold)" filled={isFav} />
                  <span>{isFav ? 'En mis deseos' : 'Guardar'}</span>
                </button>
              </div>

              <span className="modal-category">{product.categoryName}</span>
              <h2 className="modal-title">{product.name}</h2>

              <div className="modal-price-row">
                <span className="modal-price">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    maximumFractionDigits: 0
                  }).format(product.price * quantity)}
                </span>
                <span className="modal-usd">{product.usdPrice}</span>
                {quantity > 1 && (
                  <span className="modal-qty-multiplier">({quantity} piezas)</span>
                )}
              </div>

              <p className="modal-description">{product.description}</p>

              {/* Ficha técnica de la joya */}
              <div className="modal-specs-box">
                <div className="spec-row">
                  <span className="spec-name">Pureza del Metal:</span>
                  <span className="spec-value">{product.metal}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-name">Peso Promedio:</span>
                  <span className="spec-value">{product.weight}</span>
                </div>
                <div className="spec-row size-guide-row">
                  <span className="spec-name">Dimensión / Largo:</span>
                  <div className="spec-value-with-guide">
                    <span className="spec-value">{product.length}</span>
                    {(product.category === 'cadenas' || product.category === 'manillas') && (
                      <button
                        type="button"
                        className="btn-trigger-size-guide"
                        onClick={() => setIsSizeGuideOpen(true)}
                      >
                        📐 Ver Guía de Medidas
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Grabado opcional de cortesía si la pieza lo permite */}
              {product.allowEngraving && (
                <div className="modal-engraving-card">
                  <label className="engraving-checkbox-label">
                    <input
                      type="checkbox"
                      checked={enableEngraving}
                      onChange={(e) => setEnableEngraving(e.target.checked)}
                    />
                    <span className="engraving-checkbox-text">
                      ✦ Personalizar con grabado láser en taller (Cortesía)
                    </span>
                  </label>

                  {enableEngraving && (
                    <div className="engraving-options-box animate-fade-in">
                      <div className="engraving-input-group">
                        <input
                          type="text"
                          maxLength={14}
                          placeholder="Ej. C & M • 28.09"
                          className="engraving-input"
                          value={engravingText}
                          onChange={(e) => setEngravingText(e.target.value)}
                        />
                        <span className="engraving-char-count">{engravingText.length}/14</span>
                      </div>
                      <div className="engraving-font-choices">
                        <button
                          type="button"
                          className={`font-choice-btn ${engravingFont === 'romana' ? 'active' : ''}`}
                          onClick={() => setEngravingFont('romana')}
                        >
                          Romana Clásica
                        </button>
                        <button
                          type="button"
                          className={`font-choice-btn ${engravingFont === 'cursiva' ? 'active' : ''}`}
                          onClick={() => setEngravingFont('cursiva')}
                        >
                          Cursiva Atelier
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Puntos destacados */}
              <div className="modal-highlights">
                <span className="highlights-title">Detalles de Elaboración:</span>
                <ul>
                  {product.details?.map((item, idx) => (
                    <li key={idx}>✦ {item}</li>
                  ))}
                </ul>
              </div>

              {/* Controles de compra */}
              <div className="modal-actions-area">
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                    aria-label="Disminuir cantidad"
                    type="button"
                  >
                    -
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                    aria-label="Aumentar cantidad"
                    type="button"
                  >
                    +
                  </button>
                </div>

                <button className="btn-gold modal-add-btn" onClick={handleAddToCart} type="button">
                  <span>AÑADIR A LA BOLSA</span>
                </button>
              </div>

              {/* Botón secundario para asesoría por WhatsApp */}
              <button className="modal-wa-btn" onClick={handleWhatsAppConsult} type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.348 1.199 1.637 1.189 1.839 1.074.202-.116.433-.405.621-.665.188-.26.376-.217.621-.13.245.087 1.56.736 1.82 1.098.26.362.26.694.116 1.099z" />
                </svg>
                <span>Consultar con un Asesor por WhatsApp</span>
              </button>

              {addedToast && (
                <div className="added-notification animate-fade-in">
                  <GuidingStar size={13} />
                  <span>Joya añadida exitosamente a tu bolsa</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Guía de Medidas */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        initialCategory={product.category}
      />
    </>
  );
};
