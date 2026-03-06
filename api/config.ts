import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const API_ENDPOINTS = {
  user: '/v1/user',
  session: '/v1/session',
  me: '/v1/me',
  userRemove: '/v1/user/remove',
  userEdit: '/v1/user/edit',
  car: '/v1/car',
  cars: '/v1/cars',
  carFind: '/v1/cars/find',
  carEdit: '/v1/car/edit',
  carRemove: '/v1/car/remove',
};

export { API_URL, API_ENDPOINTS };

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('auth_token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('auth_token', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('auth_token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

