// utils/fuzzySearchUtil.ts

import Fuse from 'fuse.js';

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: string[];
  updated: string;
}

export const createFuzzySearch = (data: Show[]) => {
  const options = {
    keys: ['title', 'description'],
    threshold: 0.3,
  };
  return new Fuse(data, options);
};

export const searchWithFuzzy = (
  fuse: Fuse<Show> | null,
  searchTerm: string,
  showData: Show[] // Accepting showData from the component state
): Show[] => {
  if (!fuse || !searchTerm) {
    return showData; // Return all shows if no search term
  }
  return fuse.search(searchTerm).map(({ item }) => item);
};
