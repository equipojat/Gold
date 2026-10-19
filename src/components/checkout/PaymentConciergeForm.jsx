import React from 'react';
import { GuidingStar } from '../MarineIllustrations';

export const PaymentConciergeForm = () => {
  return (
    <div className="payment-concierge-form-wrapper">
      <div className="concierge-bank-card">
        <div className="concierge-card-header">
          <GuidingStar size={16} />
          <span>CUENTA EMPRESARIAL OFICIAL MAREA VIVA</span>
        </div>

        <div className="concierge-bank-details">
          <div className="bank-detail-item">
            <span className="detail-label">Entidad Financiera:</span>
            <span className="detail-value">Bancolombia</span>
          </div>
          <div className="bank-detail-item">
            <span className="detail-label">Tipo de Cuenta:</span>
            <span className="detail-value">Cuenta de Ahorros Empresarial</span>
          </div>
          <div className="bank-detail-item">
            <span className="detail-label">Número de Cuenta:</span>
            <span className="detail-value highlight">300-849201-92</span>
          </div>
          <div className="bank-detail-item">
            <span className="detail-label">Titular:</span>
            <span className="detail-value">MAREA VIVA JOYERÍA DE ORO S.A.S.</span>
          </div>
          <div className="bank-detail-item">
            <span className="detail-label">NIT:</span>
            <span className="detail-value">901.748.291-4</span>
          </div>
        </div>
      </div>

      <div className="concierge-instructions">
        <h4>✦ Protocolo de Entrega Exclusiva:</h4>
        <ol>
          <li>Realiza la transferencia desde la app de tu banco a nuestra cuenta oficial.</li>
          <li>Al completar el pedido, se te asignará tu código único de orden blindada.</li>
          <li>Un asesor se contactará para validar el comprobante y certificar tu joya de oro 18K.</li>
        </ol>
      </div>
    </div>
  );
};
