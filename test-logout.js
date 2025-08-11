// Script untuk testing sistem logout
// Jalankan di browser console setelah login

console.log('=== Testing Logout System ===');

// Function untuk check session status
async function checkSessionStatus() {
  try {
    const response = await fetch('http://localhost:3000/api/session/status', {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('Session Status:', data);
    return data;
  } catch (error) {
    console.error('Error checking session:', error);
    return null;
  }
}

// Function untuk check user info
async function checkUserInfo() {
  try {
    const response = await fetch('http://localhost:3000/api/user', {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('User Info:', data);
    return data;
  } catch (error) {
    console.error('Error checking user info:', error);
    return null;
  }
}

// Function untuk check localStorage
function checkLocalStorage() {
  console.log('LocalStorage items:', Object.keys(localStorage));
  console.log('SessionStorage items:', Object.keys(sessionStorage));
}

// Function untuk check cookies
function checkCookies() {
  console.log('Cookies:', document.cookie);
}

// Function untuk perform logout test
async function testLogout() {
  console.log('\n--- Starting Logout Test ---');
  
  // Check initial state
  console.log('\n1. Checking initial session state...');
  await checkSessionStatus();
  await checkUserInfo();
  checkLocalStorage();
  checkCookies();
  
  // Perform logout
  console.log('\n2. Performing logout...');
  try {
    const response = await fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await response.json();
    console.log('Logout response:', data);
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  // Check state after logout
  console.log('\n3. Checking state after logout...');
  await checkSessionStatus();
  await checkUserInfo();
  checkLocalStorage();
  checkCookies();
  
  console.log('\n--- Logout Test Completed ---');
}

// Function untuk test sidebar logout
async function testSidebarLogout() {
  console.log('\n=== Testing Sidebar Logout ===');
  
  // Simulate sidebar logout button click
  console.log('1. Simulating sidebar logout button click...');
  
  // Find logout button in sidebar
  const logoutButton = document.querySelector('[data-testid="logout-button"]') || 
                      document.querySelector('button[class*="logout"]') ||
                      document.querySelector('button:has-text("Logout")');
  
  if (logoutButton) {
    console.log('Found logout button, clicking...');
    logoutButton.click();
  } else {
    console.log('Logout button not found, testing manual logout...');
    await testLogout();
  }
}

// Function untuk test protected route access
async function testProtectedRouteAccess() {
  console.log('\n=== Testing Protected Route Access ===');
  
  try {
    const response = await fetch('http://localhost:3000/api/user', {
      credentials: 'include'
    });
    
    if (response.status === 401) {
      console.log('✅ Protected route correctly returns 401 (Unauthorized)');
    } else {
      console.log('❌ Protected route should return 401 but got:', response.status);
    }
  } catch (error) {
    console.log('✅ Network error (expected if session is cleared):', error.message);
  }
}

// Function untuk comprehensive test
async function runComprehensiveTest() {
  console.log('🚀 Starting Comprehensive Logout Test');
  
  // Test 1: Manual logout
  await testLogout();
  
  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Protected route access
  await testProtectedRouteAccess();
  
  // Test 3: Try to access home page
  console.log('\n4. Testing home page access...');
  try {
    const response = await fetch('http://localhost:5173/', {
      credentials: 'include'
    });
    console.log('Home page response status:', response.status);
  } catch (error) {
    console.log('Home page access error (expected):', error.message);
  }
  
  console.log('\n🎉 Comprehensive test completed!');
}

// Export functions for manual testing
window.logoutTest = {
  checkSessionStatus,
  checkUserInfo,
  checkLocalStorage,
  checkCookies,
  testLogout,
  testSidebarLogout,
  testProtectedRouteAccess,
  runComprehensiveTest
};

console.log('Logout test functions available as window.logoutTest');
console.log('Run: window.logoutTest.runComprehensiveTest() to start testing');
