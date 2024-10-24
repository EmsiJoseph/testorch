import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  searchResults: any[];
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
}

export const useSearch = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
}));
