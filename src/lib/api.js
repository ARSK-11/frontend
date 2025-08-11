// API Service untuk komunikasi dengan backend
import { API_CONFIG, CORS_CONFIG, ERROR_MESSAGES, ENV_CONFIG } from './config.js';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.API_BASE;
  }

  // Helper untuk request dengan credentials
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: CORS_CONFIG.CREDENTIALS,
      headers: {
        ...CORS_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Helper untuk upload file
  async uploadFile(endpoint, file, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const formData = new FormData();
    const fieldName = options.fieldName || 'file';
    formData.append(fieldName, file);

    const config = {
      method: 'POST',
      credentials: CORS_CONFIG.CREDENTIALS,
      body: formData,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  }

  // ===== AUTHENTICATION API =====

  // Login dengan Google OAuth
  async loginWithGoogle() {
    window.location.href = API_CONFIG.AUTH.GOOGLE_LOGIN;
  }

  // Logout
  async logout() {
    return this.request(API_CONFIG.AUTH.LOGOUT, { method: 'POST' });
  }

  // Get current user info
  async getCurrentUser() {
    return this.request(API_CONFIG.AUTH.USER_INFO);
  }

  // Check registration status
  async getRegistrationStatus() {
    return this.request(API_CONFIG.AUTH.REGISTRATION_STATUS);
  }

  // ===== REGISTRATION API =====

  // Step 1: Update nama
  async updateName(firstName, lastName) {
    return this.request(API_CONFIG.REGISTRATION.STEP1, {
      method: 'POST',
      body: JSON.stringify({ first_name: firstName, last_name: lastName }),
    });
  }

  // Step 2: Update alamat
  async updateAddress(address) {
    return this.request(API_CONFIG.REGISTRATION.STEP2, {
      method: 'POST',
      body: JSON.stringify({ address }),
    });
  }

  // Step 3: Upload foto profil
  async uploadProfileImage(imageFile) {
    return this.uploadFile(API_CONFIG.REGISTRATION.STEP3, imageFile, {
      headers: {}, // Let browser set Content-Type for FormData
      fieldName: 'profile_image', // Specify field name for backend
    });
  }

  // Step 3: Gunakan foto Google (tanpa upload file)
  async useGooglePhoto() {
    return this.request(API_CONFIG.REGISTRATION.STEP3, {
      method: 'POST',
      body: JSON.stringify({ use_google_photo: true }),
    });
  }

  // Upload profile image ke folder private
  async uploadProfileImagePrivate(imageFile) {
    return this.uploadFile(API_CONFIG.REGISTRATION.PROFILE_PRIVATE, imageFile, {
      headers: {}, // Let browser set Content-Type for FormData
      fieldName: 'profile_image', // Specify field name for backend
    });
  }

  // Gunakan foto Google untuk profile private
  async useGooglePhotoPrivate() {
    return this.request(API_CONFIG.REGISTRATION.PROFILE_GOOGLE_PRIVATE, {
      method: 'POST',
    });
  }

  // ===== DIRECTORY API =====

  // Initialize user directory
  async initializeDirectory() {
    return this.request(API_CONFIG.DIRECTORY.INITIALIZE, {
      method: 'POST',
    });
  }

  // Get directory info
  async getDirectoryInfo() {
    return this.request(API_CONFIG.DIRECTORY.INFO);
  }

  // Get list of private files
  async getPrivateFiles() {
    return this.request(API_CONFIG.DIRECTORY.FILES);
  }

  // Get list of shared files
  async getSharedFiles() {
    return this.request(API_CONFIG.DIRECTORY.SHARED);
  }

  // Upload file to private directory
  async uploadPrivateFile(file) {
    return this.uploadFile(API_CONFIG.DIRECTORY.UPLOAD, file, {
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Download file from private directory
  async downloadPrivateFile(filename) {
    const url = `${this.baseURL}${API_CONFIG.DIRECTORY.DOWNLOAD(filename)}`;
    
    try {
      const response = await fetch(url, {
        credentials: CORS_CONFIG.CREDENTIALS,
      });
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      return response.blob();
    } catch (error) {
      console.error('File download failed:', error);
      throw error;
    }
  }

  // Delete file from private directory
  async deletePrivateFile(filename) {
    return this.request(API_CONFIG.DIRECTORY.DELETE(filename), {
      method: 'DELETE',
    });
  }

  // Share file with another user
  async shareFile(filename, targetUserId) {
    return this.request(API_CONFIG.DIRECTORY.SHARE(filename), {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
    });
  }

  // ===== TIMELINE API =====

  // Get user timeline (activity history)
  async getTimeline() {
    return this.request(API_CONFIG.TIMELINE.GET);
  }

  // Add activity to timeline
  async addTimelineActivity(activity) {
    return this.request(API_CONFIG.TIMELINE.ADD, {
      method: 'POST',
      body: JSON.stringify(activity),
    });
  }

  // ===== PUBLIC UPLOAD API =====

  // Upload public image (profile, etc.)
  async uploadPublicImage(imageFile) {
    return this.uploadFile(API_CONFIG.UPLOAD.PUBLIC_IMAGE, imageFile, {
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  // Get public image URL
  getPublicImageUrl(filename) {
    return API_CONFIG.ASSETS.PUBLIC_IMAGE(filename);
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
