const user = JSON.parse(sessionStorage.getItem("user"));
console.log(user.id);
function submitClothing() {
  const title = document.getElementById("name").value;
  const size = document.getElementById("size").value;
  const imageURL = document.getElementById("imageURL").value;

  const clothing = { title, size, imageURL };
  console.log(clothing);

  document.getElementById("name").value = "";
  document.getElementById("size").value = "";
  document.getElementById("imageURL").value = "";
  handlePost(clothing);
}

async function handlePost(clothing) {
  const clothingUrl = "https://testtest-benjaminf.pitunnel.com/api/Clothing";

  const newClothing = {
    title: "clothingtitle",
    userID: 16,
    size: "clothingsize",
    imageURL: "www.clothes.com",
  };
  console.log(newClothing);
  console.log(clothingUrl);

  fetch(clothingUrl, {
    method: "POST",
    body: JSON.stringify(newClothing),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Transaction created");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      updateClothing(clothingItems);
      localStorage.removeItem("cart");

      return response.json();
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });

  const myClothing = await fetchClothingData();
  console.log(myClothing);
  const lastClothing = myClothing[myClothing.length - 1];
  console.log(lastClothing.id);

  const Offer = {
    ClothingID: lastClothing.id,
    CustomerID: user.id,
    ImageURL: newClothing.imageURL,
  };
  postOffer(Offer);
}

function postOffer(offer) {
  const offerUrl = "https://testtest-benjaminf.pitunnel.com/api/offers";
  const newOffer = {
    clothingID: lastClothing.id,
    customerID: user.id,
    imageURL: offer.imageURL,
  };

  fetch(offerUrl, {
    method: "POST",
    body: JSON.stringify(newOffer),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Transaction created");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      updateClothing(clothingItems);
      localStorage.removeItem("cart");
      window.location.reload();

      return response.json();
    })
    .catch((error) => {
      console.error("There was an error:", error);
    });
}

async function fetchClothingData() {
  const clothingUrl = "https://localhost:7026/api/Clothing";
  const clothingItems = [];
  return fetch(clothingUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const clothing = {
          id: item.id,
        };
        clothingItems.push(clothing);
      });
      console.log(clothingItems);
      return clothingItems;
    });
}
