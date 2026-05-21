const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api';

export class Api {
  private static getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('zahryx_admin_token');
    }
    return null;
  }

  static async get(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      method: 'GET',
      headers,
    });
    return res.json();
  }

  static async post(endpoint: string, data: any, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  }

  static async put(endpoint: string, data: any, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  }

  static async patch(endpoint: string, data: any, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
  }

  static async delete(endpoint: string, options: RequestInit = {}) {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
      headers,
    });
    return res.json();
  }

  static async uploadFile(file: File): Promise<{ success: boolean; url: string }> {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    return res.json();
  }
}
