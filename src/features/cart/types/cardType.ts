import { Product } from '../../home/types/productType';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  color: string;
}

export interface CartState {
  items: Record<string, CartItem>
}
