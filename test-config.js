// Test konfigurasi URL
import { API_CONFIG, ENV_CONFIG } from './src/lib/config.js';

console.log('🔍 Testing URL Configuration...\n');

console.log('Environment Detection:');
console.log(`- isDevelopment: ${ENV_CONFIG.IS_DEVELOPMENT}`);
console.log(`- isProduction: ${ENV_CONFIG.IS_PRODUCTION}`);
console.log(`- Current hostname: ${window.location.hostname}`);
console.log(`- Current URL: ${window.location.href}\n`);

console.log('Base URL Configuration:');
console.log(`- BASE_URL: ${API_CONFIG.BASE_URL}`);
console.log(`- API_BASE: ${API_CONFIG.API_BASE}\n`);

console.log('Auth Endpoints:');
console.log(`- GOOGLE_LOGIN: ${API_CONFIG.AUTH.GOOGLE_LOGIN}`);
console.log(`- LOGOUT: ${API_CONFIG.AUTH.LOGOUT}`);
console.log(`- USER_INFO: ${API_CONFIG.AUTH.USER_INFO}\n`);

console.log('Expected Behavior:');
if (window.location.hostname.includes('trycloudflare.com')) {
  console.log('✅ Running on Cloudflare - should use production URL');
  console.log(`Expected: https://terrain-wrote-ceo-server.trycloudflare.com`);
  console.log(`Actual: ${API_CONFIG.BASE_URL}`);
  
  if (API_CONFIG.BASE_URL.includes('terrain-wrote-ceo-server.trycloudflare.com')) {
    console.log('✅ Configuration is correct!');
  } else {
    console.log('❌ Configuration is incorrect!');
  }
} else {
  console.log('🔧 Running locally - should use development URL');
  console.log(`Expected: http://localhost:3000`);
  console.log(`Actual: ${API_CONFIG.BASE_URL}`);
  
  if (API_CONFIG.BASE_URL.includes('localhost:3000')) {
    console.log('✅ Configuration is correct!');
  } else {
    console.log('❌ Configuration is incorrect!');
  }
}

console.log('\n📋 Summary:');
console.log(`- Frontend URL: ${window.location.href}`);
console.log(`- Backend URL: ${API_CONFIG.BASE_URL}`);
console.log(`- Google OAuth: ${API_CONFIG.AUTH.GOOGLE_LOGIN}`);
