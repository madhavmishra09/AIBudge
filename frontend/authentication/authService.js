const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error || 'Authentication failed';
    throw new Error(message);
  }

  return payload;
};

export const signupUser = async ({ name, email, password }) => {
  return request('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
};

export const loginUser = async ({ email, password }) => {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const getAuthToken = () => localStorage.getItem('authToken');
export const setAuthToken = (token) => localStorage.setItem('authToken', token);
export const removeAuthToken = () => localStorage.removeItem('authToken');
