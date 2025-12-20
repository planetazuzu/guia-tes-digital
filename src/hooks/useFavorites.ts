import { useState, useEffect, useCallback } from 'react';

export type FavoriteType = 'procedure' | 'drug' | 'tool' | 'manual';

export interface Favorite {
  id: string;
  type: FavoriteType;
  title: string;
  path: string;
  addedAt: number;
}

const STORAGE_KEY = 'emerges-tes-favorites';

/**
 * Hook para gestionar favoritos persistentes
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Cargar favoritos al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Favorite[];
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  }, []);

  // Guardar favoritos en localStorage
  const saveFavorites = useCallback((newFavorites: Favorite[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, []);

  // Añadir a favoritos
  const addFavorite = useCallback((favorite: Omit<Favorite, 'addedAt'>) => {
    const newFavorite: Favorite = {
      ...favorite,
      addedAt: Date.now(),
    };
    saveFavorites([...favorites, newFavorite]);
  }, [favorites, saveFavorites]);

  // Eliminar de favoritos
  const removeFavorite = useCallback((id: string) => {
    saveFavorites(favorites.filter((f) => f.id !== id));
  }, [favorites, saveFavorites]);

  // Verificar si es favorito
  const isFavorite = useCallback((id: string) => {
    return favorites.some((f) => f.id === id);
  }, [favorites]);

  // Toggle favorito
  const toggleFavorite = useCallback((favorite: Omit<Favorite, 'addedAt'>) => {
    if (isFavorite(favorite.id)) {
      removeFavorite(favorite.id);
    } else {
      addFavorite(favorite);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  // Obtener favoritos por tipo
  const getFavoritesByType = useCallback((type: FavoriteType) => {
    return favorites.filter((f) => f.type === type);
  }, [favorites]);

  // Limpiar todos los favoritos
  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoritesByType,
    clearFavorites,
  };
};
