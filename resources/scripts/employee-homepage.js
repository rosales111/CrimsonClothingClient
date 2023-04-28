const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user);

$(document).ready(function () {
  $("#cart-btn").click(function () {
    window.location.href = "./cart.html";
  });

  // Fetch clothing data from API
  fetchClothingData();
});

function approve(clothing) {
  clothing.isApproved = true;
  handlePut(clothing);
}

async function handlePut(clothing) {
  console.log("handlePut called");
  const clothingUrl = "https://testtest-benjaminf.pitunnel.com/api/Clothing" + "/" + clothing.ID;

  const newClothing = {
    id: clothing.id,
    buyPrice: clothing.buyPrice,
    sellPrice: clothing.sellPrice,
    title: clothing.title,
    type: clothing.type,
    occasion: clothing.occasion,
    size: clothing.size,
    imageURL: clothing.imageURL,
    isApproved: clothing.isApproved,
    isDeleted: clothing.isDeleted,
    userId: clothing.userId,
  };

  await fetch(clothingUrl, {
    method: "PUT",
    body: JSON.stringify(newClothing),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function fetchEmailByID(id) {
  const userUrl = `https://testtest-benjaminf.pitunnel.com/api/Users/${id}`;

  return fetch(userUrl)
    .then((response) => response.json())
    .then((user) => user.email);
}

function fetchClothingData() {
  // Replace with your actual API URL
  const apiUrl = "https://testtest-benjaminf.pitunnel.com/api/Clothing";

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
    if (item.isApproved === false) {
      const cardContainer = document.createElement("div");
      cardContainer.className = "card-container";

      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = item.imageURL;
      //img.src = "data:image/jpeg;base64,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";
      img.classList.add("clth-img");

      const infoWrapper = document.createElement("div");
      infoWrapper.className = "info-wrapper";

      const h2 = document.createElement("h2");
      h2.textContent = item.title;

      const p = document.createElement("p");
      p.textContent = item.type;

      const p2 = document.createElement("p");
      p2.textContent = fetchEmailByID(`${item.userId}`);

      const button = document.createElement("button");
      button.className = "add-to-cart-btn";
      button.textContent = "Approve";
      button.addEventListener("click", () => {
        approve(item);
        window.location.reload();
      });

      infoWrapper.appendChild(h2);
      infoWrapper.appendChild(p);
      infoWrapper.appendChild(p2);
      infoWrapper.appendChild(button);

      card.appendChild(img);
      card.appendChild(infoWrapper);

      cardContainer.appendChild(card);
      clothingContainer.appendChild(cardContainer);
    }
  });
}

async function getEmailAndSetContent() {
  const email = await fetchEmailByID(`${item.userId}`);
  p2.textContent = email;
}
