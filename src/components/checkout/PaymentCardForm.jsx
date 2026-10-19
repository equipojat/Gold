import React, { useState } from 'react';

export const PaymentCardForm = ({ cardData, onChange }) => {
  const [focusedField, setFocusedField] = useState('');

  // Formatear número de tarjeta en grupos de 4
  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    onChange('cardNumber', formatted);
  };

  // Formatear fecha MM / AA
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    onChange('expiryDate', val);
  };

  // Formatear CVC (3 o 4 dígitos)
  const handleCvcChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    onChange('cvc', val);
  };

  // Detección automática de franquicia
  const getCardBrand = () => {
    const raw = cardData.cardNumber.replace(/\s/g, '');
    if (raw.startsWith('4')) return 'VISA';
    if (/^(5[1-5]|2[2-7])/.test(raw)) return 'MASTERCARD';
    if (/^3[47]/.test(raw)) return 'AMEX';
    return 'TARJETA BANCARIA';
  };

  return (
    <div className="payment-card-form-wrapper">
      {/* Vista previa visual de tarjeta dorada de lujo */}
      <div className={`luxury-card-preview ${getCardBrand().toLowerCase()}`}>
        <div className="card-chip-row">
          <div className="card-emv-chip"></div>
          <span className="card-brand-badge">{getCardBrand()}</span>
        </div>
        <div className="card-number-display">
          {cardData.cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="card-meta-row">
          <div className="card-holder-display">
            <span className="card-label">TITULAR</span>
            <span className="card-value">{cardData.cardName || 'NOMBRE Y APELLIDO'}</span>
          </div>
          <div className="card-expiry-display">
            <span className="card-label">VENCE</span>
            <span className="card-value">{cardData.expiryDate || 'MM/AA'}</span>
          </div>
        </div>
      </div>

      {/* Formulario de campos */}
      <div className="card-inputs-grid">
        <div className="checkout-field-group full-width">
          <label htmlFor="card-number" className="field-label">
            Número de Tarjeta
          </label>
          <div className="input-with-icon">
            <input
              id="card-number"
              type="text"
              className="checkout-input"
              placeholder="4500 0000 0000 0000"
              value={cardData.cardNumber}
              onChange={handleCardNumberChange}
              onFocus={() => setFocusedField('number')}
              maxLength={19}
              required
            />
            <span className="input-addon-brand">{getCardBrand()}</span>
          </div>
        </div>

        <div className="checkout-field-group full-width">
          <label htmlFor="card-name" className="field-label">
            Nombre del Titular (como figura en la tarjeta)
          </label>
          <input
            id="card-name"
            type="text"
            className="checkout-input uppercase"
            placeholder="MARÍA FERNANDA SÁNCHEZ"
            value={cardData.cardName}
            onChange={(e) => onChange('cardName', e.target.value.toUpperCase())}
            onFocus={() => setFocusedField('name')}
            required
          />
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="card-expiry" className="field-label">
            Fecha de Expiración
          </label>
          <input
            id="card-expiry"
            type="text"
            className="checkout-input"
            placeholder="MM/AA"
            value={cardData.expiryDate}
            onChange={handleExpiryChange}
            onFocus={() => setFocusedField('expiry')}
            maxLength={5}
            required
          />
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="card-cvc" className="field-label">
            CVC / CVV
          </label>
          <input
            id="card-cvc"
            type="password"
            className="checkout-input"
            placeholder="123"
            value={cardData.cvc}
            onChange={handleCvcChange}
            onFocus={() => setFocusedField('cvc')}
            maxLength={4}
            required
          />
        </div>

        <div className="checkout-field-group full-width">
          <label htmlFor="card-installments" className="field-label">
            Cuotas de Financiación
          </label>
          <select
            id="card-installments"
            className="checkout-select"
            value={cardData.installments}
            onChange={(e) => onChange('installments', e.target.value)}
          >
            <option value="1">1 cuota (Sin recargo)</option>
            <option value="3">3 cuotas</option>
            <option value="6">6 cuotas</option>
            <option value="12">12 cuotas (Tasa especial de joyería)</option>
            <option value="24">24 cuotas</option>
          </select>
        </div>
      </div>
    </div>
  );
};
