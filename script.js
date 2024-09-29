const apiURL = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("product-container");
const searchBar = document.getElementById("searchBar");
let productsData = [];

// Fetching data from the api and storing in an array
async function getData() {
  try {
    const response = await fetch(apiURL);
    productsData = await response.json();
    displayProducts(productsData);
  } catch (error) {
    console.error("Error fetching the products:", error);
  }
}

// Creating a element and displaying the cards
function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>$${product.price}</p>
    `;

    productCard.addEventListener("click", () => openModal(product));
    productContainer.appendChild(productCard);
  });
}

// Getting search term from search bar and displaying matching items
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

const modal = document.getElementById("productModal");
const closeModalBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalQuantity = document.getElementById("modalQuantity");

// Makin modal container block and css properties will be applied
function openModal(product) {
  modalTitle.innerText = product?.title;
  modalImage.src = product?.image;
  modalDescription.innerText = product?.description;
  modalQuantity.innerText = product?.rating?.count;
  modal.style.display = "block";
}

// Closing the modal using 'x' button
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Closing the modal while pressing anywhere (other then modal) in window
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Closing the modal while pressing escape key
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

getData();
