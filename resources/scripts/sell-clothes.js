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
  };

  fetch(clothingUrl, {
    method: "POST",
    body: JSON.stringify(newClothing),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
