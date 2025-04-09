
import React, { createContext, useContext, useState } from 'react';
import { FilterOptions, Mood, NoiseLevel, PriceRange } from '../types';

interface FilterContextType {
  filters: FilterOptions;
  updateFilters: (newFilters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterOptions = {
  noiseLevel: ["bajo", "medio", "alto"],
  priceRange: ["$", "$$", "$$$"],
  maxDistance: 10,
  foodTypes: [],
  mood: ["trabajo", "cita", "familia", "solo"],
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
