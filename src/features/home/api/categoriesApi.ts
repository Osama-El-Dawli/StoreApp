import { getCategoriesEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { Category } from '../types/categoryType';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(getCategoriesEndPoint);
  return response.data;
};
