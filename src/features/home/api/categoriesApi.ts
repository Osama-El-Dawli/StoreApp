import { getCategoriessEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { Category } from '../types/categoryType';

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get(getCategoriessEndPoint);
  return response.data;
};
