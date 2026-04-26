const ENDPOINT_CART = "http://localhost:3000/cart";

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("email")) {
    document.getElementById("newletterform").style.display = "none";
    document.getElementById("subscribed").classList.remove("hidden");
  }
  aggiornoNumeroCartello();

  // Mobile menu toggle
  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
      mobileNav.classList.toggle("hidden");
    });
  }
});

// ===== Cart Functions =====
async function addToCart(product) {
  const cart = await getCart();
  const productInCart = cart.some((p) => p.name === product.name);
  if (productInCart) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: `This product has already been added to the cart!`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }
  const response = await fetch(ENDPOINT_CART, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ ...product, quantity: 1 }),
  });
  aggiornoNumeroCartello();

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `${product.name} added to cart`,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

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

// ===== Render Stars =====
function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return "★".repeat(full) + "☆".repeat(empty);
}

const newsletterBtn = document.getElementById("newletter-btn");

newsletterBtn.addEventListener("click", () => {
  const email = document.getElementById("email");
  if (!email.value) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: `Please enter your email`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }
  document.getElementById("newletterform").style.display = "none";
  document.getElementById("subscribed").classList.remove("hidden");
  localStorage.setItem("email", email.value);
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `Email added to newsletter`,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
});

// ===== Load & Render Products =====
const productsContainer = document.getElementById("products");

fetch("http://localhost:3000/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "product-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";
      card.innerHTML = `
        <div class="overflow-hidden">
          <img class="w-full h-56 sm:h-64 object-cover" src="${product.image}" alt="${product.name}" />
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">${product.category}</span>
            <span class="text-amber-600 text-sm">${renderStars(product.rating)}</span>
          </div>
          <h3 class="text-lg font-bold text-[#2D1810] mb-1">${product.name}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">${product.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-[#8D4201]">$${product.price.toFixed(2)}</span>
          </div>
        </div>
      `;

      const btn = document.createElement("button");
      btn.className =
        "btn-cart w-full bg-[#8D4201] text-white py-3 font-semibold text-sm tracking-wide hover:bg-[#6A3201] transition-colors duration-200";
      btn.textContent = "Add to Cart";
      card.appendChild(btn);
      btn.addEventListener("click", () => addToCart(product));

      productsContainer.appendChild(card);
    });
  });
