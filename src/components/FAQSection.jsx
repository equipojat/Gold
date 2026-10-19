import React, { useState } from 'react';
import { GuidingStar } from './MarineIllustrations';
import './FAQSection.css';

const FAQS = [
  {
    q: '¿El oro utilizado es macizo o es baño / enchapado de oro?',
    a: 'En Marea Viva forjamos exclusivamente en Oro Sólido Macizo de 18 Kilates (Ley 750). No comercializamos baños, laminados ni enchapes. Tus piezas jamás perderán su color dorado característico, no se pelarán y conservarán su valor patrimonial para siempre.'
  },
  {
    q: '¿Cómo garantizan que la joya llegue segura a mi destino en Colombia?',
    a: 'Cada pieza viaja amparada bajo una póliza de seguro privado comercial 100% contra pérdida, robo o siniestro (asumida por nosotros). Para proteger tu privacidad e integridad, el paquete exterior es 100% neutro y discreto, sin logotipos ni leyendas que sugieran contenido de valor.'
  },
  {
    q: '¿Qué ocurre si la longitud o medida de la cadena o manilla no me queda bien?',
    a: 'Todas nuestras cadenas y manillas incluyen eslabones de extensión para adaptarse con holgura. Si aun así requieres una longitud especial, nuestro taller orfebre realiza el primer ajuste de medida de cortesía sin costo de mano de obra.'
  },
  {
    q: '¿Cómo puedo pagar si mi banco tiene un tope diario en PSE?',
    a: 'Muchos bancos en Colombia imponen topes de $1.5M a $2.0M en transferencias virtuales nuevas. Para tu comodidad, puedes elegir "Transferencia con Asesor" en el menú de pago para transferir en dos partes o inscribir nuestra cuenta empresarial oficial Bancolombia directamente en tu app bancaria.'
  },
  {
    q: '¿Las joyas pueden usarse a diario y en el mar o piscina?',
    a: 'El Oro 18K es un metal noble e inerte que no se oxida, no produce alergias y no sufre deterioro con el agua dulce o salada. Puedes lucir tus piezas a diario con total tranquilidad en el mar, la ducha o la piscina.'
  },
  {
    q: '¿Qué incluye la presentación física de cada joya?',
    a: 'Cada pedido se entrega en un estuche rígido forrado en lino crudo natural con grabado dorado, acompañado del Certificado Gemológico Oficial de Autenticidad Ley 750 numerado a tu nombre y un paño de microfibra de orfebrería para conservar su brillo.'
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-badge">
            <GuidingStar size={14} />
            <span>TRANSPARENCIA & CONFIANZA</span>
          </div>
          <h2 className="faq-title">Preguntas Frecuentes del Atelier</h2>
          <p className="faq-subtitle">
            Resolvemos las inquietudes más comunes sobre la orfebrería en oro 18K, la logística blindada y las garantías de por vida.
          </p>
        </div>

        <div className="faq-accordion">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFAQ(idx)}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer animate-fade-in">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-bottom-banner">
          <div>
            <h4>¿Tienes una consulta específica o un pedido a la medida?</h4>
            <p>Un asesor del atelier está disponible para responderte en vivo por WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/573001234567?text=Hola%20Marea%20Viva,%20tengo%20una%20pregunta%20antes%20de%20comprar%20una%20joya."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <span>HABLAR CON UN ASESOR</span>
          </a>
        </div>
      </div>
    </section>
  );
};
