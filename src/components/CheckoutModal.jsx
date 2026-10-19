import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PaymentCardForm } from './checkout/PaymentCardForm';
import { PaymentPSEForm } from './checkout/PaymentPSEForm';
import { PaymentConciergeForm } from './checkout/PaymentConciergeForm';
import { GuidingStar, LuxuryLockIcon, LuxuryShieldIcon, LuxuryCardIcon, LuxuryBankIcon } from './MarineIllustrations';
import './CheckoutModal.css';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cartItems,
    totalFormatted,
    processOrder,
    completedOrder
  } = useCart();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Datos del Cliente y Envío
  const [customerData, setCustomerData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    city: 'Bogotá D.C.',
    department: 'Cundinamarca',
    deliveryNotes: ''
  });

  // Método de pago seleccionado
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'pse' | 'concierge'

  // Datos de Tarjeta
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
    installments: '1'
  });

  // Datos de PSE
  const [pseData, setPseData] = useState({
    bank: '',
    personType: 'natural',
    docType: 'CC',
    docNumber: '',
    pseEmail: ''
  });

  if (!isCheckoutOpen) return null;

  const handleCustomerChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field, value) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handlePseChange = (field, value) => {
    setPseData(prev => ({ ...prev, [field]: value }));
  };

  // Validación y ejecución directa en 1 solo paso unificado
  const handleSubmitUnifiedCheckout = (e) => {
    e.preventDefault();

    // 1. Validar datos de envío
    if (!customerData.fullName.trim() || !customerData.email.trim() || !customerData.phone.trim() || !customerData.address.trim()) {
      alert('Por favor completa todos los campos de entrega requeridos para emitir la póliza asegurada.');
      return;
    }

    // 2. Validar método de pago
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber.trim() || !cardData.cardName.trim() || !cardData.expiryDate.trim() || !cardData.cvc.trim()) {
        alert('Por favor ingresa todos los datos requeridos de tu tarjeta.');
        return;
      }
    } else if (paymentMethod === 'pse') {
      if (!pseData.bank || !pseData.docNumber.trim() || !pseData.pseEmail.trim()) {
        alert('Por favor selecciona tu entidad bancaria e ingresa tu documento y correo PSE.');
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const paymentSummary = {
        method: paymentMethod,
        details: paymentMethod === 'card' 
          ? `Tarjeta que termina en ${cardData.cardNumber.slice(-4)} (${cardData.installments} cuota/s)`
          : paymentMethod === 'pse'
          ? `Débito PSE desde ${pseData.bank}`
          : 'Transferencia Bancaria a Cuenta Empresarial Marea Viva'
      };

      processOrder(customerData, paymentSummary);
      setIsCompleted(true);
    }, 1800);
  };

  const handleClose = () => {
    setIsCompleted(false);
    closeCheckout();
  };

  // Ítems y total a mostrar
  const displayItems = completedOrder ? completedOrder.items : cartItems;
  const displayTotal = completedOrder ? completedOrder.totalFormatted : totalFormatted;

  return (
    <div className="checkout-backdrop" onClick={isCompleted ? handleClose : undefined}>
      <div
        className="checkout-modal-container single-column animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera del Checkout */}
        <div className="checkout-modal-header">
          <div className="checkout-header-branding">
            <img src="/images/logo-isotipo.png" alt="Marea Viva" className="checkout-logo-icon" />
            <div>
              <span className="checkout-header-title">MAREA VIVA ATELIER</span>
              <span className="checkout-header-subtitle">PASARELA DE PAGO BLINDADA • ORO 18K</span>
            </div>
          </div>

          <div className="checkout-security-indicator">
            <LuxuryLockIcon size={13} color="#27ae60" />
            <span>Cifrado Bancario 256-bit</span>
          </div>

          <button
            className="checkout-close-btn"
            onClick={handleClose}
            aria-label="Cerrar pasarela de pago"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo del Checkout Unificado en 1 Sola Vista */}
        <div className="checkout-single-flow">
          {!isCompleted ? (
            <form onSubmit={handleSubmitUnifiedCheckout} className="checkout-unified-form animate-fade-in">
              {/* BLOQUE A: Resumen Integrado de la Selección */}
              <div className="checkout-integrated-summary">
                <div className="integrated-summary-header">
                  <div className="summary-title-group">
                    <GuidingStar size={14} />
                    <span className="summary-label">RESUMEN DE TU ORDEN</span>
                  </div>
                  <div className="summary-grand-total">
                    <span className="total-label">Total a Pagar:</span>
                    <strong className="total-amount">{displayTotal}</strong>
                  </div>
                </div>

                {/* Lista compacta de joyas seleccionadas */}
                <div className="integrated-items-row">
                  {displayItems.map((item, idx) => (
                    <div key={idx} className="integrated-item-chip">
                      <img src={item.product.image} alt={item.product.name} className="item-chip-thumb" />
                      <div className="item-chip-details">
                        <span className="item-chip-name">{item.product.name}</span>
                        <span className="item-chip-meta">Oro 18K • Cant: {item.quantity} • {item.product.formattedPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="integrated-shipping-perk">
                  <LuxuryShieldIcon size={14} color="#27ae60" />
                  <span>Transporte blindado nacional con póliza de seguro de cortesía ($0)</span>
                </div>
              </div>

              {/* BLOQUE B: Datos de Entrega Asegurada */}
              <div className="checkout-section-block">
                <div className="section-block-header">
                  <span className="section-block-num">01</span>
                  <div>
                    <h3 className="section-block-title">Datos del Titular & Entrega Blindada</h3>
                    <p className="section-block-desc">
                      Datos requeridos para emitir tu póliza de seguro y el certificado de orfebrería Ley 750.
                    </p>
                  </div>
                </div>

                <div className="checkout-form-grid">
                  <div className="checkout-field-group full-width">
                    <label htmlFor="full-name" className="field-label">Nombre Completo *</label>
                    <input
                      id="full-name"
                      type="text"
                      className="checkout-input"
                      placeholder="Ej. Carolina Montoya Restrepo"
                      value={customerData.fullName}
                      onChange={(e) => handleCustomerChange('fullName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group half-width">
                    <label htmlFor="customer-email" className="field-label">Correo Electrónico *</label>
                    <input
                      id="customer-email"
                      type="email"
                      className="checkout-input"
                      placeholder="carolina@ejemplo.com"
                      value={customerData.email}
                      onChange={(e) => handleCustomerChange('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group half-width">
                    <label htmlFor="customer-phone" className="field-label">Teléfono Móvil (WhatsApp) *</label>
                    <input
                      id="customer-phone"
                      type="tel"
                      className="checkout-input"
                      placeholder="+57 300 123 4567"
                      value={customerData.phone}
                      onChange={(e) => handleCustomerChange('phone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group half-width">
                    <label htmlFor="customer-id" className="field-label">Documento de Identidad (Cédula/Pasaporte) *</label>
                    <input
                      id="customer-id"
                      type="text"
                      className="checkout-input"
                      placeholder="1020304050"
                      value={customerData.idNumber}
                      onChange={(e) => handleCustomerChange('idNumber', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group half-width">
                    <label htmlFor="customer-city" className="field-label">Ciudad de Entrega *</label>
                    <input
                      id="customer-city"
                      type="text"
                      className="checkout-input"
                      placeholder="Bogotá, Medellín, Cali, etc."
                      value={customerData.city}
                      onChange={(e) => handleCustomerChange('city', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group full-width">
                    <label htmlFor="customer-address" className="field-label">Dirección Completa de Entrega *</label>
                    <input
                      id="customer-address"
                      type="text"
                      className="checkout-input"
                      placeholder="Carrera 11 # 85-32, Apto 502"
                      value={customerData.address}
                      onChange={(e) => handleCustomerChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="checkout-field-group full-width">
                    <label htmlFor="delivery-notes" className="field-label">Instrucciones Especiales de Entrega o Seguridad</label>
                    <textarea
                      id="delivery-notes"
                      className="checkout-input"
                      rows="2"
                      placeholder="Dejar en portería con firma, empaque para obsequio discreto, etc."
                      value={customerData.deliveryNotes}
                      onChange={(e) => handleCustomerChange('deliveryNotes', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* BLOQUE C: Método de Pago */}
              <div className="checkout-section-block">
                <div className="section-block-header">
                  <span className="section-block-num">02</span>
                  <div>
                    <h3 className="section-block-title">Método de Pago Seguro</h3>
                    <p className="section-block-desc">
                      Selecciona tu forma de pago preferida para procesar la orden inmediatamente.
                    </p>
                  </div>
                </div>

                {/* Selector de pestañas */}
                <div className="payment-method-tabs">
                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <LuxuryCardIcon size={20} color={paymentMethod === 'card' ? '#FFFFFF' : '#C9A24A'} />
                    <span className="tab-label">Tarjeta Débito / Crédito</span>
                  </button>

                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentMethod === 'pse' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('pse')}
                  >
                    <LuxuryBankIcon size={20} color={paymentMethod === 'pse' ? '#FFFFFF' : '#C9A24A'} />
                    <span className="tab-label">PSE Transferencia</span>
                  </button>

                  <button
                    type="button"
                    className={`payment-tab-btn ${paymentMethod === 'concierge' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('concierge')}
                  >
                    <GuidingStar size={16} color={paymentMethod === 'concierge' ? '#FFFFFF' : '#C9A24A'} />
                    <span className="tab-label">Transferencia con Asesor</span>
                  </button>
                </div>

                {/* Campos del método seleccionado */}
                <div className="payment-method-body">
                  {paymentMethod === 'card' && (
                    <PaymentCardForm cardData={cardData} onChange={handleCardChange} />
                  )}

                  {paymentMethod === 'pse' && (
                    <PaymentPSEForm pseData={pseData} onChange={handlePseChange} />
                  )}

                  {paymentMethod === 'concierge' && (
                    <PaymentConciergeForm />
                  )}
                </div>
              </div>

              {/* Botón único de confirmación y pago */}
              <div className="checkout-final-action">
                <button type="submit" className="btn-gold btn-pay-now-full">
                  <span>PAGAR Y FINALIZAR ORDEN {displayTotal}</span>
                  <LuxuryLockIcon size={16} color="currentColor" />
                </button>
                <div className="checkout-unified-guarantees">
                  <span>✦ Oro 18K Ley 750</span>
                  <span>•</span>
                  <span className="guarantee-item-badge">
                    <LuxuryShieldIcon size={13} color="var(--color-gold)" />
                    <span>Envío Blindado Asegurado</span>
                  </span>
                  <span>•</span>
                  <span className="guarantee-item-badge">
                    <LuxuryLockIcon size={13} color="var(--color-gold)" />
                    <span>Pasarela SSL 256-Bit</span>
                  </span>
                </div>
              </div>
            </form>
          ) : (
            /* RECIBO Y CONFIRMACIÓN OFICIAL */
            completedOrder && (
              <div className="checkout-receipt-view animate-fade-in">
                <div className="receipt-success-badge">
                  <GuidingStar size={24} />
                  <h2>¡PAGO CONFIRMADO & ORDEN REGISTRADA!</h2>
                  <p className="order-id-badge">CÓDIGO DE ORDEN: <strong>{completedOrder.id}</strong></p>
                </div>

                <div className="receipt-details-box">
                  <div className="receipt-row">
                    <span>Fecha & Hora:</span>
                    <strong>{completedOrder.date}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Titular de la Joya:</span>
                    <strong>{completedOrder.customer.fullName}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Destino Asegurado:</span>
                    <strong>{completedOrder.customer.address}, {completedOrder.customer.city}</strong>
                  </div>
                  <div className="receipt-row">
                    <span>Método Procesado:</span>
                    <strong>{completedOrder.payment.details}</strong>
                  </div>
                  <div className="receipt-row total-highlight">
                    <span>Total Cancelado (Oro 18K):</span>
                    <strong className="receipt-grand-price">{completedOrder.totalFormatted}</strong>
                  </div>
                </div>

                <div className="receipt-certificate-notice">
                  <GuidingStar size={14} />
                  <span>
                    Tu pieza incluye <strong>Certificado Gemológico Oficial de Autenticidad Ley 750</strong> emitido a tu nombre y estuche de lino crudo.
                  </span>
                </div>

                <div className="receipt-actions-group">
                  <button
                    className="btn-gold"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Hola Asesor Marea Viva, he completado mi orden *${completedOrder.id}* por valor de ${completedOrder.totalFormatted} en oro 18K a nombre de ${completedOrder.customer.fullName}. Deseo hacer seguimiento a mi entrega asegurada.`
                      );
                      window.open(`https://wa.me/573001234567?text=${text}`, '_blank');
                    }}
                  >
                    <span>COORDINAR ENTREGA POR WHATSAPP</span>
                    <span>→</span>
                  </button>

                  <button
                    className="btn-outline-gold"
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <span>IMPRIMIR / GUARDAR RECIBO</span>
                  </button>

                  <button
                    className="btn-text-close"
                    onClick={handleClose}
                  >
                    Volver a la Galería
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Overlay de procesamiento simulado con animación bancaria */}
        {isProcessing && (
          <div className="checkout-processing-overlay animate-fade-in">
            <div className="processing-dialog">
              <div className="processing-spinner"></div>
              <GuidingStar size={28} />
              <h3>PROCESANDO PAGO SEGURO...</h3>
              <p>
                Comunicando con la red bancaria y emitiendo la póliza de transporte para tus piezas de oro 18K. 
                Por favor no cierres esta ventana.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
