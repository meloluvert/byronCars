import { API_URL, API_ENDPOINTS, getAuthHeaders, setToken, removeToken } from './config';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  name: string;
  token: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = {
  register: async (data: CreateUserRequest): Promise<User> => {
    const response = await fetch(`${API_URL}${API_ENDPOINTS.user}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao criar usuário');
    }

    return response.json();
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}${API_ENDPOINTS.session}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao fazer login');
    }

    const authData = await response.json();
    console.log('Auth data received from API:', authData);

    if (authData && authData.token && typeof authData.token === 'string') {
      await setToken(authData.token);
    } else {
      throw new Error('Token inválido ou não recebido da API');
    }

    return authData;
  },

  getMe: async (): Promise<User> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.me}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }

    return response.json();
  },

  updateUser: async (data: { name?: string; email?: string }): Promise<User> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.userEdit}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
console.log(JSON.stringify(data))
    if (!response.ok) {
      throw new Error('Erro ao atualizar usuário');
    }

    return response.json();
  },

  deleteUser: async (userId: string): Promise<void> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.userRemove}?user_id=${userId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }

    await removeToken();
  },

  logout: async (): Promise<void> => {
    await removeToken();
  },
};

