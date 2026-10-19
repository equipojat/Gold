import React from 'react';

// Ilustración de Tortuga Marina (esquina superior izquierda de la lámina)
// Trazo fino estilo grabado botánico/marino
export const SeaTurtleOrnament = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 180 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ ...style }}
  >
    {/* Caparazón elíptico con placas anatómicas finas */}
    <ellipse cx="90" cy="65" rx="55" ry="38" stroke="#102B45" strokeWidth="0.8" opacity="0.6" />
    <path
      d="M50 65 Q90 40 130 65 M55 52 Q90 32 125 52 M55 78 Q90 98 125 78"
      stroke="#102B45"
      strokeWidth="0.6"
      opacity="0.45"
    />
    <path
      d="M70 36 L70 94 M90 28 L90 102 M110 36 L110 94"
      stroke="#102B45"
      strokeWidth="0.5"
      strokeDasharray="1.5 1.5"
      opacity="0.4"
    />
    {/* Cabeza de la tortuga */}
    <path
      d="M142 56 C155 52 165 58 165 65 C165 72 155 78 142 74"
      stroke="#102B45"
      strokeWidth="0.75"
      opacity="0.55"
    />
    {/* Aleta delantera superior */}
    <path
      d="M120 35 C135 15 150 10 162 18 C155 28 135 42 122 42"
      stroke="#102B45"
      strokeWidth="0.75"
      opacity="0.55"
    />
    {/* Aleta delantera inferior */}
    <path
      d="M120 95 C135 115 150 120 162 112 C155 102 135 88 122 88"
      stroke="#102B45"
      strokeWidth="0.75"
      opacity="0.55"
    />
    {/* Aletas traseras */}
    <path
      d="M52 45 C40 32 30 35 28 42 C32 48 44 55 48 55"
      stroke="#102B45"
      strokeWidth="0.7"
      opacity="0.5"
    />
    <path
      d="M52 85 C40 98 30 95 28 88 C32 82 44 75 48 75"
      stroke="#102B45"
      strokeWidth="0.7"
      opacity="0.5"
    />
    {/* Acentos dorados etéreos */}
    <path
      d="M90 45 Q105 65 90 85"
      stroke="#C9A24A"
      strokeWidth="0.75"
      opacity="0.65"
    />
  </svg>
);

// Ilustración de Corales Marinos (esquina inferior izquierda)
export const CoralOrnament = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 160 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ ...style }}
  >
    {/* Rama central orgánica */}
    <path
      d="M30 175 Q45 130 38 90 Q32 55 52 30 Q60 18 68 25 Q70 45 58 75 Q65 50 82 35 Q92 25 96 35 Q90 55 78 85 Q92 70 108 58 Q118 50 120 62 Q112 80 88 105 Q98 125 105 155 Q110 170 115 178"
      stroke="#102B45"
      strokeWidth="0.8"
      opacity="0.55"
    />
    {/* Sub-ramificaciones delicadas */}
    <path
      d="M45 110 Q25 95 22 75 Q20 60 28 65 Q35 72 40 90"
      stroke="#102B45"
      strokeWidth="0.65"
      opacity="0.45"
    />
    <path
      d="M72 95 Q90 90 102 78 Q110 70 114 78 Q110 90 88 112"
      stroke="#102B45"
      strokeWidth="0.65"
      opacity="0.45"
    />
    {/* Pólipos y textura de arrecife */}
    <circle cx="52" cy="30" r="1.5" fill="#C9A24A" opacity="0.6" />
    <circle cx="82" cy="35" r="1.5" fill="#C9A24A" opacity="0.6" />
    <circle cx="108" cy="58" r="1.5" fill="#C9A24A" opacity="0.6" />
    <circle cx="28" cy="65" r="1.2" fill="#C9A24A" opacity="0.5" />
    {/* Base de arrecife en estrías */}
    <path
      d="M15 178 Q50 168 85 172 Q120 176 145 178"
      stroke="#102B45"
      strokeWidth="0.75"
      opacity="0.4"
    />
  </svg>
);

// Ilustración de Ballena / Fauna Marina (esquina inferior derecha)
export const WhaleOrnament = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 200 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ ...style }}
  >
    {/* Silueta grácil de ballena nadando en perspectiva */}
    <path
      d="M15 80 Q60 78 110 50 Q150 25 185 20 Q175 32 145 52 Q105 76 55 88 Q30 92 15 80 Z"
      stroke="#102B45"
      strokeWidth="0.85"
      opacity="0.55"
    />
    {/* Aleta caudal bífida */}
    <path
      d="M185 20 Q194 10 198 8 Q194 18 188 24 Q196 28 198 36 Q190 30 185 20"
      stroke="#102B45"
      strokeWidth="0.75"
      opacity="0.55"
    />
    {/* Pliegues ventrales sutiles */}
    <path
      d="M40 82 Q85 70 130 48 M55 85 Q98 74 140 54 M70 87 Q110 78 148 60"
      stroke="#102B45"
      strokeWidth="0.55"
      strokeDasharray="2 2"
      opacity="0.4"
    />
    {/* Aleta pectoral */}
    <path
      d="M95 62 Q90 85 80 95 Q82 82 92 68"
      stroke="#C9A24A"
      strokeWidth="0.75"
      opacity="0.65"
    />
  </svg>
);

// Estrella Guía / Constelación
export const GuidingStar = ({ size = 20, color = "#C9A24A", className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 0 Q12 12 24 12 Q12 12 12 24 Q12 12 0 12 Q12 12 12 0 Z"
      fill={color}
    />
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

// Candado de Lujo / Sello de Seguridad Blindada (Líneas finas orfebres)
export const LuxuryLockIcon = ({ size = 16, color = "currentColor", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    {/* Arco del candado / Shackle orfebre */}
    <path
      d="M7 10.5V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V10.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cuerpo del candado biselado */}
    <rect
      x="4.5"
      y="10"
      width="15"
      height="12"
      rx="2.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Ojo de cerradura con punto de diamante / orfebrería */}
    <circle cx="12" cy="15" r="1.4" fill={color} />
    <path
      d="M12 16.4V18.6"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);

// Escudo de Transporte Blindado y Seguro
export const LuxuryShieldIcon = ({ size = 16, color = "currentColor", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path
      d="M12 2.5L4.5 5.8V11.5C4.5 16.4 7.7 20.6 12 21.8C16.3 20.6 19.5 16.4 19.5 11.5V5.8L12 2.5Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8.8 12L10.9 14.1L15.2 9.8"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Tarjeta Bancaria de Lujo
export const LuxuryCardIcon = ({ size = 18, color = "currentColor", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <rect x="2.5" y="5.5" width="19" height="13" rx="2" stroke={color} strokeWidth="1.5" />
    <path d="M2.5 10H21.5" stroke={color} strokeWidth="1.5" />
    <circle cx="6.5" cy="14.5" r="1" fill={color} />
    <circle cx="10" cy="14.5" r="1" fill={color} />
  </svg>
);

// Banco / PSE Clásico
export const LuxuryBankIcon = ({ size = 18, color = "currentColor", className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path d="M3 21H21M3 10H21M12 3L2 8V10H22V8L12 3Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    <path d="M6 10V18M10 10V18M14 10V18M18 10V18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// Corazón de Deseos / Favoritos
export const LuxuryHeartIcon = ({ size = 18, color = "currentColor", filled = false, className = "", style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : "none"}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke={color}
      strokeWidth={filled ? "0" : "1.5"}
      strokeLinejoin="round"
    />
  </svg>
);


