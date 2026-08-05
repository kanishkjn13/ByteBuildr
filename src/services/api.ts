/**
 * Byte Build API Service Client Stub
 * Ready for Django REST Framework (DRF) + PostgreSQL Integration
 */

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.bytebuild.com/v1';

export const apiClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'API Request Failed', status: 500 };
    }
  },

  async post<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null, status: response.status };
    } catch (err: any) {
      return { data: null, error: err.message || 'API Request Failed', status: 500 };
    }
  }
};
