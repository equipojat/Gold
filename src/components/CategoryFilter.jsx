import React from 'react';
import { CATEGORIES } from '../data/products';
import './CategoryFilter.css';

export const CategoryFilter = ({ activeCategory, onSelectCategory, counts }) => {
  return (
    <div className="category-filter-container">
      <div className="filter-pill-group">
        {CATEGORIES.map(cat => {
          const count = counts[cat.id] || 0;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span className="filter-pill-label">{cat.label}</span>
              <span className="filter-pill-count">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
