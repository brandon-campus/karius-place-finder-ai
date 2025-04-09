
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Place } from '../types';

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (placeId: string) => void;
  removeFavorite: (placeId: string) => void;
  isFavorite: (placeId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('karius-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('karius-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (placeId: string) => {
    setFavorites((prev) => [...prev, placeId]);
  };

  const removeFavorite = (placeId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== placeId));
  };

  const isFavorite = (placeId: string) => {
    return favorites.includes(placeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
