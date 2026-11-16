import { getProductsEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { Product, ProductResponse } from '../types/productType';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductResponse>(getProductsEndPoint);
  return response.data.products;
};
