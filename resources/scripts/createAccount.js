// create-account.js

const url = "https://testtest-benjaminf.pitunnel.com/api/Users";
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

  const emailExists = await checkIfEmailExists(email);
  if (emailExists) {
    alert("Email already registered");
    return;
  }

  let newUser = {
    fullname: fullname,
    email: email,
    password: password,
    role: 1,
  };

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.ok) {
    sessionStorage.setItem("user", JSON.stringify(newUser));

    window.location.href = "./home-page.html"; // Change "/main" to your main page path
  } else {
    console.log("Error: " + response.statusText);
  }
});

async function checkIfEmailExists(email) {
  try {
    console.log(email);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    // Check if the provided email exists in the data
    console.log(data.some((data) => data.email === email));
    return data.some((data) => data.email === email);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}
