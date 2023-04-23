// promote-demote.js

const employeeList = document.querySelector('#employee-list');

axios.get('/api/employees')
  .then(response => {
    response.data.forEach(employee => {
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
  })
  .catch(error => {
    console.error(error);
  });
