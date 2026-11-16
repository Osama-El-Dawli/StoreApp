import { loginEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { LoginRequest, LoginResponse } from '../types/authTypes';

export const loginApi = async (
  loginRequestBody: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    loginEndPoint,
    loginRequestBody,
  );

  return response.data;
};
