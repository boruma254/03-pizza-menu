// API client for backend communication
// Prefer env; fall back to Render backend when running on Vercel; else localhost for dev.
const API_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')
    ? 'https://pizza-menu-backend.onrender.com/api'
    : 'http://localhost:5000/api');

let token = localStorage.getItem('token');

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token', newToken);
};

export const clearToken = () => {
  token = null;
  localStorage.removeItem('token');
};

const makeRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth endpoints
export const signUpWithBackend = async (email, password, name) => {
  const data = await makeRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
  setToken(data.token);
  return data.user;
};

export const signInWithBackend = async (email, password) => {
  const data = await makeRequest('/auth/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data.user;
};

export const getCurrentUser = async () => {
  return makeRequest('/auth/me');
};

export const signOutBackend = () => {
  clearToken();
};

// Order endpoints
export const createOrder = async (items, total) => {
  return makeRequest('/orders', {
    method: 'POST',
    body: JSON.stringify({ items, total }),
  });
};

export const getUserOrders = async () => {
  return makeRequest('/orders');
};

export const getOrder = async (orderId) => {
  return makeRequest(`/orders/${orderId}`);
};

export const updateOrderStatus = async (orderId, status) => {
  return makeRequest(`/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};

export const getAllOrders = async () => {
  return makeRequest('/orders/admin/all');
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
};
