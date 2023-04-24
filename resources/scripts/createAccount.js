// create-account.js

const url = "https://localhost:7026/api/Users";
const form = document.querySelector("#register-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const fullname =
    document.querySelector("#firstName").value +
    " " +
    document.querySelector("#lastName").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (password !== confirmPassword) {
    // display an error message if the passwords do not match
    return;
  }

  let newUser = {
    fullname: fullname,
    email: email,
    password: password,
    role: 1,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (response.ok) {
      // handle successful user creation
      form.reset();
    } else {
      // handle user creation error
    }
  } catch (error) {
    console.error(error);
  }
});
