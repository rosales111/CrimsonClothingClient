const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

$(document).ready(function () {
  $("#cart-btn").click(function () {
    window.location.href = "./cart.html";
  });

  // Fetch clothing data from API
  fetchClothingData();
});

function fetchClothingData() {
  // Replace with your actual API URL
  const apiUrl = "https://localhost:7026/api/Clothing";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayClothingItems(data);
    })
    .catch((error) => {
      console.error("Error fetching clothing data:", error);
    });
}

function displayClothingItems(clothingItems) {
  const clothingContainer = document.getElementById("clothing-container");

  clothingItems.forEach((item) => {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    const h2 = document.createElement("h2");
    h2.textContent = item.title;

    const p = document.createElement("p");
    p.textContent = item.type;

    const button = document.createElement("button");
    button.className = "add-to-cart-btn";
    button.textContent = "Add to Cart";

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(button);

    cardContainer.appendChild(card);
    clothingContainer.appendChild(cardContainer);
  });
}
