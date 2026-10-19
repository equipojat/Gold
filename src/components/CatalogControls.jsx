import React from 'react';
import { CATEGORIES, PRICE_RANGES } from '../data/products';
import './CatalogControls.css';

export const CatalogControls = ({
  activeCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  counts,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults
}) => {
  return (
    <div className="catalog-controls-container">
      {/* Fila 1: Filtros de Categorías */}
      <div className="category-pill-group">
        {CATEGORIES.map(cat => {
          const count = counts[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="pill-name">{cat.label}</span>
              <span className="pill-count">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Fila 2: Filtros de Rango de Inversión / Precio */}
      <div className="price-pill-row">
        <span className="price-filter-label">Rango de Inversión:</span>
        <div className="price-pill-group">
          {PRICE_RANGES.map(range => {
            const isActive = (selectedPriceRange || 'all') === range.id;
            return (
              <button
                key={range.id}
                className={`price-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectPriceRange(range.id)}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fila 3: Barra de herramientas (Buscador y Ordenación) */}
      <div className="catalog-toolbar">
        {/* Buscador minimalista */}
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="catalog-search-input"
            placeholder="Buscar por nombre, zafiro, perla o dije..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Indicador de resultados y Ordenador */}
        <div className="toolbar-right-group">
          <span className="results-counter">
            Mostrando <strong>{totalResults}</strong> {totalResults === 1 ? 'joya' : 'joyas'}
          </span>

          <div className="sort-dropdown-wrapper">
            <label htmlFor="sort-select" className="sort-label">Ordenar:</label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="featured">Novedades & Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
