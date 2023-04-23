const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  const email = document.getElementById('email').value;
  const passwordInput = document.getElementById('password');
  const password = passwordInput.value;

  // validate email format using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // handle invalid email error
    alert('Please enter a valid email address');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters long.');
    passwordInput.focus();
    return;
  }

  if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
    alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    passwordInput.focus();
    return;
  }

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    // handle successful login
  } else {
    // handle login error
  }
});
