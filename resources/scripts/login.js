const form = document.getElementById("login-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  const email = document.getElementById("email").value;
  const passwordInput = document.getElementById("password");
  const password = passwordInput.value;

  // Your email and password validation code here

  let userUrl = `https://localhost:7026/api/Users/byemail/${email}`;
  fetch(userUrl)
    .then((response) => response.json())
    .then((user) => {
      console.log(user);

      // Authenticate the user
      if (user && user.password === password) {
        // Save user information or token in local storage or session storage
        sessionStorage.setItem("user", JSON.stringify(user));

        // Redirect to the appropriate page based on user role
        if (email === "manager@crimsonclothing.com") {
          window.location.href = "./manager-homepage.html";
        } else if (email.endsWith("@crimsonclothing.com")) {
          window.location.href = "./employee-homepage.html";
        } else {
          window.location.href = "./home-page.html";
        }
      } else {
        // Handle authentication error
        alert("Invalid email or password");
      }
    })
    .catch((error) => console.error(error));

  form.reset();
});
