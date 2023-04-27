<<<<<<< Updated upstream
const employeeList = document.querySelector('#employee-list');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');

let employees = [];

// Function to render the employee list
function renderEmployeeList() {
  employeeList.innerHTML = '';
  employees.forEach(employee => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = employee.id;
    row.appendChild(idCell);

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = employee.firstName;
    row.appendChild(firstNameCell);

    const lastNameCell = document.createElement('td');
    lastNameCell.textContent = employee.lastName;
    row.appendChild(lastNameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = employee.email;
    row.appendChild(emailCell);

    const roleCell = document.createElement('td');
    roleCell.textContent = employee.role;
    row.appendChild(roleCell);

    const actionCell = document.createElement('td');
    const promoteButton = document.createElement('button');
    promoteButton.textContent = 'Promote';
    promoteButton.addEventListener('click', () => {
      // Handle promote button click
    });
    actionCell.appendChild(promoteButton);

    const demoteButton = document.createElement('button');
    demoteButton.textContent = 'Demote';
    demoteButton.addEventListener('click', () => {
      // Handle demote button click
    });
    actionCell.appendChild(demoteButton);

    row.appendChild(actionCell);

    employeeList.appendChild(row);
  });
}

// Function to filter the employee list based on search input
function searchEmployees() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredEmployees = employees.filter(employee => {
    return (
      employee.firstName.toLowerCase().includes(searchTerm) ||
      employee.lastName.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.role.toLowerCase().includes(searchTerm)
    );
  });
  renderEmployeeList(filteredEmployees);
}

// Get the list of employees from the API
axios.get('/api/employees')
  .then(response => {
    employees = response.data;
    renderEmployeeList();
  })
  .catch(error => {
    console.error(error);
  });

// Add event listeners to search input and button
searchInput.addEventListener('input', searchEmployees);
searchButton.addEventListener('click', searchEmployees);
=======
url = "https://localhost:7026/api/Users";
const users = fetchUserData();
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
  });
  table.appendChild(tbody);

  return table;
}

// Functions to handle promotion and demotion actions
async function promoteUser(userId) {
  const data = await fetchUserData();
  const user = data.find((u) => u.id === userId);
  if (user.role == 3) {
    alert("User is already an admin");
    return;
  }
  user.role = user.role + 1;
  await handlePut(user);
  const table = createUserTable(data);
  document.body.replaceChild(table, document.querySelector("table"));
}

async function demoteUser(userId) {
  const data = await fetchUserData();
  const user = data.find((u) => u.id === userId);
  if (user.role == 1) {
    alert("User is already the lowest role");
    return;
  }
  user.role = user.role - 1;
  await handlePut(user);
  const table = createUserTable(data);
  document.body.replaceChild(table, document.querySelector("table"));
}

// Fetch user data and create the table
fetchUserData().then((users) => {
  const table = createUserTable(users);
  document.body.appendChild(table);
});

async function handlePut(user) {
  console.log("handlePut called");
  const userUrl = "https://localhost:7026/api/Users" + "/" + user.ID;

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
>>>>>>> Stashed changes
