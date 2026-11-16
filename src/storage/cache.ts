import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();

export const CACHE_KEYS = {
  categories: 'cache:categories',
  products: (category: string) => `cache:products:${category}`,
};

export const cache = {
  set<T>(key: string, value: T) {
    storage.set(key, JSON.stringify(value));
  },

  get<T>(key: string): T | null {
    const data = storage.getString(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  },
};
