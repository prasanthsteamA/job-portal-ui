import axios from "axios";

const API_BASE_URL = process.env.APP_API_URL || "https://behhobhg56.execute-api.ap-south-1.amazonaws.com/dev/api/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId :string;

}


export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, data);
  return response.data;
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};
