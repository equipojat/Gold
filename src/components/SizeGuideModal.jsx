import React, { useState } from 'react';
import { GuidingStar } from './MarineIllustrations';
import './SizeGuideModal.css';

export const SizeGuideModal = ({ isOpen, onClose, initialCategory = 'cadenas' }) => {
  const [activeTab, setActiveTab] = useState(
    initialCategory === 'manillas' ? 'manillas' : 'cadenas'
  );

  if (!isOpen) return null;

  return (
    <div className="size-guide-backdrop" onClick={onClose}>
      <div
        className="size-guide-modal animate-fade-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="size-guide-close-btn" onClick={onClose} aria-label="Cerrar guía de medidas">
          ✕
        </button>

        <div className="size-guide-header">
          <div className="size-guide-brand">
            <GuidingStar size={16} />
            <span>MAREA VIVA ATELIER</span>
          </div>
          <h2>Guía de Medidas & Proporciones</h2>
          <p>
            Encuentra la longitud idónea para tus piezas en Oro 18K. Cada pieza incluye anillas de ajuste para confort absoluto.
          </p>
        </div>

        {/* Pestañas de categoría */}
        <div className="size-guide-tabs">
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'cadenas' ? 'active' : ''}`}
            onClick={() => setActiveTab('cadenas')}
          >
            <span>CADENAS & COLLARES</span>
          </button>
          <button
            type="button"
            className={`guide-tab-btn ${activeTab === 'manillas' ? 'active' : ''}`}
            onClick={() => setActiveTab('manillas')}
          >
            <span>MANILLAS & PULSERAS</span>
          </button>
        </div>

        <div className="size-guide-content">
          {activeTab === 'cadenas' ? (
            <div className="cadenas-guide animate-fade-in">
              {/* Ilustración esquemática de caídas en el pecho */}
              <div className="neckline-visual-card">
                <svg viewBox="0 0 320 220" className="neckline-svg" fill="none">
                  {/* Silueta de cuello y torso estilizada en trazo fino */}
                  <path
                    d="M120 20 Q120 70 80 100 L40 140 L40 210 M200 20 Q200 70 240 100 L280 140 L280 210"
                    stroke="#102B45"
                    strokeWidth="1.2"
                    strokeDasharray="2 3"
                    opacity="0.35"
                  />
                  <path
                    d="M110 20 Q160 50 210 20"
                    stroke="#102B45"
                    strokeWidth="1.2"
                    opacity="0.4"
                  />

                  {/* Línea 40 cm - Gargantilla */}
                  <path d="M120 35 Q160 70 200 35" stroke="#C9A24A" strokeWidth="1.6" />
                  <circle cx="160" cy="53" r="2.5" fill="#C9A24A" />
                  <text x="215" y="56" fill="#102B45" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
                    40 CM • Gargantilla
                  </text>

                  {/* Línea 45 cm - Estándar Clásico */}
                  <path d="M115 35 Q160 105 205 35" stroke="#C9A24A" strokeWidth="2" />
                  <circle cx="160" cy="70" r="3.5" fill="#102B45" stroke="#C9A24A" strokeWidth="1" />
                  <text x="220" y="85" fill="#102B45" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">
                    45 CM • Estándar Clásico
                  </text>

                  {/* Línea 50 cm - Escote Medio */}
                  <path d="M110 35 Q160 140 210 35" stroke="#C9A24A" strokeWidth="1.6" />
                  <circle cx="160" cy="88" r="4.5" fill="#C9A24A" />
                  <text x="220" y="118" fill="#102B45" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
                    50 CM • Escote Medio
                  </text>

                  {/* Línea 60 cm - Largo / Suéter */}
                  <path d="M105 35 Q160 185 215 35" stroke="#C9A24A" strokeWidth="1.6" strokeDasharray="3 3" />
                  <circle cx="160" cy="110" r="4" fill="#C9A24A" />
                  <text x="220" y="152" fill="#102B45" fontSize="10" fontFamily="sans-serif" letterSpacing="1">
                    60 CM • Largo & Dijes
                  </text>
                </svg>
              </div>

              <div className="guide-table-wrapper">
                <table className="guide-specs-table">
                  <thead>
                    <tr>
                      <th>Longitud</th>
                      <th>Caída Natural</th>
                      <th>Recomendación Atelier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>40 cm</strong></td>
                      <td>Base del cuello</td>
                      <td>Gargantilla estilizada, ideal para blusas abiertas o cuellos redondos.</td>
                    </tr>
                    <tr>
                      <td><strong className="highlight">45 cm (Favorita)</strong></td>
                      <td>Clavícula</td>
                      <td>Nuestra medida más vendida. Proporción perfecta para el día a día y medallones.</td>
                    </tr>
                    <tr>
                      <td><strong>50 cm</strong></td>
                      <td>Escote medio</td>
                      <td>Luce espectacular con dijes pesados (tótem tortuga) y camisas con botones.</td>
                    </tr>
                    <tr>
                      <td><strong>60 cm</strong></td>
                      <td>Sobre el pecho</td>
                      <td>Ideal para crear capas (layering) o llevar sobre suéteres de lino y cuello tortuga.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="manillas-guide animate-fade-in">
              <div className="wrist-steps-grid">
                <div className="wrist-step-card">
                  <span className="step-num">01</span>
                  <h4>Mide con un hilo</h4>
                  <p>Rodea tu muñeca justo detrás del hueso con una cinta métrica flexible o una tira de papel/hilo sin apretar.</p>
                </div>
                <div className="wrist-step-card">
                  <span className="step-num">02</span>
                  <h4>Compara en regla</h4>
                  <p>Estira el hilo sobre una regla milimétrica para obtener la medida exacta de tu muñeca en centímetros.</p>
                </div>
                <div className="wrist-step-card">
                  <span className="step-num">03</span>
                  <h4>Añade holgura</h4>
                  <p>Suma <strong>+1.5 cm</strong> a la medida para un calce cómodo estándar, o <strong>+2 cm</strong> si te gustan holgadas.</p>
                </div>
              </div>

              <div className="guide-table-wrapper">
                <table className="guide-specs-table">
                  <thead>
                    <tr>
                      <th>Talla</th>
                      <th>Muñeca en cm</th>
                      <th>Largo de Manilla en Oro 18K</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Petite (S)</strong></td>
                      <td>14 – 15.5 cm</td>
                      <td>16 cm + extensión de 2 cm</td>
                    </tr>
                    <tr>
                      <td><strong className="highlight">Estándar (M)</strong></td>
                      <td>16 – 17.5 cm</td>
                      <td>17 cm + extensión de 2 cm (Calce perfecto para la mayoría)</td>
                    </tr>
                    <tr>
                      <td><strong>Amplia (L)</strong></td>
                      <td>18 – 19.5 cm</td>
                      <td>19 cm + extensión de 2 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="size-guide-footer-note">
            <p>
              ✦ ¿Requieres una medida especial fuera de tabla? Nuestros maestros orfebres ajustan el largo de tu joya en el taller sin costo adicional antes del envío.
            </p>
            <a
              href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20tengo%20una%20duda%20sobre%20la%20talla/longitud%20de%20una%20joya."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold guide-wa-link"
            >
              <span>CONSULTAR CON UN ASESOR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
