import { useState, useEffect, useCallback } from 'react';

export type SearchItemType = 'procedure' | 'drug' | 'tool' | 'manual' | 'general';

export interface SearchHistoryItem {
  id: string;
  type: SearchItemType;
  title: string;
  path: string;
  searchedAt: number;
}

const STORAGE_KEY = 'emerges-tes-search-history';
const MAX_HISTORY_ITEMS = 20;

/**
 * Hook para gestionar historial de búsquedas
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Cargar historial al montar
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SearchHistoryItem[];
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading search history:', error);
      setHistory([]);
    }
  }, []);

  // Guardar historial en sessionStorage
  const saveHistory = useCallback((newHistory: SearchHistoryItem[]) => {
    try {
      // Limitar a MAX_HISTORY_ITEMS
      const limited = newHistory.slice(0, MAX_HISTORY_ITEMS);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      setHistory(limited);
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, []);

  // Añadir al historial
  const addToHistory = useCallback((item: Omit<SearchHistoryItem, 'searchedAt'>) => {
    // Evitar duplicados recientes (mismo id en últimos 5 minutos)
    const now = Date.now();
    const recent = history.filter(
      (h) => h.id === item.id && now - h.searchedAt < 5 * 60 * 1000
    );

    if (recent.length > 0) {
      // Actualizar timestamp del existente
      const updated = history.map((h) =>
        h.id === item.id ? { ...h, searchedAt: now } : h
      );
      // Ordenar por fecha (más reciente primero)
      updated.sort((a, b) => b.searchedAt - a.searchedAt);
      saveHistory(updated);
    } else {
      // Añadir nuevo
      const newItem: SearchHistoryItem = {
        ...item,
        searchedAt: now,
      };
      // Añadir al inicio y limitar
      saveHistory([newItem, ...history]);
    }
  }, [history, saveHistory]);

  // Obtener historial reciente (últimos N)
  const getRecentHistory = useCallback((limit: number = 10) => {
    return history.slice(0, limit);
  }, [history]);

  // Limpiar historial
  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  // Eliminar un item del historial
  const removeFromHistory = useCallback((id: string) => {
    saveHistory(history.filter((h) => h.id !== id));
  }, [history, saveHistory]);

  return {
    history,
    addToHistory,
    getRecentHistory,
    clearHistory,
    removeFromHistory,
  };
};
