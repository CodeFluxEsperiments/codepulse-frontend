const API_BASE_URL = 'https://api.example.com';

export const apiService = {
  async getRequest(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },

  async postRequest(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
