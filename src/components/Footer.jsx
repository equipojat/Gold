import React, { useState } from 'react';
import { GuidingStar } from './MarineIllustrations';
import './Footer.css';

export const Footer = ({ onNavigate, onOpenInfoModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNav = (view, category = 'todas') => {
    if (onNavigate) {
      onNavigate(view, category);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-site">
      <div className="container">
        {/* Newsletter Editorial */}
        <div className="footer-newsletter-card">
          <div className="newsletter-text">
            <span className="newsletter-tag">CÍRCULO PRIVADO MAREA VIVA</span>
            <h3 className="newsletter-title">Recibe invitaciones a nuevos lanzamientos</h3>
            <p className="newsletter-desc">
              Sé parte de nuestra comunidad selecta y recibe piezas en preventa exclusiva, notas sobre gemología y talismanes marinos.
            </p>
          </div>

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="btn-gold newsletter-btn">
              <span>SUSCRIBIRME</span>
            </button>
          </form>
          {subscribed && (
            <p className="newsletter-success animate-fade-in">
              ✦ Gracias por unirte a nuestra marea. Pronto recibirás noticias exclusivas.
            </p>
          )}
        </div>

        {/* Columnas principales del Footer */}
        <div className="footer-main-grid">
          {/* Columna Marca */}
          <div className="footer-col brand-col">
            <div className="footer-brand-lockup" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
              <img src="/images/logo-isotipo.png" alt="Marea Viva" className="footer-logo-img" />
              <div>
                <span className="footer-brand-title">MAREA VIVA</span>
                <span className="footer-brand-slogan">JOYAS QUE LLEVAN TU INTENCIÓN</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Piezas finas elaboradas con oro amarillo macizo de 18 kilates. Creadas como anclas de serenidad, propósito e inspiración en el océano.
            </p>
            <div
              className="footer-gold-seal clickable-seal"
              onClick={() => onOpenInfoModal && onOpenInfoModal('authenticity')}
              title="Click para ver especificaciones de Ley 750"
            >
              <GuidingStar size={14} />
              <span>Garantía Gemológica & Oro Ley 750</span>
            </div>
          </div>

          {/* Columna Colecciones */}
          <div className="footer-col">
            <h4 className="footer-col-title">COLECCIONES</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNav('catalog', 'aretes')}>
                  Aretes en Oro 18K
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'manillas')}>
                  Manillas & Pulseras
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'cadenas')}>
                  Cadenas & Medallones
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('catalog', 'todas')}>
                  Catálogo Completo 2026
                </button>
              </li>
            </ul>
          </div>

          {/* Columna Atención & Asesoría */}
          <div className="footer-col">
            <h4 className="footer-col-title">ATENCIÓN & ASESOR</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20deseo%20asesoria%20personalizada%20para%20elegir%20una%20joya."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Asesoría Personalizada WhatsApp
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenInfoModal && onOpenInfoModal('care')}
                >
                  Cuidado del Oro 18K
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenInfoModal && onOpenInfoModal('shipping')}
                >
                  Envíos Asegurados & Cobertura
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-action-link"
                  onClick={() => onOpenInfoModal && onOpenInfoModal('authenticity')}
                >
                  Certificado de Autenticidad
                </button>
              </li>
              <li>
                <a href="#preguntas-frecuentes">Preguntas Frecuentes (FAQ)</a>
              </li>
            </ul>
          </div>

          {/* Columna Ubicación y Horarios */}
          <div className="footer-col">
            <h4 className="footer-col-title">TALLER & ATELIER</h4>
            <p className="footer-atelier-text">
              Atelier privado con cita previa.<br />
              Lunes a Sábado: 10:00 a.m. - 7:00 p.m.<br />
              Envíos blindados directos a todo el país.
            </p>
            <div className="footer-contact-item">
              <span>Asesor:</span> +57 300 123 4567
            </div>
            <div className="footer-contact-item">
              <span>Email:</span> asesor@mareavivajoyas.com
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 MAREA VIVA JOYERÍA DE ORO. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="footer-bottom-badges">
            <span>COLOMBIA</span>
            <span>•</span>
            <span>ORO 18K ÉTICO</span>
            <span>•</span>
            <span>CATÁLOGO 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
