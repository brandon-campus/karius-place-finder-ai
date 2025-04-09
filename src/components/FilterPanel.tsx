
import React, { useState } from 'react';
import { useFilters } from '../contexts/FilterContext';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Mood, NoiseLevel, PriceRange } from '../types';

const FilterPanel: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  
  const handleNoiseLevelChange = (level: NoiseLevel) => {
    let updatedNoiseLevels = [...filters.noiseLevel];
    
    if (updatedNoiseLevels.includes(level)) {
      updatedNoiseLevels = updatedNoiseLevels.filter(l => l !== level);
    } else {
      updatedNoiseLevels.push(level);
    }
    
    updateFilters({ noiseLevel: updatedNoiseLevels });
  };
  
  const handlePriceRangeChange = (price: PriceRange) => {
    let updatedPriceRanges = [...filters.priceRange];
    
    if (updatedPriceRanges.includes(price)) {
      updatedPriceRanges = updatedPriceRanges.filter(p => p !== price);
    } else {
      updatedPriceRanges.push(price);
    }
    
    updateFilters({ priceRange: updatedPriceRanges });
  };
  
  const handleMoodChange = (mood: Mood) => {
    let updatedMoods = [...filters.mood];
    
    if (updatedMoods.includes(mood)) {
      updatedMoods = updatedMoods.filter(m => m !== mood);
    } else {
      updatedMoods.push(mood);
    }
    
    updateFilters({ mood: updatedMoods });
  };
  
  const handleDistanceChange = (value: number[]) => {
    updateFilters({ maxDistance: value[0] });
  };
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filtros</h2>
        <button 
          onClick={resetFilters}
          className="text-karius-purple hover:text-karius-dark-purple text-sm font-medium"
        >
          Restablecer
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Noise Level Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Nivel de ruido</h3>
          <div className="flex flex-wrap gap-2">
            {(['bajo', 'medio', 'alto'] as NoiseLevel[]).map(level => (
              <button
                key={level}
                onClick={() => handleNoiseLevelChange(level)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  filters.noiseLevel.includes(level)
                    ? 'bg-karius-purple text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Range Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Rango de precios</h3>
          <div className="flex flex-wrap gap-2">
            {(['$', '$$', '$$$'] as PriceRange[]).map(price => (
              <button
                key={price}
                onClick={() => handlePriceRangeChange(price)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  filters.priceRange.includes(price)
                    ? 'bg-karius-purple text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
        
        {/* Distance Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Distancia</h3>
            <span className="text-sm text-gray-600">{filters.maxDistance} km</span>
          </div>
          <Slider
            defaultValue={[filters.maxDistance]}
            max={20}
            step={0.5}
            onValueChange={handleDistanceChange}
            className="w-full"
          />
        </div>
        
        {/* Mood Section */}
        <div>
          <h3 className="text-sm font-medium mb-3">Estado de ánimo</h3>
          <div className="space-y-2">
            {[
              { id: 'trabajo', label: 'Trabajo' },
              { id: 'cita', label: 'Citas' },
              { id: 'familia', label: 'Salidas familiares' },
              { id: 'solo', label: 'Café solo' },
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <label htmlFor={`mood-${item.id}`} className="text-sm text-gray-700">
                  {item.label}
                </label>
                <Switch
                  id={`mood-${item.id}`}
                  checked={filters.mood.includes(item.id as Mood)}
                  onCheckedChange={() => handleMoodChange(item.id as Mood)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
