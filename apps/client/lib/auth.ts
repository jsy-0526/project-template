export const setToken = (token: string) => {
  localStorage.setItem('access_token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const setUserId = (userId: string) => {
  localStorage.setItem('user_id', userId);
};

export const getUserId = (): string | null => {
  return localStorage.getItem('user_id');
};

export const setUserEmail = (email: string) => {
  localStorage.setItem('user_email', email);
};

export const getUserEmail = (): string | null => {
  return localStorage.getItem('user_email');
};

export const clearAuth = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_email');
  localStorage.removeItem('figma_token');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
