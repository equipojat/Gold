import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { GuidingStar, LuxuryLockIcon } from './MarineIllustrations';
import './CartDrawer.css';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    openCheckout,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalAmount,
    totalFormatted,
    checkoutViaWhatsApp
  } = useCart();

  const [notes, setNotes] = useState('');

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    openCheckout();
  };

  return (
    <div className="cart-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Bolsa de compras"
      >
        {/* Cabecera del Drawer */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-group">
            <span className="cart-header-title">TU BOLSA DE COMPRA</span>
            <span className="cart-header-count">({totalItems} {totalItems === 1 ? 'joya' : 'joyas'})</span>
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar bolsa">
            ✕
          </button>
        </div>

        {/* Barra de beneficio de lujo */}
        <div className="cart-shipping-notice">
          <GuidingStar size={12} />
          <span>Envío asegurado de alta seguridad incluido a todo el país</span>
        </div>

        {/* Contenido / Lista de productos */}
        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-symbol">✦</div>
              <h3 className="empty-title">Tu bolsa está vacía</h3>
              <p className="empty-text">
                Cada joya de Marea Viva es una pieza de intención forjada en oro de 18 kilates esperando conectar contigo.
              </p>
              <button
                className="btn-gold"
                onClick={() => {
                  closeCart();
                  const catalog = document.getElementById('catalogo');
                  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                EXPLORAR JOYAS
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.product.id} className="cart-item-row">
                  <div className="cart-item-thumb">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <span className="cart-item-category">{item.product.categoryName}</span>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label="Eliminar producto"
                      >
                        ✕
                      </button>
                    </div>

                    <h4 className="cart-item-title">{item.product.name}</h4>
                    <span className="cart-item-metal">{item.product.metal}</span>

                    <div className="cart-item-bottom">
                      <div className="cart-item-stepper">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="stepper-btn"
                          aria-label="Restar una unidad"
                        >
                          -
                        </button>
                        <span className="stepper-qty">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="stepper-btn"
                          aria-label="Sumar una unidad"
                        >
                          +
                        </button>
                      </div>

                      <div className="cart-item-subtotal">
                        {new Intl.NumberFormat('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                          maximumFractionDigits: 0
                        }).format(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dedicatoria o nota especial opcional */}
              <div className="cart-notes-section">
                <label htmlFor="cart-notes" className="cart-notes-label">
                  ✦ ¿Deseas incluir una tarjeta de regalo o dedicatoria?
                </label>
                <textarea
                  id="cart-notes"
                  className="cart-notes-input"
                  placeholder="Escribe aquí tu dedicatoria personalizada o solicitud especial de medida..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pie del Drawer con totales y CTAs */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-totals-breakdown">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{totalFormatted}</span>
              </div>
              <div className="total-row">
                <span>Envío Asegurado Nacional</span>
                <span className="free-shipping-tag">CORTESÍA</span>
              </div>
              <div className="total-row grand-total">
                <span>Total Estimado</span>
                <span className="grand-price">{totalFormatted}</span>
              </div>
            </div>

            {/* Acciones de Checkout */}
            <div className="cart-cta-stack">
              {/* WhatsApp Checkout */}
              <button
                className="cart-btn-whatsapp"
                onClick={() => checkoutViaWhatsApp(notes)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.199.534 1.286.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.173.449.741.964 1.2 1.348 1.199 1.637 1.189 1.839 1.074.202-.116.433-.405.621-.665.188-.26.376-.217.621-.13.245.087 1.56.736 1.82 1.098.26.362.26.694.116 1.099z" />
                </svg>
                <span>PEDIR ASISTENCIA & PAGO POR WHATSAPP</span>
              </button>

              {/* Botón de pago en línea detallado */}
              <button
                className="btn-gold cart-btn-checkout"
                onClick={handleProceedToCheckout}
              >
                <span>PROCEDER AL PAGO CON TARJETA / PSE</span>
              </button>
            </div>

            <p className="cart-security-badge">
              <LuxuryLockIcon size={13} color="var(--color-gold)" />
              <span>Transacción 100% cifrada con garantía de autenticidad vitalicia</span>
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
