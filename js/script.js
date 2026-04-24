const ENDPOINT_CART = "http://localhost:3000/cart";

document.addEventListener("DOMContentLoaded", () => {
  aggiornoNumeroCartello();
});

async function addToCart(product) {
  const cart = await getCart();
  let productInCart = false;
  cart.forEach((cartProduct) => {
    if (cartProduct.name === product.name) {
      productInCart = true;
    }
  });
  if (productInCart) {
    alert("Product already in cart");
    return;
  }
  const response = await fetch(ENDPOINT_CART, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(product),
  });
  aggiornoNumeroCartello();
  const savedProduct = await response.json();
  return savedProduct;
}

async function getCart() {
  const response = await fetch(ENDPOINT_CART);
  const cart = await response.json();
  return cart;
}

async function aggiornoNumeroCartello() {
  const cartProduct = await getCart();
  document.querySelector("#cartello span").textContent = cartProduct.length;
}

const productsContainer = document.getElementById("products");

const products = fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className =
        "product overflow-hidden border-1 border-gray-200 pb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200";
      productElement.innerHTML = `
        <img class="w-full h-auto mb-4" src="${product.image}" alt="${product.name}" />
        <div class="px-4">
          <h2 class="text-xl font-bold mb-2">${product.name}</h2>
          <p class="text-gray-600 mb-4">${product.description}</p>
          <p class="text-lg font-semibold mb-4">$${product.price}</p>
        </div>
      `;

      const btn = document.createElement("button");
      btn.className =
        "bg-[#8D4201] text-white ml-4 px-4 py-2 rounded-lg hover:bg-[#6A3201] transition-colors duration-200";
      btn.textContent = "Add to Cart";
      productElement.appendChild(btn);
      btn.addEventListener("click", () => {
        addToCart(product);
      });
      productsContainer.appendChild(productElement);
    });
  });
