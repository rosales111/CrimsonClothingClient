const url = "https://testtest-benjaminf.pitunnel.com/api/Users";
const promotionURL = "https://testtest-benjaminf.pitunnel.com/api/promotion";
const promoter = JSON.parse(sessionStorage.getItem("user"));
console.log(promoter);
const users = fetchUserData();
// Fetch user data and create the table
fetchUserData().then((users) => {
  const table = createUserTable(users);
  document.body.appendChild(table);
});
async function fetchUserData() {
  try {
    const response = await fetch(url);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Assuming the API returns an array of user objects, return it directly
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

// Function to create a Bootstrap table with user data
function createUserTable(users) {
  const table = document.createElement("table");
  table.classList.add("table");

  // Table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th scope="col">Full Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  `;
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  users.forEach((user) => {
    if (user.isBanned == false) {
      const tr = document.createElement("tr");

      let role = "";
      if (user.role == "1") {
        role = "User";
      } else if (user.role == "2") {
        role = "Employee";
      } else if (user.role == "3") {
        role = "Admin";
      }
      tr.innerHTML = `
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td>${role}</td>
      <td>
        <button class="btn btn-primary btn-sm me-2" onclick="promoteUser(${user.id})">Promote</button>
        <button class="btn btn-warning btn-sm" onclick="demoteUser(${user.id})">Demote</button>
      </td>
    `;
      tbody.appendChild(tr);
    }
  });
  table.appendChild(tbody);

  return table;
}

// Functions to handle promotion and demotion actions
async function promoteUser(promoteeId) {
  console.log(promoteeId);
  const data = await fetchUserData();
  const user = data.find((u) => u.id === promoteeId);
  if (user.role == 3) {
    alert("User is already an admin");
    return;
  }
  user.role = user.role + 1;
  const report = {
    promoterID: promoter.id,
    promoteeID: promoteeId,
    newRole: user.role,
  };
  await handlePost(report);
  await handlePut(user);
  const table = createUserTable(data);
  document.body.replaceChild(table, document.querySelector("table"));
}

async function demoteUser(promoteeId) {
  console.log(promoteeId);
  const data = await fetchUserData();
  const user = data.find((u) => u.id === promoteeId);
  if (user.role == 1) {
    alert("User is already at the lowest level");
    return;
  }
  user.role = user.role - 1;
  const report = {
    promoterID: promoter.id,
    promoteeID: promoteeId,
    newRole: user.role,
  };
  await handlePost(report);
  await handlePut(user);
  const table = createUserTable(data);
  document.body.replaceChild(table, document.querySelector("table"));
}

async function handlePut(user) {
  console.log("handlePut called");
  const userUrl = "https://testtest-benjaminf.pitunnel.com/api/Users" + "/" + user.ID;

  const newUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    role: user.role,
    isBanned: user.isBanned,
  };

  await fetch(userUrl, {
    method: "PUT",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function handlePost(promotion) {
  console.log("handlePost called");
  const newPromotion = {
    promoterID: promotion.promoterID,
    promoteeID: promotion.promoteeID,
    newRole: promotion.newRole,
  };
  await fetch(promotionURL, {
    method: "POST",
    body: JSON.stringify(promotion),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
