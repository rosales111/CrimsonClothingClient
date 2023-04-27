function handleBanClick() {
  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  console.log(email);
  const userUrl = `https://localhost:7026/api/Users/byemail/${email}`;
  fetch(userUrl)
    .then((response) => response.json())
    .then((user) => {
      user.isbanned = true;

      handlePut(user);
      emailInput.value = "";
      alert(`User ${user.email} has been banned`);
    })
    .catch((error) => console.error(error));
}

async function handlePut(user) {
  console.log("handlePut called");
  const userUrl = `https://localhost:7026/api/Users/${user.id}`;
  const newUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    role: user.role,
    isBanned: user.isbanned,
  };

  await fetch(userUrl, {
    method: "PUT",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
