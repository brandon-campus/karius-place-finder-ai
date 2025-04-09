
import React, { useState } from 'react';
import { mockPlaces } from '../data/places';
import PlaceCard from '../components/PlaceCard';
import FilterPanel from '../components/FilterPanel';
import { useFilters } from '../contexts/FilterContext';
import { Place } from '../types';
import { Filter, Map, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ExplorePage: React.FC = () => {
  const { filters } = useFilters();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Filter places based on the current filter settings
  const filteredPlaces = mockPlaces.filter((place) => {
    return (
      filters.noiseLevel.includes(place.noiseLevel) &&
      filters.priceRange.includes(place.priceRange) &&
      place.location.distance <= filters.maxDistance &&
      (filters.foodTypes.length === 0 ||
        place.foodType?.some((type) => filters.foodTypes.includes(type)))
    );
  });

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-karius-dark-purple">
            Karius
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="karius-button-secondary text-sm py-2 px-4"
            >
              <Filter size={18} />
              <span>Filtros</span>
            </button>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-karius-purple text-white'
                    : 'bg-white text-gray-500'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-karius-purple text-white'
                    : 'bg-white text-gray-500'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filter panel (desktop) */}
          <div className={`md:w-72 hidden md:block ${showFilters ? 'md:block' : 'md:hidden'}`}>
            <FilterPanel />
          </div>

          {/* Places grid/list */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">
              {filteredPlaces.length} lugares encontrados
            </h1>

            {filteredPlaces.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">
                  No se encontraron lugares con los filtros seleccionados.
                </p>
                <button
                  onClick={() => setShowFilters(true)}
                  className="karius-button-primary mt-4"
                >
                  Ajustar filtros
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onClick={() => handlePlaceClick(place)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter dialog */}
      <Dialog open={showFilters && window.innerWidth < 768} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <FilterPanel />
          <div className="p-4 border-t">
            <Button 
              onClick={() => setShowFilters(false)} 
              className="w-full bg-karius-purple hover:bg-karius-dark-purple"
            >
              Aplicar filtros
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Place detail dialog */}
      {selectedPlace && (
        <Dialog open={!!selectedPlace} onOpenChange={() => setSelectedPlace(null)}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedPlace.name}</h2>
                <span className={`price-tag ${
                  selectedPlace.priceRange === '$' ? 'price-low' : 
                  selectedPlace.priceRange === '$$' ? 'price-medium' : 'price-high'
                }`}>
                  {selectedPlace.priceRange}
                </span>
              </div>
              
              <p className="text-gray-500 mb-4">{selectedPlace.description}</p>
              
              <div className="mb-4">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Map size={16} />
                  <span>{selectedPlace.location.address} ({selectedPlace.location.distance} km)</span>
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Características:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPlace.tags.map(tag => (
                    <span 
                      key={tag.id} 
                      className="bg-karius-light-purple px-3 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {selectedPlace.foodType && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Tipo de comida:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlace.foodType.map(food => (
                      <span 
                        key={food} 
                        className="bg-karius-light-blue px-3 py-1 rounded-full text-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExplorePage;
