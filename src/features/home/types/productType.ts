export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  thumbnail: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}
