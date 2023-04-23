// create-account.js

const form = document.querySelector('#create-account-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;

  if (password !== confirmPassword) {
    // display an error message if the passwords do not match
    return;
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      // handle successful user creation
    } else {
      // handle user creation error
    }
  } catch (error) {
    console.error(error);
  }
});
