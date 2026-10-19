import React from 'react';

const BANKS_LIST = [
  { id: 'bancolombia', name: 'Bancolombia' },
  { id: 'davivienda', name: 'Davivienda' },
  { id: 'banco-bogota', name: 'Banco de Bogotá' },
  { id: 'bbva', name: 'BBVA Colombia' },
  { id: 'banco-occidente', name: 'Banco de Occidente' },
  { id: 'scotiabank', name: 'Scotiabank Colpatria' },
  { id: 'itau', name: 'Itaú' },
  { id: 'banco-popular', name: 'Banco Popular' },
  { id: 'nequi', name: 'Nequi' },
  { id: 'daviplata', name: 'Daviplata' },
  { id: 'lulo', name: 'Lulo Bank' },
  { id: 'banco-caja-social', name: 'Banco Caja Social' }
];

export const PaymentPSEForm = ({ pseData, onChange }) => {
  return (
    <div className="payment-pse-form-wrapper">
      <div className="pse-info-banner">
        <div className="pse-logo-badge">PSE</div>
        <p className="pse-info-text">
          Transfiere directamente y en tiempo real desde tu cuenta bancaria. 
          Tu orden de joyería quedará reservada y asegurada al instante.
        </p>
      </div>

      <div className="card-inputs-grid">
        <div className="checkout-field-group full-width">
          <label htmlFor="pse-bank" className="field-label">
            Entidad Bancaria
          </label>
          <select
            id="pse-bank"
            className="checkout-select"
            value={pseData.bank}
            onChange={(e) => onChange('bank', e.target.value)}
            required
          >
            <option value="">Selecciona tu banco o billetera...</option>
            {BANKS_LIST.map(bank => (
              <option key={bank.id} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="pse-person-type" className="field-label">
            Tipo de Cliente
          </label>
          <select
            id="pse-person-type"
            className="checkout-select"
            value={pseData.personType}
            onChange={(e) => onChange('personType', e.target.value)}
          >
            <option value="natural">Persona Natural</option>
            <option value="juridica">Persona Jurídica (Empresa)</option>
          </select>
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="pse-doc-type" className="field-label">
            Tipo de Documento
          </label>
          <select
            id="pse-doc-type"
            className="checkout-select"
            value={pseData.docType}
            onChange={(e) => onChange('docType', e.target.value)}
          >
            <option value="CC">Cédula de Ciudadanía (CC)</option>
            <option value="CE">Cédula de Extranjería (CE)</option>
            <option value="NIT">NIT</option>
            <option value="PAS">Pasaporte</option>
          </select>
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="pse-doc-number" className="field-label">
            Número de Documento
          </label>
          <input
            id="pse-doc-number"
            type="text"
            className="checkout-input"
            placeholder="1020304050"
            value={pseData.docNumber}
            onChange={(e) => onChange('docNumber', e.target.value)}
            required
          />
        </div>

        <div className="checkout-field-group half-width">
          <label htmlFor="pse-email" className="field-label">
            Correo Registrado en PSE
          </label>
          <input
            id="pse-email"
            type="email"
            className="checkout-input"
            placeholder="usuario@correo.com"
            value={pseData.pseEmail}
            onChange={(e) => onChange('pseEmail', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};
