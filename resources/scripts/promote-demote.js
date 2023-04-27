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
