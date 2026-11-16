import { getCategoriessEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get(getCategoriessEndPoint);
  return response.data;
};
