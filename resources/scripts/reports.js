const url = "https://testtest-benjaminf.pitunnel.com/api/transactions";
const userUrl = "https://testtest-benjaminf.pitunnel.com/api/Users";

function showTransactions() {
  const transactions = document.getElementById(`transactions`);
  transactions.innerHTML = "";
  fetchTransactionData().then((transactions) => {
    const dropdown = createDropdown();
    createTransactionTable(transactions);
    dropdown.addEventListener("change", (event) => {
      ClearScreen();
      createDropdown();
      filterTransactions(event.target.value, transactions);
    });
  });
}

function TopSellingCustomers() {
  const transactions = document.getElementById(`transactions`);
  transactions.innerHTML = "";
  fetchTransactionData().then((transactions) => {
    let index = 0;
    let max = 0;
    transactions.forEach((transaction) => {
      if (transaction.userID === index) {
        sum += transaction.price;
      } else {
        index++;
        sum = transaction.price;
      }
      if (sum > max) {
        max = sum;
        maxIndex = index;
      }
    });
    const maxTransactions = transactions.filter(
      (transaction) => transaction.userID === maxIndex
    );
    singleMax = maxTransactions[0];
    singleMax.price = max;
    createSingleTransactionTable(singleMax);
  });
}

async function transactionsByID(ID) {
  const transactions = document.getElementById(`transactions`);
  transactions.innerHTML = "";
  fetchTransactionData().then((transactions) => {
    let filteredTransactions = transactions.filter(
      (transaction) => transaction.userID === ID
    );
    const input = createInput();
    input.addEventListener("change", (event) => {
      const newID = parseInt(event.target.value);
      const newFilteredTransactions = transactions.filter(
        (transaction) => transaction.userID === newID
      );
      filteredTransactions = newFilteredTransactions;
      filterTransactions("All Time", filteredTransactions);
    });
  });
}

function createInput() {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter User ID";
  document.getElementById(`transactions`).appendChild(input);

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

  document.getElementById(`transactions`).appendChild(select);
  return select;
}

function filterTransactions(range, transactions) {
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

  createTransactionTable(filteredTransactions);
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

  document.getElementById(`transactions`).appendChild(table);
}

function createSingleTransactionTable(transaction) {
  const table = document.createElement("table");
  table.classList.add("table");

  // Table header
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
    <th scope="col">User</th>
    <th scope="col">First Purchase Date</th>
    <th scope="col">Total</th>

    </tr>
  `;
  table.appendChild(thead);

  // Table body
  const tbody = document.createElement("tbody");
  const tr = document.createElement("tr");
  const dateArray = transaction.date.split("T")[0].split("-");
  const formattedDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];

  tr.innerHTML = `
      <td>${transaction.userID}</td>
      <td>${formattedDate}</td>
      <td>$${transaction.price}.00</td>
      
    `;
  tbody.appendChild(tr);

  table.appendChild(tbody);

  document.getElementById(`transactions`).appendChild(table);
}

function ClearScreen() {
  document.getElementById(`transactions`).innerHTML = "";
}
