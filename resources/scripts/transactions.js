// Define transaction class
class Transaction {
    constructor(item, quantity, price) {
      this.item = item;
      this.quantity = quantity;
      this.price = price;
    }
  
    // Calculate total price of transaction
    getTotal() {
      return this.quantity * this.price;
    }
  }
  
  // Define array to hold transactions
  let transactions = [];
  
  // Add event listener to form submit button
  document.querySelector('#transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form input values
    const item = document.querySelector('#item').value;
    const quantity = parseInt(document.querySelector('#quantity').value);
    const price = parseFloat(document.querySelector('#price').value);
  
    // Create new transaction object
    const transaction = new Transaction(item, quantity, price);
  
    // Add transaction to array
    transactions.push(transaction);
  
    // Update transaction list
    updateTransactionList();
  
    // Reset form
    document.querySelector('#transaction-form').reset();
  });
  
  // Update transaction list in HTML
  function updateTransactionList() {
    // Get transaction list element
    const transactionList = document.querySelector('#transaction-list');
  
    // Clear previous transaction list items
    transactionList.innerHTML = '';
  
    // Loop through transactions and add to list
    transactions.forEach(function(transaction) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${transaction.quantity} x ${transaction.item} - $${transaction.price.toFixed(2)} each = $${transaction.getTotal().toFixed(2)}`;
      transactionList.appendChild(listItem);
    });
  
    // Update total price
    updateTotalPrice();
  }
  
  // Update total price in HTML
  function updateTotalPrice() {
    // Get total price element
    const totalPrice = document.querySelector('#total-price');
  
    // Calculate total price of all transactions
    const total = transactions.reduce(function(sum, transaction) {
      return sum + transaction.getTotal();
    }, 0);
  
    // Update total price in HTML
    totalPrice.innerHTML = `Total Price: $${total.toFixed(2)}`;
  }
  