import React from 'react';
import { GuidingStar, LuxuryShieldIcon, LuxuryLockIcon } from './MarineIllustrations';
import './InfoModals.css';

export const InfoModals = ({ modalType, onClose }) => {
  if (!modalType) return null;

  return (
    <div className="info-modal-backdrop" onClick={onClose}>
      <div
        className="info-modal-container animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="info-modal-close-btn" onClick={onClose} aria-label="Cerrar ventana">
          ✕
        </button>

        {modalType === 'shipping' && (
          <div className="info-modal-body">
            <div className="info-modal-badge">
              <LuxuryShieldIcon size={18} color="var(--color-gold)" />
              <span>LOGÍSTICA DE ALTA SEGURIDAD</span>
            </div>
            <h2>Envíos Blindados & Cobertura Nacional</h2>
            <p className="info-modal-subtitle">
              Garantizamos que cada pieza de oro 18K llegue intacta y segura a tus manos en cualquier rincón de Colombia.
            </p>

            <div className="info-cards-grid">
              <div className="info-feature-card">
                <div className="feature-icon">🛡</div>
                <h4>Póliza de Seguro Privado 100%</h4>
                <p>
                  Cada despacho viaja con póliza de seguro comercial contra pérdida, siniestro o extravío, asumida 100% como cortesía por Marea Viva.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">📦</div>
                <h4>Empaque Exterior Discreto</h4>
                <p>
                  Por motivos de seguridad, la caja exterior no lleva inscripciones de "Oro", "Joyas" ni logos ostentosos. El estuche de lujo de lino crudo va protegido en el interior.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">⏱</div>
                <h4>Tiempos de Entrega Certificados</h4>
                <p>
                  <strong>Bogotá D.C.:</strong> 24 a 48 horas hábiles.<br />
                  <strong>Ciudades Principales:</strong> 48 a 72 horas hábiles.<br />
                  <strong>Municipios Especiales:</strong> 3 a 5 días hábiles.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">✍</div>
                <h4>Entrega Personalizada con Firma</h4>
                <p>
                  La transportadora solo entrega en mano a la persona titular registrada con presentación de documento de identidad y firma de recibido.
                </p>
              </div>
            </div>

            <div className="info-modal-cta">
              <a
                href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20deseo%20consultar%20cobertura%20de%20envio%20para%20mi%20ciudad."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <span>CONSULTAR COBERTURA CON UN ASESOR</span>
              </a>
            </div>
          </div>
        )}

        {modalType === 'authenticity' && (
          <div className="info-modal-body">
            <div className="info-modal-badge">
              <GuidingStar size={16} />
              <span>CERTIFICACIÓN DE ORFEBRERÍA LEY 750</span>
            </div>
            <h2>Certificado de Autenticidad & Garantía Vitalicia</h2>
            <p className="info-modal-subtitle">
              Cada joya Marea Viva es forjada exclusivamente en Oro Sólido de 18 Kilates, auditado con los más altos estándares gemológicos.
            </p>

            <div className="info-cards-grid">
              <div className="info-feature-card">
                <div className="feature-icon">✦</div>
                <h4>Oro Sólido Macizo (Ley 750)</h4>
                <p>
                  No trabajamos baños, chapas ni laminados. Nuestras piezas son 75% oro puro y 25% aleaciones nobles que garantizan durabilidad infinita y resistencia al agua.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">📜</div>
                <h4>Certificado Físico Numerado</h4>
                <p>
                  Cada pedido incluye un certificado gemológico en papel de lino con el número de serie de la pieza, peso exacto en gramos, kilataje y firma de orfebrería.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">♾</div>
                <h4>Garantía Vitalicia en el Metal</h4>
                <p>
                  Garantizamos de por vida que el metal jamás cambiará de color, no perderá su pureza y conservará su valor patrimonial para siempre.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">💎</div>
                <h4>Gemas Naturales Éticas</h4>
                <p>
                  Nuestros diamantes, perlas barrocas y zafiros provienen de fuentes certificadas libres de conflicto, seleccionados a mano por su lustre y brillo.
                </p>
              </div>
            </div>

            <div className="info-modal-cta">
              <button className="btn-gold" onClick={onClose}>
                <span>ENTENDIDO, VOLVER A LA COLECCIÓN</span>
              </button>
            </div>
          </div>
        )}

        {modalType === 'care' && (
          <div className="info-modal-body">
            <div className="info-modal-badge">
              <GuidingStar size={16} />
              <span>MANTENIMIENTO DEL ATELIER</span>
            </div>
            <h2>Guía de Cuidado del Oro 18K</h2>
            <p className="info-modal-subtitle">
              El oro de 18 kilates es inalterable frente al tiempo y al agua. Sigue estos sencillos consejos para mantener su fulgor radiante.
            </p>

            <div className="info-cards-grid">
              <div className="info-feature-card">
                <div className="feature-icon">💧</div>
                <h4>Uso Diario & Agua</h4>
                <p>
                  Puedes bañarte, nadar en el mar o en piscina con tus joyas de oro 18K; el metal no se oxida ni se decolora. Recomendamos enjuagar con agua dulce tras el mar.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">🫧</div>
                <h4>Limpieza Casera Segura</h4>
                <p>
                  Sumerge tu joya en agua tibia con un par de gotas de jabón neutro durante 10 minutos. Frota suavemente con un cepillo de cerdas ultrasuaves y seca con paño de lino.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">⚠️</div>
                <h4>Sustancias a Evitar</h4>
                <p>
                  Evita el contacto directo con químicos abrasivos como cloro puro o mercurio, ya que pueden alterar temporalmente el brillo de la aleación.
                </p>
              </div>

              <div className="info-feature-card">
                <div className="feature-icon">✨</div>
                <h4>Pulido de Cortesía en Taller</h4>
                <p>
                  Todos nuestros clientes cuentan con servicio de limpieza ultrasónica y mantenimiento preventivo gratuito una vez al año en nuestro atelier.
                </p>
              </div>
            </div>

            <div className="info-modal-cta">
              <button className="btn-gold" onClick={onClose}>
                <span>CONSERVAR MI JOYA PERFECTA</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
