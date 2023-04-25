$(document).ready(function() {
    // Get all the item cards
    const itemCards = $('.card.item');
  
    // Initialize the total price to 0
    let totalPrice = 90;
  
    // Loop through each item card and add event listener to the remove button
    itemCards.each(function() {
      const removeButton = $(this).find('.remove-button');
      const priceText = $(this).find('.item-price p').text();
      const price = parseFloat(priceText.substring(1));
  
      removeButton.click(function() {
        // Remove the item card from the cart
        $(this).closest('.card').remove();
  
        // Subtract the price of the item from the total price
        totalPrice -= price;
        $('.total-price p').text('$' + totalPrice.toFixed(2));
      });
  
      // Add the price of the item to the total price
      totalPrice += price;
    });
  
    // Update the total price in the cart
    $('.total-price p').text('$' + totalPrice.toFixed(2));
  });
  