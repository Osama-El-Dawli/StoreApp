import { getMeEndPoint, loginEndPoint } from '../../../api/apiConst';
import { api } from '../../../api/apiService';
import { LoginRequest, LoginResponse, User } from '../types/authTypes';

export const loginApi = async (
  loginRequestBody: LoginRequest,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    loginEndPoint,
    loginRequestBody,
  );

  return response.data;
};

export const getMeApi = async (): Promise<User> => {
  const { data } = await api.get<User>(getMeEndPoint);
  return data;
};
