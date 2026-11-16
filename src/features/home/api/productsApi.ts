import {
  getProductsByCategoryEndPoint,
  ProductsEndPoint,
} from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { Product, ProductResponse } from '../types/productType';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductResponse>(ProductsEndPoint);
  return response.data.products;
};

export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const response = await api.get<ProductResponse>(
    `${getProductsByCategoryEndPoint}/${category}`,
  );
  return response.data.products;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`${ProductsEndPoint}/${id}`);
  return response.data;
};
