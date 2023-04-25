$(document).ready(function () {
  // Retrieve clothing items from local storage
  const clothingItems = JSON.parse(localStorage.getItem("clothingItems")) || [];

  // Initialize the total price to 0
  let totalPrice = 0;

  // Loop through each clothing item and create an item card
  clothingItems.forEach((item) => {
    const itemCard = `
      <li class="item">
        <img src="${item.imageurl}" alt="${item.title}">
        <div class="item-details">
          <h2>${item.title}</h2>
          <p>Type: ${item.type}</p>
          <p>Occasion: ${item.occasion}</p>
          <p>Size: ${item.size}</p>
        </div>
        <div class="item-price">
          <p>$${item.price.toFixed(2)}</p>
        </div>
      </li>
    `;

    // Add the item card to the item list
    $(".item-list").append(itemCard);

    // Add the price of the item to the total price
    totalPrice += item.price;
  });

  // Update the total price in the cart
  $(".total-price p").text("$" + totalPrice.toFixed(2));
});
