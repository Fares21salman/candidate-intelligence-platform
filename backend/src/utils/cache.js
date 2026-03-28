// src/utils/cache.js
const cache = new Map();

export const getCache = (key) => cache.get(key);

export const setCache = (key, value) => {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), 60000);
};