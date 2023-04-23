// Get references to the login and create account buttons
const loginButton = document.getElementById('login-btn');
const createAccountButton = document.getElementById('create-account-btn');

// Add event listeners to the buttons
if (loginButton) {
  loginButton.addEventListener('click', () => {
    // Navigate to the login page
    window.location.href = '/login.html';
  });
}

if (createAccountButton) {
  createAccountButton.addEventListener('click', () => {
    // Navigate to the create account page
    window.location.href = '/create-account.html';
  });
}
