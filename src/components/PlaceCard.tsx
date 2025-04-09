
import React from 'react';
import { Place } from '../types';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface PlaceCardProps {
  place: Place;
  onClick: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(place.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(place.id);
    } else {
      addFavorite(place.id);
    }
  };

  const getPriceClass = () => {
    switch (place.priceRange) {
      case '$': return 'price-low';
      case '$$': return 'price-medium';
      case '$$$': return 'price-high';
      default: return 'price-medium';
    }
  };

  return (
    <div 
      className="karius-card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={place.image} 
          alt={place.name} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-colors duration-300"
        >
          <Heart 
            size={20} 
            className={favorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{place.name}</h3>
          <span className={`price-tag ${getPriceClass()}`}>
            {place.priceRange}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mt-1">{place.location.distance} km • {place.location.address}</p>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {place.tags.slice(0, 3).map(tag => (
            <span 
              key={tag.id} 
              className="bg-karius-light-purple px-2 py-1 rounded-full text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
