// Konfigurasi URL dan Environment Settings
// File ini mempermudah pengelolaan URL API dan konfigurasi environment

// Deteksi environment
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Konfigurasi Base URL
const getBaseUrl = () => {
  // Selalu gunakan http://localhost:3000 sesuai instruksi
  return 'http://localhost:3000';
};

// Konfigurasi API
export const API_CONFIG = {
  // Base URL untuk API
  BASE_URL: getBaseUrl(),
  
  // API Endpoint base
  API_BASE: `${getBaseUrl()}/api`,
  
  // Auth endpoints
  AUTH: {
    GOOGLE_LOGIN: `${getBaseUrl()}/auth/google`,
    LOGOUT: '/logout',
    USER_INFO: '/user',
    REGISTRATION_STATUS: '/user/registration-status',
  },
  
  // Registration endpoints
  REGISTRATION: {
    STEP1: '/register/step1',
    STEP2: '/register/step2',
    STEP3: '/register/step3',
    PROFILE_PRIVATE: '/profile/upload-private',
    PROFILE_GOOGLE_PRIVATE: '/profile/use-google-private',
  },
  
  // Directory endpoints
  DIRECTORY: {
    INITIALIZE: '/directory/initialize',
    INFO: '/directory/info',
    FILES: '/directory/files',
    SHARED: '/directory/shared',
    UPLOAD: '/directory/upload',
    DOWNLOAD: (filename) => `/directory/download/${encodeURIComponent(filename)}`,
    DELETE: (filename) => `/directory/delete/${encodeURIComponent(filename)}`,
    SHARE: (filename) => `/directory/share/${encodeURIComponent(filename)}`,
  },
  
  // Timeline endpoints
  TIMELINE: {
    GET: '/timeline',
    ADD: '/timeline',
  },
  
  // Upload endpoints
  UPLOAD: {
    PUBLIC_IMAGE: '/upload-image',
  },
  
  // Public assets
  ASSETS: {
    UPLOADS: `${getBaseUrl()}/uploads`,
    PUBLIC_IMAGE: (filename) => `${getBaseUrl()}/uploads/${filename}`,
  },
};

// Konfigurasi Environment
export const ENV_CONFIG = {
  IS_DEVELOPMENT: isDevelopment,
  IS_PRODUCTION: isProduction,
  
  // Feature flags
  FEATURES: {
    DEBUG_MODE: isDevelopment,
    ENABLE_LOGGING: isDevelopment,
    ENABLE_ANALYTICS: isProduction,
  },
  
  // Timeout configurations
  TIMEOUTS: {
    API_REQUEST: 30000, // 30 detik
    UPLOAD: 60000, // 60 detik
    DOWNLOAD: 120000, // 2 menit
  },
  
  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
};

// Konfigurasi CORS
export const CORS_CONFIG = {
  // Allowed origins untuk development dan production
  ALLOWED_ORIGINS: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://increases-fairly-karaoke-processes.trycloudflare.com'],
  
  // Credentials configuration
  CREDENTIALS: 'include',
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Konfigurasi Pesan Error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
  UNAUTHORIZED: 'Anda tidak memiliki akses. Silakan login kembali.',
  FORBIDDEN: 'Akses ditolak.',
  NOT_FOUND: 'Data tidak ditemukan.',
  SERVER_ERROR: 'Terjadi kesalahan server. Silakan coba lagi nanti.',
  UPLOAD_ERROR: 'Gagal mengupload file. Silakan coba lagi.',
  DOWNLOAD_ERROR: 'Gagal mengunduh file. Silakan coba lagi.',
  TIMEOUT_ERROR: 'Request timeout. Silakan coba lagi.',
};

// Fungsi utilitas untuk URL
export const URL_UTILS = {
  // Membuat URL lengkap untuk API endpoint
  makeApiUrl: (endpoint) => `${API_CONFIG.API_BASE}${endpoint}`,
  
  // Membuat URL untuk public assets
  makeAssetUrl: (filename) => `${API_CONFIG.ASSETS.UPLOADS}/${filename}`,
  
  // Validasi URL
  isValidUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Mendapatkan parameter dari URL
  getUrlParams: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  },
  
  // Menambahkan parameter ke URL
  addUrlParams: (url, params) => {
    const urlObj = new URL(url);
    Object.keys(params).forEach(key => {
      urlObj.searchParams.set(key, params[key]);
    });
    return urlObj.toString();
  },
};

// Export default configuration object
export default {
  API: API_CONFIG,
  ENV: ENV_CONFIG,
  CORS: CORS_CONFIG,
  ERRORS: ERROR_MESSAGES,
  UTILS: URL_UTILS,
};
