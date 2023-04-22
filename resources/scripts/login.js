const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

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