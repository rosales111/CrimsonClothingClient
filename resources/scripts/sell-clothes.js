const user = JSON.parse(sessionStorage.getItem("user"));
function submitClothing() {
  const name = document.getElementById("name").value;
  const size = document.getElementById("size").value;
  const imageURL = document.getElementById("imageURL").value;

  const clothing = { name, size, imageURL };
  console.log(clothing);

  document.getElementById("name").value = "";
  document.getElementById("size").value = "";
  document.getElementById("imageURL").value = "";
}

function handlePost(clothing) {
  const clothingUrl = "https://localhost:7026/api/Clothing";

  const newClothing = {
    id: clothing.id,
    name: clothing.name,
    size: clothing.size,
    imageURL: clothing.imageURL,
    userID: user.id,
  };

  fetch(clothingUrl, {
    method: "POST",
    body: JSON.stringify(newClothing),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const Offer = {
    clothingid: newClothing.id,
    userID: user.id,
  };
  postOffer(Offer);
}

function postOffer(offer) {
  const offerUrl = "https://localhost:7026/api/offers";
  const newOffer = {
    clothingid: offer.clothingid,
    userID: offer.userID,
  };

  fetch(offerUrl, {
    method: "POST",
    body: JSON.stringify(newOffer),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
