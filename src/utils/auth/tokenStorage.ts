export type StorageType = 'cookie' | 'memory';

export const TokenStorage = {
  store: (token: string, type: StorageType = 'cookie') => {
    if (type === 'cookie') {
      document.cookie = `auth-token=${token}; path=/; secure; samesite=strict; max-age=7200`;
    } else {
      sessionStorage.setItem('auth-token', token);
    }
  },

  clear: (type: StorageType = 'cookie') => {
    if (type === 'cookie') {
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    } else {
      sessionStorage.removeItem('auth-token');
    }
  }
};