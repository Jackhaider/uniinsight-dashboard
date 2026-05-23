export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

export const apiFetch = async (endpoint, options = {}) => {
  let token = localStorage.getItem('uniinsight_access_token');
  
  const defaultHeaders = {};

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let response = await fetch(`${API_URL}${endpoint}`, config);

  if (response.status === 401) {
    const refreshToken = localStorage.getItem('uniinsight_refresh_token');
    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${API_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
        
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('uniinsight_access_token', data.access_token);
          localStorage.setItem('uniinsight_refresh_token', data.refresh_token);
          
          // Retry the original request
          config.headers['Authorization'] = `Bearer ${data.access_token}`;
          response = await fetch(`${API_URL}${endpoint}`, config);
        } else {
          // Refresh failed, logout
          localStorage.removeItem('uniinsight_access_token');
          localStorage.removeItem('uniinsight_refresh_token');
          window.location.href = '/login';
        }
      } catch (err) {
        localStorage.removeItem('uniinsight_access_token');
        localStorage.removeItem('uniinsight_refresh_token');
        window.location.href = '/login';
      }
    } else {
        localStorage.removeItem('uniinsight_access_token');
        window.location.href = '/login';
    }
  }

  return response;
};
