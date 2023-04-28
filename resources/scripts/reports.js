const url = "https://localhost:7026/api/transactions";
const userUrl = "https://localhost:7026/api/Users";

function showTransactions() {
  const tableContainer = document.getElementById("table-container");
  if (tableContainer) {
    tableContainer.remove();
  }
  fetchTransactionData().then((transactions) => {
    const dropdown = createDropdown();
    document.body.appendChild(dropdown);
    const table = createTransactionTable(transactions);
    document.body.appendChild(table);
    dropdown.addEventListener("change", (event) => {
      filterTransactions(event.target.value, transactions, table);
    });
  });
}

async function transactionsByID(ID) {
  const tableContainer = document.getElementById("table-container");
  if (tableContainer) {
    tableContainer.remove();
  }
  fetchTransactionData().then((transactions) => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.userID === ID
    );
    const input = createInput();
    document.body.appendChild(input);
    const table = createTransactionTable(filteredTransactions);
    document.body.appendChild(table);
    input.addEventListener("change", (event) => {
      const newID = parseInt(event.target.value);
      const newFilteredTransactions = transactions.filter(
        (transaction) => transaction.userID === newID
      );
      const newTable = createTransactionTable(newFilteredTransactions);
      table.replaceWith(newTable);
      filteredTransactions = newFilteredTransactions;
      ID = newID;
    });
  });
}

function createInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter User ID";
  return input;
}

function createDropdown() {
  const select = document.createElement("select");

  const options = [
    { text: "Last month", value: "lastMonth" },
    { text: "Last 6 months", value: "last6Months" },
    { text: "Last year", value: "lastYear" },
    { text: "All time", value: "allTime" },
  ];

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.textContent = optionData.text;
    option.value = optionData.value;
    select.appendChild(option);
  });

  return select;
}

function filterTransactions(range, transactions, table) {
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const currentDate = new Date();
    const diffInMonths =
      (currentDate.getFullYear() - transactionDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      transactionDate.getMonth();

    switch (range) {
      case "lastMonth":
        return diffInMonths <= 1;
      case "last6Months":
        return diffInMonths <= 6;
      case "lastYear":
        return diffInMonths <= 12;
      case "allTime":
      default:
        return true;
    }
  });

  const updatedTable = createTransactionTable(filteredTransactions);
  table.replaceWith(updatedTable);
}

async function fetchTransactionData() {
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

async function fetchUserData() {
  try {
    const response = await fetch(userUrl);

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

async function fetchTransactionDataByID(userId) {
  try {
    const url = `${baseUrl}?userID=${userId}`;
    const response = await fetch(url);

    // Check if the response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Assuming the API returns an array of transaction objects, return it directly
    return data;
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return [];
  }
}

function createTransactionTable(transactions) {
  const table = document.createElement("table");
  table.classList.add("table");

  // Table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
    <th scope="col">User</th>
    <th scope="col">Date</th>
    <th scope="col">Price</th>

    </tr>
  `;
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  for (const transaction of transactions) {
    const tr = document.createElement("tr");
    const dateArray = transaction.date.split("T")[0].split("-");
    const formattedDate =
      dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];

    tr.innerHTML = `
      <td>${transaction.userID}</td>
      <td>${formattedDate}</td>
      <td>$${transaction.price}.00</td>
      
    `;
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
}
