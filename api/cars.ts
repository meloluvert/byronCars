
import { API_URL, API_ENDPOINTS, getAuthHeaders } from './config';

export interface Car {
  id: string;
  image: string;
  plate: string;
  color: string;
  year: number;
  name: string;
  brand: string;
  price_per_day: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateCarRequest {
  file: string;
  plate: string;
  color: string;
  year: number;
  name: string;
  brand: string;
  price_per_day: number;
  available: boolean;
}

export interface EditCarRequest extends Partial<Omit<CreateCarRequest, 'file'>> {
  car_id: string;
  file?: string;
}

/**
 * Creates a file object for FormData from a given file URI.
 * @param fileUri The URI of the file.
 * @returns An object containing the uri, name, and type for the file.
 */
const createFileData = (fileUri: string) => {
  const filename = fileUri.split('/').pop() || 'image.jpg';
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : 'image/jpeg';

  return {
    uri: fileUri,
    name: filename,
    type,
  };
};

export const carsApi = {
  getAll: async (): Promise<Car[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.cars}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar carros');
    }

    return response.json();
  },

  findByName: async (name: string): Promise<Car[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.carFind}?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar carro');
    }

    return response.json();
  },

  create: async (data: CreateCarRequest): Promise<Car> => {
    const headers = await getAuthHeaders();
    delete (headers as any)['Content-Type'];

    const formData = new FormData();

    formData.append('file', createFileData(data.file) as any);
    formData.append('plate', data.plate);
    formData.append('color', data.color);
    formData.append('year', String(data.year));
    formData.append('name', data.name);
    formData.append('brand', data.brand);
    formData.append('price_per_day', String(data.price_per_day));
    formData.append('available', String(data.available));

    const response = await fetch(`${API_URL}${API_ENDPOINTS.car}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao criar carro: ${response.status} - ${errorText}`);
    }

    return response.json();
  },

  update: async (data: EditCarRequest): Promise<Car> => {
    const headers = await getAuthHeaders();
    delete (headers as any)['Content-Type'];

    const formData = new FormData();

    // Append all fields from the data object to formData, handling the file separately
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof EditCarRequest];

        if (key === 'file' && value) {
          formData.append('file', createFileData(value as string) as any);
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    }

    const response = await fetch(`${API_URL}${API_ENDPOINTS.carEdit}`, {
      method: 'PUT',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao atualizar carro: ${response.status} - ${errorText}`);
    }

    return response.json();
  },

  delete: async (carId: string): Promise<void> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${API_ENDPOINTS.carRemove}?car_id=${carId}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar carro');
    }
  },
  
};


